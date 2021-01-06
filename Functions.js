

const getProductDataFromServer = productId => {
  const url = 'Define url'

  const options = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      x-api-key: 'To Define'
    },
    body: JSON.stringify(productId)
  }

  fetch(url, options)
  .then(response => response.json())
  .then(data => {
    return data
  })
  .catch(err => err);

}
