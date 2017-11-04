const api = 'http://localhost:5000/'

export const consumer = () => {
  fetch(api + 'user/', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  }).then((response) => response.json())
    .catch((error) => {
      console.error(error)
    })
}