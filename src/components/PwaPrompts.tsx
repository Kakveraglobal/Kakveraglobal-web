import { useEffect, useState } from 'react';
import { Download, RefreshCw, X } from 'lucide-react';
import { useRegisterSW } from 'virtual:pwa-register/react';

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
};

const DISMISS_KEY = 'kgs-pwa-install-dismissed';

const PwaPrompts = () => {
  const [installEvent, setInstallEvent] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstall, setShowInstall] = useState(false);

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
    const onBeforeInstall = (event: Event) => {
      event.preventDefault();
      setInstallEvent(event as BeforeInstallPromptEvent);
      if (!sessionStorage.getItem(DISMISS_KEY)) {
        setShowInstall(true);
      }
    };

    window.addEventListener('beforeinstallprompt', onBeforeInstall);
    return () => window.removeEventListener('beforeinstallprompt', onBeforeInstall);
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

  if (!needRefresh && !(showInstall && installEvent)) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 flex flex-col gap-3 sm:left-auto sm:right-6 sm:w-96">
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

      {showInstall && installEvent ? (
        <div className="rounded-lg border border-blue-200 bg-white p-4 shadow-lg">
          <div className="flex items-start gap-3">
            <Download className="mt-0.5 h-5 w-5 shrink-0 text-blue-700" />
            <div className="flex-1">
              <p className="font-semibold text-gray-900">Install Kakvera</p>
              <p className="mt-1 text-sm text-gray-600">
                Add the app to your home screen for quick access to rates and tracking.
              </p>
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
