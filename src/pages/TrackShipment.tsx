import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  Package,
  Plane,
  MapPin,
  Clock,
  AlertCircle,
  CheckCircle2,
  Loader2,
  MessageCircle,
  Phone,
} from 'lucide-react';
import {
  SHIPMENT_LOOKUP_URL,
  type PublicShipment,
} from '../config/shipmentTracking';

type LookupState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; shipment: PublicShipment }
  | { status: 'error'; message: string };

const TrackShipment = () => {
  const [shipmentId, setShipmentId] = useState('');
  const [lookup, setLookup] = useState<LookupState>({ status: 'idle' });

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    const id = shipmentId.trim();

    if (!id) {
      setLookup({ status: 'error', message: 'Please enter your KGS Shipment ID.' });
      return;
    }

    if (!SHIPMENT_LOOKUP_URL) {
      setLookup({
        status: 'error',
        message:
          'Shipment tracking is almost ready. KGS is finishing the live sheet connection — please try again shortly, or contact us with your shipment ID.',
      });
      return;
    }

    setLookup({ status: 'loading' });

    try {
      const url = `${SHIPMENT_LOOKUP_URL}?id=${encodeURIComponent(id)}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network error');
      }

      const raw = await response.text();
      let data: { ok?: boolean; error?: string; shipment?: PublicShipment };
      try {
        data = JSON.parse(raw);
      } catch {
        setLookup({
          status: 'error',
          message:
            'Tracking connection needs a quick fix on the Google Sheet side. Please contact KGS or try again shortly.',
        });
        return;
      }

      if (!data?.ok || !data.shipment) {
        setLookup({
          status: 'error',
          message: data?.error || 'No shipment found for that ID.',
        });
        return;
      }

      setLookup({ status: 'success', shipment: data.shipment as PublicShipment });
    } catch {
      setLookup({
        status: 'error',
        message: 'Unable to reach tracking right now. Please try again or contact KGS.',
      });
    }
  };

  return (
    <div>
      <section className="relative bg-gradient-to-r from-blue-800 to-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">Track Shipment</h1>
            <p className="text-xl lg:text-2xl text-blue-100 max-w-3xl mx-auto">
              Enter your KGS Shipment ID to see the current status of your cargo
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <form
            onSubmit={handleTrack}
            className="bg-white rounded-lg shadow-lg p-6 sm:p-8 border border-gray-100"
          >
            <label htmlFor="shipment-id" className="block text-sm font-medium text-gray-700 mb-2">
              KGS Shipment ID
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                id="shipment-id"
                type="text"
                value={shipmentId}
                onChange={(e) => setShipmentId(e.target.value)}
                placeholder="e.g. KGS-CN-2609-001"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-700 focus:border-transparent"
                autoComplete="off"
                spellCheck={false}
              />
              <button
                type="submit"
                disabled={lookup.status === 'loading'}
                className="inline-flex items-center justify-center px-6 py-3 bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-800 transition-colors disabled:opacity-70"
              >
                {lookup.status === 'loading' ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Tracking…
                  </>
                ) : (
                  <>
                    <Search className="h-5 w-5 mr-2" />
                    Track
                  </>
                )}
              </button>
            </div>
            <p className="mt-3 text-sm text-gray-500">
              Your shipment ID is on your booking confirmation (format like{' '}
              <span className="font-medium text-gray-700">KGS-CN-2609-001</span>).
            </p>
          </form>

          {lookup.status === 'error' && (
            <div className="mt-6 flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-red-800">
              <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
              <p>{lookup.message}</p>
            </div>
          )}

          {lookup.status === 'success' && <ShipmentResult shipment={lookup.shipment} />}
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Need help with a shipment?</h2>
          <p className="text-gray-600 mb-6">
            If you cannot find your ID or the status looks wrong, contact our operations team.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://wa.me/2348162777605"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              WhatsApp
            </a>
            <a
              href="tel:+2348162777605"
              className="inline-flex items-center justify-center px-6 py-3 bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-800 transition-colors"
            >
              <Phone className="h-5 w-5 mr-2" />
              Call KGS
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-800 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
            >
              Contact form
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

const statusStyles = (status: string) => {
  const value = status.toUpperCase();
  if (value.includes('DELIVER')) return 'bg-green-100 text-green-800 border-green-200';
  if (value.includes('CLEAR')) return 'bg-amber-100 text-amber-900 border-amber-200';
  if (value.includes('TRANSIT') || value.includes('WAREHOUSE') || value.includes('BOOK')) {
    return 'bg-blue-100 text-blue-800 border-blue-200';
  }
  if (!value) return 'bg-gray-100 text-gray-600 border-gray-200';
  return 'bg-blue-100 text-blue-800 border-blue-200';
};

const ShipmentResult = ({ shipment }: { shipment: PublicShipment }) => (
  <div className="mt-6 bg-white rounded-lg shadow-lg border border-gray-100 overflow-hidden">
    <div className="bg-blue-700 text-white px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      <div className="flex items-center gap-3">
        <Package className="h-6 w-6" />
        <div>
          <div className="text-sm text-blue-100">Shipment ID</div>
          <div className="text-xl font-bold tracking-wide">{shipment.shipmentId}</div>
        </div>
      </div>
      <div
        className={`inline-flex items-center px-3 py-1.5 rounded-full border text-sm font-semibold ${statusStyles(
          shipment.status
        )}`}
      >
        <CheckCircle2 className="h-4 w-4 mr-1.5" />
        {shipment.status || 'Status pending'}
      </div>
    </div>

    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
      <InfoRow
        icon={<MapPin className="h-5 w-5 text-blue-700" />}
        label="Route"
        value={shipment.route || '—'}
      />
      <InfoRow
        icon={<Plane className="h-5 w-5 text-blue-700" />}
        label="Mode"
        value={shipment.mode || '—'}
      />
      <InfoRow
        icon={<Package className="h-5 w-5 text-blue-700" />}
        label="Item"
        value={shipment.itemDescription || '—'}
      />
      <InfoRow
        icon={<Package className="h-5 w-5 text-blue-700" />}
        label="Weight / CBM"
        value={shipment.weight || '—'}
      />
      <InfoRow
        icon={<Clock className="h-5 w-5 text-blue-700" />}
        label="Last update"
        value={shipment.lastUpdate || '—'}
        className="sm:col-span-2"
      />
    </div>
  </div>
);

const InfoRow = ({
  icon,
  label,
  value,
  className = '',
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  className?: string;
}) => (
  <div className={`flex items-start gap-3 ${className}`}>
    <div className="mt-0.5">{icon}</div>
    <div>
      <div className="text-xs uppercase tracking-wide text-gray-500 font-semibold">{label}</div>
      <div className="text-gray-900 font-medium">{value}</div>
    </div>
  </div>
);

export default TrackShipment;
