import Cookies from "js-cookie";

const genericFetch = ({path, search, method = 'GET', body = null, pagination = null}) => {
  const token = Cookies.get('token');
  path = path.replace('/api/', '')

  if (pagination) {
    let separator = path.includes('?') ? '&' : '?';
    path = path + separator + 'itemsPerPage=' + pagination;
  }

  if (search) {
    let separator = path.includes('?') ? '&' : '?';
    path = path + separator + search;
  }
  console.log(path)

  return fetch(`http://localhost:8000/api/${path}`, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: body
    })
      .then((response) => {
        if (!response.ok) {
          console.log(response.status)
          .then(body => {throw new Error('Error has occurred: ' + body.error)})
        }
        return response.json()
      })
      
      .then(data => {
        return data
      })
}

export default genericFetch;