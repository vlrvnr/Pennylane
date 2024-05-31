/**
 * Returns a date object.
 * @param {Date} token API token.
 * @return {String} A date object.
 */
function setDeadlineDate_(date) {
  let dateMonth = date.getMonth() + 1;
  let deadline = new Date(date.setMonth(dateMonth));
  return deadline;
}


/**
 * Returns an array of line item objects.
 * @param {String} source_id Existing product identifier (source_id).
 * @param {Integer} price Product price including taxes.
 * @param {String} vat_rate Product VAT rate. A 20% VAT in France is FR_200..
 * @param {String} unit Product unit.
 * @param {Integer} product Line item quantity (number of items).
 * @return {String} An array of objects.
 */
function setLineItemObjectArray_(doubleArray) {
  const result = [];
  for (let i = 0, n = doubleArray.length; i < n; i++) {
    result.push(setLineItemObject_(
      doubleArray[i][0],
      doubleArray[i][1],
      doubleArray[i][2],
      doubleArray[i][3],
      doubleArray[i][4],
    )
    )
  }
  return result;
}


/**
 * Returns a line item object.
 * @param {String} source_id Existing product identifier (source_id).
 * @param {Integer} price Product price including taxes.
 * @param {String} vat_rate Product VAT rate. A 20% VAT in France is FR_200..
 * @param {String} unit Product unit.
 * @param {Integer} product Line item quantity (number of items).
 * @return {String} An array of objects.
 */
function setLineItemObject_(source_id, price, vat_rate, unit, quantity) {
  const lineItemConstructor = {
    product: {
      source_id: source_id,
      price: price,
      vat_rate: vat_rate,
      unit: unit,
    },
    quantity: quantity,
  };
  return lineItemConstructor;
}
