/**
 * Google Apps Script Web App URL for shipment lookups.
 * See google-apps-script/shipment-lookup.gs and PROJECT_NOTES.md.
 */
export const SHIPMENT_LOOKUP_URL =
  'https://script.google.com/macros/s/AKfycbyo1bvMRWmLalSyh9PptpcHF-DKuT7vxhh0O0IuGZrreo4npQ1gVIWgGdt6RqnO9bxxWA/exec';

export type PublicShipment = {
  shipmentId: string;
  route: string;
  mode: string;
  status: string;
  lastUpdate: string;
  itemDescription: string;
  weight: string;
};
