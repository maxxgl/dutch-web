const api = 'https://dutch-backend.herokuapp.com/'

export const consumer = (endpoint, method, content) => {
  return fetch(api + endpoint, {
    method: method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token')
    },
    body: content ? JSON.stringify(content) : null
  }).then((response) => {
        if (!response.ok) {
          if (response.status === 401) {
            localStorage.removeItem('token')
            window.location.reload()
          }
          throw Error(response.statusText)
        }
        return response
    }).then((response) => response.json()
    ).catch((error) => {
      console.error(error)
    })
}
