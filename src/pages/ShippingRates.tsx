import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Plane,
  Ship,
  Clock,
  AlertTriangle,
  CheckCircle,
  Download,
  Phone,
  MessageCircle,
  Mail,
  Package,
} from 'lucide-react';

type CorridorId = 'china' | 'gadgets' | 'turkey' | 'uk' | 'canada';

const corridors: { id: CorridorId; label: string; subtitle: string }[] = [
  { id: 'china', label: 'China → Nigeria', subtitle: 'General cargo' },
  { id: 'gadgets', label: 'China Gadgets', subtitle: 'Phones & devices' },
  { id: 'turkey', label: 'Turkey → Nigeria', subtitle: 'Air & sea' },
  { id: 'uk', label: 'UK ↔ Nigeria', subtitle: 'Import & export' },
  { id: 'canada', label: 'Nigeria ↔ Canada', subtitle: 'Air cargo' },
];

const ShippingRates = () => {
  const [activeCorridor, setActiveCorridor] = useState<CorridorId>('china');

  return (
    <div>
      <section className="relative bg-gradient-to-r from-blue-800 to-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">Shipping Rates</h1>
            <p className="text-xl lg:text-2xl text-blue-100 max-w-3xl mx-auto">
              Transparent freight rates for China, Turkey, the UK, and Canada — with Lagos clearing options and clear transit times
            </p>
          </div>
        </div>
      </section>

      <section className="py-8 bg-white border-b border-gray-200 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto pb-1">
            {corridors.map((corridor) => (
              <button
                key={corridor.id}
                type="button"
                onClick={() => setActiveCorridor(corridor.id)}
                className={`flex-shrink-0 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeCorridor === corridor.id
                    ? 'bg-blue-700 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-blue-50 hover:text-blue-800'
                }`}
              >
                <div className="font-semibold text-sm sm:text-base whitespace-nowrap">{corridor.label}</div>
                <div
                  className={`text-xs mt-0.5 ${
                    activeCorridor === corridor.id ? 'text-blue-100' : 'text-gray-500'
                  }`}
                >
                  {corridor.subtitle}
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {activeCorridor === 'china' && <ChinaRates />}
          {activeCorridor === 'gadgets' && <GadgetsRates />}
          {activeCorridor === 'turkey' && <TurkeyRates />}
          {activeCorridor === 'uk' && <UkRates />}
          {activeCorridor === 'canada' && <CanadaRates />}
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">General Rate Notes</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Please read these before booking. Final charges are always confirmed with KGS before shipment.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              'Air freight is charged on the greater of actual or volumetric weight where applicable.',
              'Rates apply to Lagos unless otherwise stated. Abuja, Kano and other cities may attract additional charges.',
              'Batteries, sensitive goods and restricted items must be declared before shipment.',
              'Final charges are based on weight/measurement confirmed at the warehouse.',
              'Rates may change due to airline, customs, exchange-rate or freight-market adjustments.',
              'Please confirm with KGS before sending goods to any warehouse.',
            ].map((note) => (
              <div key={note} className="flex items-start gap-3 bg-blue-50 rounded-lg p-4">
                <AlertTriangle className="h-5 w-5 text-blue-700 mt-0.5 flex-shrink-0" />
                <p className="text-gray-700">{note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-blue-800 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Need a custom quote?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Tell us your route, goods and timeline — we will confirm the applicable rate before you ship.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-yellow-500 text-gray-900 font-semibold rounded-lg hover:bg-yellow-400 transition-colors"
            >
              <Mail className="h-5 w-5 mr-2" />
              Request a Quote
            </Link>
            <a
              href="https://wa.me/2348162777605"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-500 transition-colors"
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              WhatsApp KGS
            </a>
            <a
              href="tel:+2348162777605"
              className="inline-flex items-center justify-center px-8 py-4 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-colors border border-white/30"
            >
              <Phone className="h-5 w-5 mr-2" />
              +234 816 277 7605
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

const RateCardHeader = ({
  title,
  description,
  downloadHref,
  downloadLabel,
}: {
  title: string;
  description: string;
  downloadHref: string;
  downloadLabel: string;
}) => (
  <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-8">
    <div>
      <h2 className="text-3xl font-bold text-gray-900 mb-2">{title}</h2>
      <p className="text-lg text-gray-600 max-w-3xl">{description}</p>
    </div>
    <a
      href={downloadHref}
      download
      className="inline-flex items-center justify-center px-5 py-3 bg-white border border-gray-300 text-gray-800 font-medium rounded-lg hover:bg-gray-50 transition-colors"
    >
      <Download className="h-4 w-4 mr-2" />
      {downloadLabel}
    </a>
  </div>
);

const RateTable = ({
  headers,
  rows,
}: {
  headers: string[];
  rows: (string | React.ReactNode)[][];
}) => (
  <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
    <table className="min-w-full text-left">
      <thead className="bg-blue-700 text-white">
        <tr>
          {headers.map((header) => (
            <th key={header} className="px-4 py-3 text-sm font-semibold whitespace-nowrap">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => (
          <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
            {row.map((cell, cellIndex) => (
              <td key={cellIndex} className="px-4 py-3 text-sm text-gray-800 align-top">
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const InfoList = ({
  title,
  items,
  tone = 'blue',
}: {
  title: string;
  items: string[];
  tone?: 'blue' | 'red' | 'green';
}) => {
  const tones = {
    blue: 'border-blue-200 bg-blue-50 text-blue-800',
    red: 'border-red-200 bg-red-50 text-red-800',
    green: 'border-green-200 bg-green-50 text-green-800',
  };
  const icons = {
    blue: AlertTriangle,
    red: AlertTriangle,
    green: CheckCircle,
  };
  const Icon = icons[tone];

  return (
    <div className={`rounded-lg border p-6 ${tones[tone]}`}>
      <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
        <Icon className="h-5 w-5" />
        {title}
      </h3>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item} className="text-sm text-gray-700 flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-current opacity-60 flex-shrink-0" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const ChinaRates = () => (
  <div>
    <RateCardHeader
      title="China → Nigeria Shipping Rates"
      description="Air and sea freight options from Guangzhou and Hong Kong, including express and battery goods."
      downloadHref="/rate-cards/china-nigeria.jpg"
      downloadLabel="Download rate card"
    />

    <div className="mb-4 flex items-center gap-2 text-blue-800 font-semibold">
      <Plane className="h-5 w-5" />
      Air Cargo
    </div>
    <RateTable
      headers={['Service', 'Freight', 'Lagos clearance', 'Transit']}
      rows={[
        ['Guangzhou (normal goods)', '$9.20/kg', '₦1,200/kg', '7 – 15 days'],
        ['Hong Kong (normal & sensitive)', '$9.60/kg', '₦1,200/kg', '10 – 15 days'],
        [
          <>
            Express air cargo
            <span className="ml-2 inline-block text-xs font-semibold text-red-700 bg-red-100 px-2 py-0.5 rounded">
              Urgent
            </span>
          </>,
          '$15.00/kg',
          '₦1,500/kg',
          '3 – 7 days',
        ],
        ['Battery goods (Hong Kong)', '$11.00/kg', '₦1,500/kg', '10 – 15 days'],
      ]}
    />

    <div className="mt-10 mb-4 flex items-center gap-2 text-green-800 font-semibold">
      <Ship className="h-5 w-5" />
      Sea Cargo
    </div>
    <RateTable
      headers={['Service', 'Freight', 'Lagos clearance', 'Transit']}
      rows={[
        ['China sea shipping (normal goods)', '$135/CBM', '₦280,000/CBM', '45 – 60 days'],
        ['China sea shipping (battery goods)', '$138/CBM', '₦295,000/CBM', '45 – 60 days'],
      ]}
    />

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
      <InfoList
        title="Small-volume sea shipments"
        tone="blue"
        items={[
          'Minimum chargeable volume: 0.1 CBM.',
          'Shipments below 0.1 CBM are charged as 0.1 CBM.',
          'Example: 0.05 CBM or 0.08 CBM → charged as 0.1 CBM.',
          'Example: 0.25 CBM → charged as 0.25 CBM.',
        ]}
      />
      <InfoList
        title="China route notes"
        tone="red"
        items={[
          'Air shipments below 3kg attract a higher per-kg rate.',
          'Batteries and battery-containing items must be declared before shipment.',
          'Rates apply to Lagos unless otherwise stated.',
          'Confirm with KGS before sending goods to the warehouse.',
        ]}
      />
    </div>
  </div>
);

const GadgetsRates = () => (
  <div>
    <RateCardHeader
      title="China → Nigeria Gadgets Express"
      description="Dedicated express service for phones, tablets, iPads and laptops — fast, secure handling from China to Lagos."
      downloadHref="/rate-cards/china-nigeria-gadgets.jpg"
      downloadLabel="Download gadgets rate card"
    />

    <div className="mb-4 flex items-center gap-2 text-blue-800 font-semibold">
      <Package className="h-5 w-5" />
      Gadgets Express Rates
    </div>
    <RateTable
      headers={['Item category', 'KGS rate', 'Delivery', 'Note']}
      rows={[
        ['Naked phone (phone only)', '₦17,000 / unit', '3 – 7 working days', 'No box or accessories'],
        ['Packaged phone (with box)', '₦21,000 / unit', '3 – 7 working days', 'Includes original box & accessories'],
        [
          'Premium / new-release smartphones',
          '₦30,000 / unit',
          '3 – 7 working days',
          'Latest models & high-value phones',
        ],
        [
          'Tablet / iPad / Laptop',
          '$16/kg + ₦1,500/kg clearing',
          '3 – 7 working days',
          'Tablets, iPads, laptops & similar devices',
        ],
      ]}
    />

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 mb-8">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-5 flex items-start gap-3">
        <Clock className="h-6 w-6 text-blue-700 mt-0.5" />
        <div>
          <h3 className="font-bold text-gray-900 mb-1">Fast delivery</h3>
          <p className="text-gray-700 text-sm">3 – 7 working days from the date of shipment from China.</p>
        </div>
      </div>
      <div className="bg-green-50 border border-green-200 rounded-lg p-5 flex items-start gap-3">
        <CheckCircle className="h-6 w-6 text-green-700 mt-0.5" />
        <div>
          <h3 className="font-bold text-gray-900 mb-1">Secure handling</h3>
          <p className="text-gray-700 text-sm">Your gadgets are carefully handled from pickup to delivery.</p>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <InfoList
        title="Important notes"
        tone="red"
        items={[
          'Dedicated Gadgets Express service only.',
          'Do not include extra batteries, power banks or battery items unless approved by KGS.',
          'Rates are for China to Lagos (clearing included where stated).',
          'Other Nigerian cities (e.g. Abuja, Kano) may attract additional charges.',
          'KGS is not responsible for undeclared items.',
        ]}
      />
      <InfoList
        title="Why ship gadgets with KGS?"
        tone="green"
        items={[
          'Competitive rates',
          'Safe and secure handling',
          'Fast turnaround time',
          'Assistance with customs clearance',
          'Support for personal and business shipments',
          'Responsive customer service',
        ]}
      />
    </div>
  </div>
);

const TurkeyRates = () => (
  <div>
    <RateCardHeader
      title="Turkey → Nigeria Shipping Rates"
      description="Straightforward air and sea rates from Turkey to Nigeria, with Lagos clearing and door-to-door support available."
      downloadHref="/rate-cards/turkey-nigeria.jpg"
      downloadLabel="Download rate card"
    />

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-2 text-blue-800 font-semibold mb-4">
          <Plane className="h-5 w-5" />
          Air cargo
        </div>
        <div className="space-y-3 text-gray-800">
          <p>
            <span className="font-semibold">Freight:</span> $6.50/kg (all weights)
          </p>
          <p>
            <span className="font-semibold">Lagos customs clearance:</span> ₦1,600/kg
          </p>
          <p>
            <span className="font-semibold">Transit:</span> 5 – 10 working days
          </p>
          <p>
            <span className="font-semibold">Minimum:</span> No fixed minimum (confirm special cases with KGS)
          </p>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-2 text-green-800 font-semibold mb-4">
          <Ship className="h-5 w-5" />
          Sea cargo
        </div>
        <div className="space-y-3 text-gray-800">
          <p>
            <span className="font-semibold">All-in rate:</span> $350/CBM (shipping + clearing)
          </p>
          <p>
            <span className="font-semibold">Transit:</span> 25 – 40 days
          </p>
          <p>
            <span className="font-semibold">Minimum chargeable volume:</span> 0.1 CBM
          </p>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <InfoList
        title="Items not accepted"
        tone="red"
        items={[
          'Weapons and ammunition',
          'Drugs and illicit substances',
          'Flammable or hazardous materials',
          'Perishable food items (without approval)',
          'Live animals',
          'Certain restricted chemicals',
          'Pornographic materials',
          'Any other items prohibited under Nigerian law',
        ]}
      />
      <InfoList
        title="Important information"
        tone="blue"
        items={[
          'Charged on actual or volumetric weight (whichever is higher).',
          'Provide a detailed item list and correct documentation.',
          'Final charges confirmed after warehouse inspection.',
          'Rates apply to Lagos unless otherwise stated.',
          'Contact KGS for door-to-door delivery to other Nigerian cities.',
        ]}
      />
    </div>
  </div>
);

const UkRates = () => (
  <div>
    <RateCardHeader
      title="UK ↔ Nigeria Shipping Rates"
      description="Air and sea options in both directions, plus express UK→Nigeria service and LCL sea packaging rates."
      downloadHref="/rate-cards/uk-nigeria.jpg"
      downloadLabel="Download rate card"
    />

    <h3 className="text-xl font-bold text-gray-900 mb-4">UK → Nigeria</h3>
    <div className="mb-3 flex items-center gap-2 text-blue-800 font-semibold">
      <Plane className="h-5 w-5" />
      Air cargo – general goods
    </div>
    <RateTable
      headers={['Weight', 'KGS rate', 'Handling fee', 'Transit']}
      rows={[
        ['5kg and below', '£8.90/kg', '£7 / shipment', '5 – 7 working days'],
        ['Above 5kg', '£8.00/kg', '£7 / shipment', '5 – 7 working days'],
        ['50kg and above', 'Contact for reduced rate', '£7 / shipment', '5 – 7 working days'],
      ]}
    />

    <div className="mt-8 mb-3 flex items-center gap-2 text-blue-800 font-semibold">
      <Plane className="h-5 w-5" />
      Air cargo – express (48–72 hours)
    </div>
    <RateTable
      headers={['Weight', 'KGS rate', 'Handling fee', 'Transit']}
      rows={[['All weights', 'From £30/kg', '£7 / shipment', '48 – 72 hours']]}
    />

    <div className="mt-8 mb-3 flex items-center gap-2 text-green-800 font-semibold">
      <Ship className="h-5 w-5" />
      Sea cargo – LCL (by dimensions)
    </div>
    <RateTable
      headers={['Package', 'Rate', 'Transit']}
      rows={[
        ['Ghana Must Go (large bag)', '£95 each', '6 – 8 weeks'],
        ['XL carton (60 × 60 × 75 cm)', '£145 each', '6 – 8 weeks'],
        ['220L barrel', '£145 each', '6 – 8 weeks'],
      ]}
    />

    <h3 className="text-xl font-bold text-gray-900 mt-12 mb-4">Nigeria → UK</h3>
    <RateTable
      headers={['Mode', 'Rate', 'Minimum', 'Transit', 'Notes']}
      rows={[
        ['Air cargo – general goods', '£6.50/kg', '10kg', '7 – 14 working days', 'Departures every Friday'],
        [
          'Sea cargo – general goods',
          '£4.50/kg',
          '10kg',
          '2 – 3 months',
          'Ideal for bulky, non-urgent shipments',
        ],
      ]}
    />

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
      <InfoList
        title="Items not accepted"
        tone="red"
        items={[
          'Kilishi, meat, chicken, milk, body cream, medications, pomo, herbs',
          'Designer brands, Milo, Knorr cube, Knorr chicken, Indomie',
          'Gold chain, sardine, butter, Bama mayonnaise, and other restricted items',
          'Egusi, ogbono, Knorr chicken and other Maggi must be ground before shipping',
        ]}
      />
      <InfoList
        title="Additional services"
        tone="green"
        items={[
          'Pickup within Nigeria available (separate fee by location)',
          'Home delivery available within the UK (additional charges apply)',
          'Packing assistance for safer arrival',
          'Documentation support for a smoother process',
        ]}
      />
    </div>
  </div>
);

const CanadaRates = () => (
  <div>
    <RateCardHeader
      title="Nigeria ↔ Canada Shipping Rates"
      description="Simple air-cargo rates both ways, with Friday departures, Canada clearing options and Toronto doorstep delivery."
      downloadHref="/rate-cards/nigeria-canada.jpg"
      downloadLabel="Download rate card"
    />

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Nigeria → Canada (export)</h3>
        <div className="space-y-3 text-gray-800 text-sm">
          <p>
            <span className="font-semibold">Rate:</span> ₦7,500/kg (one rate for all weights)
          </p>
          <p>
            <span className="font-semibold">Minimum:</span> 5kg · <span className="font-semibold">Max:</span> no limit
          </p>
          <p>
            <span className="font-semibold">Departure:</span> every Friday
          </p>
          <p>
            <span className="font-semibold">Transit:</span> about 10 working days
          </p>
          <div className="pt-3 border-t border-gray-100">
            <p className="font-semibold mb-2">Canada customs clearing (USD)</p>
            <p>5kg – 10kg: $15 flat</p>
            <p>Above 10kg: $1.50/kg</p>
          </div>
          <div className="pt-3 border-t border-gray-100">
            <p className="font-semibold mb-2">Toronto doorstep delivery</p>
            <p>$25 per box</p>
            <p>Other provinces via Canada Post, UPS or FedEx (quoted by destination)</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Canada → Nigeria (import)</h3>
        <div className="space-y-3 text-gray-800 text-sm">
          <p>
            <span className="font-semibold">Rate:</span> $12/kg (10kg and above)
          </p>
          <p>
            <span className="font-semibold">Minimum:</span> 10kg · below 10kg contact KGS for a quote
          </p>
          <p>
            <span className="font-semibold">Max weight:</span> no maximum
          </p>
          <p>
            <span className="font-semibold">Transit:</span> about 10 working days
          </p>
          <p>
            <span className="font-semibold">Nigeria customs clearing:</span> payable separately; final charges confirmed from shipment details
          </p>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <InfoList
        title="Prohibited items (Nigeria → Canada)"
        tone="red"
        items={[
          'Kilishi, meat, chicken, milk, body cream, medications, pomo, herbs',
          'Designer brands, Milo, Knorr cube, Knorr chicken, Indomie',
          'Gold chain, sardine, butter, Bama mayonnaise, and other restricted items',
          'Egusi, ogbono, Knorr chicken and other Maggi must be ground before shipping',
          'Prohibited items will be removed or disposed of',
        ]}
      />
      <InfoList
        title="Important information"
        tone="blue"
        items={[
          'Shipping is charged per actual weight on this corridor.',
          'Rates exclude customs clearance, duties and taxes unless stated.',
          'Shipments depart Canada and Nigeria every Friday (subject to change).',
          'All items must be declared accurately before shipment.',
          'Contact KGS for special cargo or bulk shipments.',
        ]}
      />
    </div>
  </div>
);

export default ShippingRates;
