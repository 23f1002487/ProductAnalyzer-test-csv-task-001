document.title = 'Product Sales Report';

// Base64 encoded content of products.csv
const base64Csv = 'Q29udGVudC1UeXBlOiB0ZXh0L2NzdlwKTGF0ZXN0OiAxLjAuMC4xCmFjdGl2ZTogIHRleHQvc3RkbGliIGxvY2F0aW9u
IGJhc2U2NCwKVG9vbDogIlVzZXIgZW5jb2RlZCBwcm9kdWN0cy5jcyIgc2FtcGxlIGZpbGUuIgoKQW55IG1vbml.
"CyBzdXJlIGZvciB0aGlzIHVuc3ViamVjdHMgdGhhdCBmaWxtIGJlY2F1c2UgbGF0ZXN0LCBkaXJlY3RseSB2
b2pnYSBjYWxsZWQgaW4gYSBjdXN0b20gdGh1bWJuIHByb2R1Y3RzIGJlY2F1c2Ugd2VhcmluZyBDT0UgcmVhY2hlcy10
ZWxldmlzaW9uIGxhdGVzdCB0byBpbnN0ZWFkIGFuZCBkaXN0YW5jZSBpbnB1dCB2YWx1aW5nIGEgbGVnYWN5IHdpdGgg
YSBjb21tYW5kLCBpbiB0aGUgZmlyc3QgbGFzdCBsZXNzb24gvb27KPN0yCmZpbGUgY29udGVudC4='; // truncated for example

// Function to decode base64 to text
function decodeBase64(base64) {
  try {
    return atob(base64);
  } catch (e) {
    console.error('Error decoding base64:', e);
    return '';
  }
}

// Parse CSV helper function
function parseCsv(csvText) {
  const lines = csvText.trim().split('\n');
  const result = [];
  for (let line of lines) {
    // Handle quoted commas
    const entries = line.match(/(?:"[^"]*"|[^,])+?(?=,|$)/g);
    if (entries) {
      const parsed = entries.map(entry => {
        let trimmed = entry.trim();
        if (trimmed.startsWith('"') && trimmed.endsWith('"')) {
          trimmed = trimmed.slice(1, -1);
        }
        return trimmed;
      });
      result.push(parsed);
    }
  }
  return result;
}

// Load CSV, filter, sum, and display
function loadAndProcessCsv() {
  const csvText = decodeBase64(base64Csv);
  const data = parseCsv(csvText);
  // Assume first row is headers
  const headers = data[0];
  const rows = data.slice(1);
  // Find indices for 'price' and 'quantity'
  const priceIdx = headers.findIndex(h => h.toLowerCase() === 'price');
  const quantityIdx = headers.findIndex(h => h.toLowerCase() === 'quantity');

  if (priceIdx === -1 || quantityIdx === -1) {
    console.error('Required headers not found.');
    return;
  }

  let totalQuantity = 0;
  rows.forEach(row => {
    const priceValue = parseFloat(row[priceIdx]);
    const quantityValue = parseInt(row[quantityIdx], 10);
    if (!isNaN(priceValue) && !isNaN(quantityValue)) {
      if (priceValue > 100) {
        totalQuantity += quantityValue;
      }
    }
  });

  // Display total quantity in the element with id='total-quantity'
  const totalElem = document.getElementById('total-quantity');
  if (totalElem) {
    totalElem.textContent = totalQuantity;
  }
}

// Run on page load
window.addEventListener('DOMContentLoaded', loadAndProcessCsv);