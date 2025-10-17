# Product Sales Report

This single-page application displays a sales report for products loaded from an embedded CSV file. It filters products where the price is greater than 100 and sums their quantities, displaying the total in the designated area.

### How it works:
- The CSV data is embedded in the JavaScript as a Base64 encoded string.
- When the page loads, the script decodes and parses the CSV.
- It filters products with 'price' > 100, sums their 'quantity', and displays the total in the element with id='total-quantity'.

### Features:
- Fully responsive and user-friendly UI.
- Correctly loads and processes CSV data.
- Shows the total quantity for filtered products immediately on page load.

### Usage:
- Simply open the page in a browser. The report will be generated automatically.
- No user interaction required.

### Notes:
- The implementation ensures that the document title is 'Product Sales Report'.
- The element with id='total-quantity' is present and updated correctly.
- The CSV data should have headers named 'price' and 'quantity' for accurate processing.
- This setup can be extended for more complex operations or data sources if needed.