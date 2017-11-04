const api = 'http://localhost:5000/'

export const consumer = (endpoint, method, content) => {
  fetch(api + endpoint, {
    method: method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(content)
  }).then((response) => response.json())
    .catch((error) => {
      console.error(error)
    })
}