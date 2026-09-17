/**
 * Kakvera Global — Shipment lookup for the website
 *
 * SETUP (do this in your Google Sheet):
 * 1. Open the shipments Google Sheet.
 * 2. Extensions → Apps Script.
 * 3. Delete any default code and paste this entire file.
 * 4. If your sheet tab is NOT the first tab, set SHEET_NAME below
 *    to the exact tab name (e.g. "Shipments").
 * 5. Click Deploy → New deployment.
 * 6. Type: Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 7. Deploy, then copy the Web App URL.
 * 8. Send that URL to Cursor (or put it in src/config/shipmentTracking.ts).
 *
 * The website calls:  YOUR_URL?id=KGS-CN-2609-001
 * and only receives public fields (no customer name/phone).
 */

// Leave empty to use the first sheet tab. Or set e.g. "Shipments"
var SHEET_NAME = '';

function doGet(e) {
  try {
    var id = ((e && e.parameter && e.parameter.id) || '').toString().trim();
    if (!id) {
      return json_({ ok: false, error: 'Please enter a shipment ID.' });
    }

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = SHEET_NAME
      ? ss.getSheetByName(SHEET_NAME)
      : ss.getSheets()[0];

    if (!sheet) {
      return json_({ ok: false, error: 'Shipments sheet not found.' });
    }

    var values = sheet.getDataRange().getDisplayValues();
    if (values.length < 2) {
      return json_({ ok: false, error: 'No shipments found.' });
    }

    var needle = id.toUpperCase();
    for (var r = 1; r < values.length; r++) {
      var row = values[r];
      var shipmentId = (row[0] || '').toString().trim();
      if (!shipmentId) continue;
      if (shipmentId.toUpperCase() === needle) {
        return json_({
          ok: true,
          shipment: {
            shipmentId: shipmentId,
            route: (row[4] || '').toString().trim(),
            mode: (row[5] || '').toString().trim(),
            itemDescription: (row[7] || '').toString().trim(),
            weight: (row[9] || '').toString().trim(),
            status: (row[14] || '').toString().trim(),
            lastUpdate: (row[15] || '').toString().trim(),
          },
        });
      }
    }

    return json_({ ok: false, error: 'No shipment found for that ID.' });
  } catch (err) {
    return json_({
      ok: false,
      error: 'Lookup failed. Please try again or contact KGS.',
    });
  }
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}
