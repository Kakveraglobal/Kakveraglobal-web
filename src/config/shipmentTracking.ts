/**
 * Paste your Google Apps Script Web App URL here after deploying
 * (see google-apps-script/shipment-lookup.gs and PROJECT_NOTES.md).
 *
 * Example: https://script.google.com/macros/s/XXXX/exec
 */
export const SHIPMENT_LOOKUP_URL = '';

export type PublicShipment = {
  shipmentId: string;
  route: string;
  mode: string;
  status: string;
  lastUpdate: string;
  itemDescription: string;
  weight: string;
};
