import { useEffect, useState } from 'react';
import { Download, RefreshCw, Share, MoreVertical, X } from 'lucide-react';
import { useRegisterSW } from 'virtual:pwa-register/react';

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
};

type Platform = 'ios' | 'android' | 'desktop' | 'other';

const DISMISS_KEY = 'kgs-pwa-install-dismissed';
const OPEN_EVENT = 'kgs:open-install';

const isStandalone = () => {
  if (typeof window === 'undefined') return false;
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    // iOS Safari
    ('standalone' in navigator &&
      Boolean((navigator as Navigator & { standalone?: boolean }).standalone))
  );
};

const detectPlatform = (): Platform => {
  const ua = navigator.userAgent || '';
  const isIOS =
    /iPad|iPhone|iPod/.test(ua) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  if (isIOS) return 'ios';
  if (/Android/i.test(ua)) return 'android';
  if (/Windows|Macintosh|Linux/i.test(ua) && !('ontouchstart' in window && /Mobile/i.test(ua))) {
    return 'desktop';
  }
  return 'other';
};

const isMobileViewport = () =>
  typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches;

export const openInstallHelp = () => {
  window.dispatchEvent(new CustomEvent(OPEN_EVENT));
};

const PwaPrompts = () => {
  const [installEvent, setInstallEvent] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstall, setShowInstall] = useState(false);
  const [platform, setPlatform] = useState<Platform>('other');
  const [installed, setInstalled] = useState(false);

  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegisteredSW(swUrl) {
      if (import.meta.env.DEV) {
        console.log('KGS service worker registered:', swUrl);
      }
    },
    onRegisterError(error) {
      console.error('KGS service worker registration failed:', error);
    },
  });

  useEffect(() => {
    setInstalled(isStandalone());
    setPlatform(detectPlatform());

    const onBeforeInstall = (event: Event) => {
      event.preventDefault();
      setInstallEvent(event as BeforeInstallPromptEvent);
      if (!sessionStorage.getItem(DISMISS_KEY) && !isStandalone()) {
        setShowInstall(true);
      }
    };

    const onOpenHelp = () => {
      if (!isStandalone()) setShowInstall(true);
    };

    const onInstalled = () => {
      setInstalled(true);
      setShowInstall(false);
      setInstallEvent(null);
    };

    // Mobile browsers (especially iOS) never fire beforeinstallprompt —
    // show how-to instructions instead after a short delay.
    const timer = window.setTimeout(() => {
      if (isStandalone() || sessionStorage.getItem(DISMISS_KEY)) return;
      const p = detectPlatform();
      if (p === 'ios' || p === 'android' || isMobileViewport()) {
        setShowInstall(true);
      }
    }, 2500);

    window.addEventListener('beforeinstallprompt', onBeforeInstall);
    window.addEventListener(OPEN_EVENT, onOpenHelp);
    window.addEventListener('appinstalled', onInstalled);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('beforeinstallprompt', onBeforeInstall);
      window.removeEventListener(OPEN_EVENT, onOpenHelp);
      window.removeEventListener('appinstalled', onInstalled);
    };
  }, []);

  const dismissInstall = () => {
    sessionStorage.setItem(DISMISS_KEY, '1');
    setShowInstall(false);
  };

  const installApp = async () => {
    if (!installEvent) return;
    await installEvent.prompt();
    const choice = await installEvent.userChoice;
    setInstallEvent(null);
    setShowInstall(false);
    if (choice.outcome === 'dismissed') {
      sessionStorage.setItem(DISMISS_KEY, '1');
    }
  };

  if (installed) {
    if (!needRefresh) return null;
  }

  if (!needRefresh && !showInstall) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 flex flex-col gap-3 sm:left-auto sm:right-6 sm:w-[26rem]">
      {needRefresh ? (
        <div className="rounded-lg border border-blue-200 bg-white p-4 shadow-lg">
          <div className="flex items-start gap-3">
            <RefreshCw className="mt-0.5 h-5 w-5 shrink-0 text-blue-700" />
            <div className="flex-1">
              <p className="font-semibold text-gray-900">Update available</p>
              <p className="mt-1 text-sm text-gray-600">
                A newer version of the Kakvera app is ready.
              </p>
              <div className="mt-3 flex gap-2">
                <button
                  type="button"
                  onClick={() => updateServiceWorker(true)}
                  className="rounded-lg bg-blue-700 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-800"
                >
                  Refresh
                </button>
                <button
                  type="button"
                  onClick={() => setNeedRefresh(false)}
                  className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Later
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {showInstall && !installed ? (
        <div className="rounded-lg border border-blue-200 bg-white p-4 shadow-lg">
          <div className="flex items-start gap-3">
            <Download className="mt-0.5 h-5 w-5 shrink-0 text-blue-700" />
            <div className="flex-1">
              <p className="font-semibold text-gray-900">Install Kakvera on your phone</p>
              <p className="mt-1 text-sm text-gray-600">
                This is not an App Store download — add it to your Home Screen from the browser.
              </p>

              {installEvent ? (
                <div className="mt-3 flex gap-2">
                  <button
                    type="button"
                    onClick={installApp}
                    className="rounded-lg bg-blue-700 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-800"
                  >
                    Install
                  </button>
                  <button
                    type="button"
                    onClick={dismissInstall}
                    className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Not now
                  </button>
                </div>
              ) : platform === 'ios' ? (
                <ol className="mt-3 space-y-2 text-sm text-gray-700">
                  <li className="flex gap-2">
                    <span className="font-semibold text-blue-700">1.</span>
                    <span>
                      Tap the <Share className="inline h-4 w-4 text-blue-700" /> <strong>Share</strong>{' '}
                      button in Safari (bottom center).
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-blue-700">2.</span>
                    <span>
                      Scroll and tap <strong>Add to Home Screen</strong>.
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-blue-700">3.</span>
                    <span>
                      Tap <strong>Add</strong> — the Kakvera icon will appear on your Home Screen.
                    </span>
                  </li>
                  <li className="mt-2 rounded-md bg-amber-50 px-3 py-2 text-amber-900 text-xs">
                    Must use <strong>Safari</strong>. If you opened this from WhatsApp/Instagram, tap
                    ··· → Open in Safari first.
                  </li>
                </ol>
              ) : platform === 'android' ? (
                <ol className="mt-3 space-y-2 text-sm text-gray-700">
                  <li className="flex gap-2">
                    <span className="font-semibold text-blue-700">1.</span>
                    <span>
                      Open this site in <strong>Chrome</strong> (not WhatsApp/Instagram browser).
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-blue-700">2.</span>
                    <span>
                      Tap <MoreVertical className="inline h-4 w-4 text-blue-700" />{' '}
                      <strong>Menu</strong> (top right).
                    </span>
                  </li>
                  <li className="flex gap-2">
                    <span className="font-semibold text-blue-700">3.</span>
                    <span>
                      Tap <strong>Install app</strong> or <strong>Add to Home screen</strong>.
                    </span>
                  </li>
                </ol>
              ) : (
                <p className="mt-3 text-sm text-gray-700">
                  On mobile: open <strong>kakveraglobal.com</strong> in Safari (iPhone) or Chrome
                  (Android), then use Share / Menu → Add to Home Screen.
                </p>
              )}

              {!installEvent ? (
                <button
                  type="button"
                  onClick={dismissInstall}
                  className="mt-3 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Got it
                </button>
              ) : null}
            </div>
            <button
              type="button"
              onClick={dismissInstall}
              className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
              aria-label="Dismiss install prompt"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default PwaPrompts;
