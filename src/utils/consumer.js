const api = 'http://localhost:5000/'

export const consumer = (endpoint, method, content) => {
  return fetch(api + endpoint, {
    method: method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token')
    },
    body: content ? JSON.stringify(content) : null
  }).then((response) => response.json())
    .catch((error) => {
      console.error(error)
    })
}