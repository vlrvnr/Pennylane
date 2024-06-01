/**
 * This library uses a basic authentication via an API key.
 * The Pennylane API documentation can be found here: https://pennylane.readme.io/reference/versioning
 */


/**
 * Returns an array of customers' object.
 * @param {String} token API token.
 * @return {String} Array of objects.
 */
function getAllCustomers(token) {
  const url = 'https://app.pennylane.com/api/external/v1/customers';
  const options = {
    method: 'GET',
    headers: {
      authorization: `Bearer ${token}`,
      accept: 'application/json'
    },
    muteHttpExceptions: true
  };
  const response = UrlFetchApp.fetch(url, options);
  const jsonResponse = JSON.parse(response.getContentText());

  let pageNumber = jsonResponse.total_pages;
  let array = [];

  // Loop through all the pages and return the Customers in an array
  for (let pageIndex = 1; pageIndex < pageNumber + 1; pageIndex++) {
    const pageResponse = UrlFetchApp.fetch(`${url}?page=${pageIndex}`, options);
    const pageJsonResponse = JSON.parse(pageResponse.getContentText());
    array.push(...pageJsonResponse.customers);
  }
  return array;
}

/**
 * Returns the customer's object.
 * @param {String} token API token.
 * @param {String} id Customer's id.
 * @return {String} An object.
 */
function getCustomerbyId(token, id) {
  const url = 'https://app.pennylane.com/api/external/v1/customers';
  const options = {
    method: 'GET',
    headers: {
      authorization: `Bearer ${token}`,
      accept: 'application/json'
    },
    muteHttpExceptions: true
  };
  const response = UrlFetchApp.fetch(`${url}/${id}`, options);
  const jsonResponse = JSON.parse(response.getContentText());
  const result = jsonResponse.customer;

  return result;
}


/**
 * Returns an array of customers' invoices' object.
 * @param {String} token API token.
 * @param {Boolean} isDraft By default isDraft = false. If set to true, it returns only draft invoices.
 * @return {String} Array of objects.
 */
function getAllCustomerInvoices(token, isDraft = false) {
  const url = 'https://app.pennylane.com/api/external/v1/customer_invoices';
  const urlDraftFilter = `${url}?filter=%5B%7B%22field%22%3A%20%22status%22%2C%20%22operator%22%3A%20%22eq%22%2C%20%22value%22%3A%20%22draft_status%22%7D%5D`
  const options = {
    method: 'GET',
    headers: {
      authorization: `Bearer ${token}`,
      accept: 'application/json'
    },
    muteHttpExceptions: true
  };
  if (!isDraft) {
    const response = UrlFetchApp.fetch(url, options);
    const jsonResponse = JSON.parse(response.getContentText());
    let pageNumber = jsonResponse.total_pages;
    let array = [];
    // Loop through all the pages and return the Customers in an array
    for (let pageIndex = 1; pageIndex < pageNumber + 1; pageIndex++) {
      const pageResponse = UrlFetchApp.fetch(`${url}?page=${pageIndex}`, options);
      const pageJsonResponse = JSON.parse(pageResponse.getContentText());
      array.push(...pageJsonResponse.invoices);
    }
    return array;
  } else {
    const response = UrlFetchApp.fetch(urlDraftFilter, options);
    const jsonResponse = JSON.parse(response.getContentText());
    let pageNumber = jsonResponse.total_pages;
    let array = [];
    // Loop through all the pages and return the Customers in an array
    for (let pageIndex = 1; pageIndex < pageNumber + 1; pageIndex++) {
      const pageResponse = UrlFetchApp.fetch(`${urlDraftFilter}&page=${pageIndex}`, options);
      const pageJsonResponse = JSON.parse(pageResponse.getContentText());
      array.push(...pageJsonResponse.invoices);
    }
    return array;
  }
}


/**
 * Returns the customer's object.
 * @param {String} token API token.
 * @param {String} id Invoice number's id.
 * @return {String} An object.
 */
function getCustomerInvoiceByInvoiceNumber(token, invoiceNumber) {
  const result = getAllCustomerInvoices(token);
  let invoiceData = [];

  for (const index in result) {
    if (result[index].invoice_number === invoiceNumber) {
      invoiceData.push(result[index]);
    }
  }
  return invoiceData;
}


/**
 * Returns an array of customer invoice.
 * @param {String} token API token.
 * @param {String} id Customer's invoice id.
 * @return {String} Array of objects.
 */
function getCustomerInvoiceById(token, id) {
  const url = 'https://app.pennylane.com/api/external/v1/customer_invoices';
  const options = {
    method: 'GET',
    headers: {
      authorization: `Bearer ${token}`,
      accept: 'application/json'
    },
    muteHttpExceptions: true
  };
  const response = UrlFetchApp.fetch(`${url}/${id}`, options);
  const jsonResponse = JSON.parse(response.getContentText());
  const result = jsonResponse.invoice;

  return result;
}


/**
 * Returns an array of suppliers' object.
 * @param {String} token API token.
 * @return {String} Array of objects.
 */
function getAllSuppliers(token) {
  const url = 'https://app.pennylane.com/api/external/v1/suppliers';
  const options = {
    method: 'GET',
    headers: {
      authorization: `Bearer ${token}`,
      accept: 'application/json'
    },
    muteHttpExceptions: true
  };
  const response = UrlFetchApp.fetch(url, options);
  const jsonResponse = JSON.parse(response.getContentText());

  let pageNumber = jsonResponse.total_pages;
  let array = [];

  // Loop through all the pages and return the Suppliers in an array
  for (let pageIndex = 1; pageIndex < pageNumber + 1; pageIndex++) {
    const pageResponse = UrlFetchApp.fetch(`${url}?page=${pageIndex}`, options);
    const pageJsonResponse = JSON.parse(pageResponse.getContentText());
    array.push(...pageJsonResponse.suppliers);
  }
  return array;
}


/**
 * Returns the supplier's object.
 * @param {String} token API token.
 * @param {String} id Supplier's id.
 * @return {String} An object.
 */
function getSupplierById(token, id) {
  const url = 'https://app.pennylane.com/api/external/v1/suppliers';
  const options = {
    method: 'GET',
    headers: {
      authorization: `Bearer ${token}`,
      accept: 'application/json'
    },
    muteHttpExceptions: true
  };
  const response = UrlFetchApp.fetch(`${url}/${id}`, options);
  const jsonResponse = JSON.parse(response.getContentText());
  const result = jsonResponse.supplier;

  return result;
}


/**
 * Returns an array of suppliers' object.
 * @param {String} token API token.
 * @return {String} Array of objects.
 */
function getAllSupplierInvoices(token) {
  const url = 'https://app.pennylane.com/api/external/v1/supplier_invoices';
  const options = {
    method: 'GET',
    headers: {
      authorization: `Bearer ${token}`,
      accept: 'application/json'
    },
    muteHttpExceptions: true
  };
  const response = UrlFetchApp.fetch(url, options);
  const jsonResponse = JSON.parse(response.getContentText());

  let pageNumber = jsonResponse.total_pages;
  let array = [];

  // Loop through all the pages and return the Customers in an array
  for (let pageIndex = 1; pageIndex < pageNumber + 1; pageIndex++) {
    const pageResponse = UrlFetchApp.fetch(`${url}?page=${pageIndex}`, options);
    const pageJsonResponse = JSON.parse(pageResponse.getContentText());
    array.push(...pageJsonResponse.invoices);
  }
  return array;
}


/**
 * Returns an array of plan items' object.
 * @param {String} token API token.
 * @return {String} Array of objects.
 */
function getAllPlanItems(token) {
  const url = 'https://app.pennylane.com/api/external/v1/plan_items';
  const options = {
    method: 'GET',
    headers: {
      authorization: `Bearer ${token}`,
      accept: 'application/json'
    },
    muteHttpExceptions: true
  };
  const response = UrlFetchApp.fetch(url, options);
  const jsonResponse = JSON.parse(response.getContentText());

  let pageNumber = jsonResponse.total_pages;
  let array = [];

  // Loop through all the pages and return the Plan items in an array
  for (let pageIndex = 1; pageIndex < pageNumber + 1; pageIndex++) {
    const pageResponse = UrlFetchApp.fetch(`${url}?page=${pageIndex}`, options);
    const pageJsonResponse = JSON.parse(pageResponse.getContentText());
    array.push(...pageJsonResponse.plan_items);
  }
  return array;
}


/**
 * Returns an array of products' object.
 * @param {String} token API token.
 * @return {String} Array of objects.
 */
function getAllProducts(token) {
  const url = 'https://app.pennylane.com/api/external/v1/products';
  const options = {
    method: 'GET',
    headers: {
      authorization: `Bearer ${token}`,
      accept: 'application/json'
    },
    muteHttpExceptions: true
  };
  const response = UrlFetchApp.fetch(url, options);
  const jsonResponse = JSON.parse(response.getContentText());

  let pageNumber = jsonResponse.total_pages;
  let array = [];

  // Loop through all the pages and return the Plan items in an array
  for (let pageIndex = 1; pageIndex < pageNumber + 1; pageIndex++) {
    const pageResponse = UrlFetchApp.fetch(`${url}?page=${pageIndex}`, options);
    const pageJsonResponse = JSON.parse(pageResponse.getContentText());
    array.push(...pageJsonResponse.products);
  }
  return array;
}


/**
 * Returns the product's object.
 * @param {String} token API token.
 * @param {String} id product's id.
 * @return {String} An object.
 */
function getProductById(token, id) {
  const url = 'https://app.pennylane.com/api/external/v1/products';
  const options = {
    method: 'GET',
    headers: {
      authorization: `Bearer ${token}`,
      accept: 'application/json'
    },
    muteHttpExceptions: true
  };
  const response = UrlFetchApp.fetch(`${url}/${id}`, options);
  const jsonResponse = JSON.parse(response.getContentText());
  const result = jsonResponse.product;

  return result;
}


/**
 * Creates a draft customer invoice.
 * @param {String} token API token.
 * @param {String} customerId Existing customer identifier (source_id).
 * @param {String} title Title of the line items section.
 * @param {String} description Description of the line items section.
 * @param {Array} lineItemsDoubleArray Line item objects within a double array. Includes the following data input: Existing product identifier (source_id), Product price including taxes, Product VAT rate. A 20% VAT in France is FR_200, Product unit, Line item quantity (number of items).   
 * @return {String} An object.
 */
function setCustomerInvoice(token, customerId, title, description, lineItemsDoubleArray) {
  const url = 'https://app.pennylane.com/api/external/v1/customer_invoices';
  const payload = {
    create_customer: false,
    create_products: false,
    invoice: {
      draft: true,
      customer: {
        source_id: customerId
      },
      date: new Date(),
      deadline: setDeadlineDate_(new Date()), // Helper function
      line_items_sections_attributes: [
        {
          title: title,
          description: description,
          rank: 1
        }
      ],
      line_items: setLineItemObjectArray_(lineItemsDoubleArray) // Helper function
    },
    update_customer: false
  }
  const options = {
    method: 'POST',
    contentType: 'application/json',
    headers: {
      authorization: `Bearer ${token}`,
      accept: 'application/json'
    },
    muteHttpExceptions: true,
    payload: JSON.stringify(payload)
  };

  const response = UrlFetchApp.fetch(url, options);
  const jsonResponse = JSON.parse(response);
  const responseCode = response.getResponseCode();

  // responseCode === '201' ? responseCode : jsonResponse;
  if (responseCode === 201) {
    return jsonResponse.invoice.id;
  } else {
    return jsonResponse;
  };
}


/**
 * Returns a double array of draft invoices' id.
 * @param {String} token API token.
 * @return {Array} A double array.
 */
function getDraftId(token) {
  const result = getAllCustomerInvoices(token, true);
  const draftId = [];

  for (const draft in result) {
    draftId.push([result[draft].id]);
  };
  return draftId;
}


/**
 * Transform a draft to an invoice.
 * @param {String} token API token.
 * @param {String} id Existing invoice identifier (id).
 * @return {String} A string.
 */
function setFinalizeDraftInvoice(token, id) {
  const url = 'https://app.pennylane.com/api/external/v1/customer_invoices';
  const options = {
    method: 'PUT',
    headers: {
      authorization: `Bearer ${token}`,
      accept: 'application/json'
    },
    muteHttpExceptions: true
  };
  const response = UrlFetchApp.fetch(`${url}/${id}/finalize`, options);
  const responseCode = response.getResponseCode();
  return responseCode === 204 ? `The draft number ${id} has been finalized.` : `Error: The draft number ${id} has not been finalized.`;
}


/**
 * Send an invoice to the customers' email addresses.
 * @param {String} token API token.
 * @param {String} id Existing invoice identifier (id).
 * @return {String} A string.
 */
function sendCustomerInvoiceByMail(token, id) {
  const url = 'https://app.pennylane.com/api/external/v1/customer_invoices';
  const options = {
    method: 'POST',
    headers: {
      authorization: `Bearer ${token}`,
      accept: 'application/json'
    },
    muteHttpExceptions: true
  };
  const response = UrlFetchApp.fetch(`${url}/${id}/send_by_email`, options);
  const responseCode = response.getResponseCode();
  return responseCode === 204 ? `The invoice number ${id} has been sent by email.` : `Error: The invoice number ${id} has not been sent by email.`;
}


/**
 * Set an imputation date to an customer invoice.
 * @param {String} token API token.
 * @param {String} id Existing invoice identifier (id).
 * @return {String} A string.
 */
function setImputationDate(token, id) {
  const url = `https://app.pennylane.com/api/external/v1/customer_invoices/${id}`;
  const payload = {
    invoice: {
      deadline: '2024-08-1'
      }
  }
  const options = {
    method: 'PUT',
    contentType: 'application/json',
    headers: {
      authorization: `Bearer ${token}`,
      accept: 'application/json'
    },
    muteHttpExceptions: true,
    payload: JSON.stringify(payload)
  };
    const response = UrlFetchApp.fetch(url, options);
    const jsonResponse = JSON.parse(response);
    const responseCode = response.getResponseCode();
    console.log(responseCode)
    if (responseCode === 200) {
      return '200 - Imputation date has been added to the invoice.';
    } else {
      return jsonResponse;
    }
}
