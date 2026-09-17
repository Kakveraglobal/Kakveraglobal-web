/**
 * Kakvera Global — Shipment lookup for the website
 *
 * Deploy as Web app (Execute as: Me, Who has access: Anyone).
 * Optional: set SHEET_NAME to your exact tab name if you want one tab only.
 */
var SHEET_NAME = '';

function doGet(e) {
  var id = '';
  if (e && e.parameter && e.parameter.id) {
    id = String(e.parameter.id).trim();
  }

  if (!id) {
    return jsonOut({ ok: false, error: 'Please enter a shipment ID.' });
  }

  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    if (!ss) {
      return jsonOut({
        ok: false,
        error: 'Open Apps Script from the Google Sheet (Extensions > Apps Script).',
      });
    }

    var sheets = [];
    if (SHEET_NAME) {
      var named = ss.getSheetByName(SHEET_NAME);
      if (!named) {
        return jsonOut({ ok: false, error: 'Sheet tab not found: ' + SHEET_NAME });
      }
      sheets = [named];
    } else {
      sheets = ss.getSheets();
    }

    var needle = normalizeId_(id);
    var seenIds = [];

    for (var s = 0; s < sheets.length; s++) {
      var sheet = sheets[s];
      var values = sheet.getDataRange().getDisplayValues();
      if (values.length < 2) continue;

      for (var r = 1; r < values.length; r++) {
        var row = values[r];
        var shipmentId = String(row[0] || '').trim();
        if (!shipmentId) continue;

        if (seenIds.length < 8) {
          seenIds.push(shipmentId);
        }

        if (normalizeId_(shipmentId) === needle) {
          return jsonOut({
            ok: true,
            shipment: {
              shipmentId: shipmentId,
              route: String(row[4] || '').trim(),
              mode: String(row[5] || '').trim(),
              itemDescription: String(row[7] || '').trim(),
              weight: String(row[9] || '').trim(),
              status: String(row[14] || '').trim(),
              lastUpdate: String(row[15] || '').trim(),
            },
          });
        }
      }
    }

    return jsonOut({
      ok: false,
      error: 'No shipment found for that ID.',
      hint: seenIds.length
        ? 'Closest IDs seen in sheet: ' + seenIds.join(', ')
        : 'No shipment IDs were found in column A.',
    });
  } catch (err) {
    return jsonOut({ ok: false, error: String(err) });
  }
}

function normalizeId_(value) {
  return String(value || '')
    .toUpperCase()
    .replace(/\s+/g, '')
    .replace(/[–—]/g, '-');
}

function jsonOut(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}

function testLookup() {
  var result = doGet({ parameter: { id: 'KGS-CN-2609-001' } });
  Logger.log(result.getContent());
}
