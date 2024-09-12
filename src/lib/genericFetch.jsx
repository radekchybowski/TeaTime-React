import Cookies from "js-cookie";

const genericFetch = ({path, search, method = 'GET', body = null, pagination = null}) => {
  const apiUrl = import.meta.env.VITE_API_URL;
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

  return fetch(`${apiUrl}/api/${path}`, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: body
    })
      .then((response) => {
        if (response.status === 401) {
          Cookies.remove('token');
          localStorage.removeItem('user');
          location.reload()
        }
        if (!response.ok) {
          if(response.status === 422) {
            throw new Error('This email address is taken.')
          }
          else {
            throw new Error('Error has occurred: ' + response.error)
          }
        }
        return response.json()
      })
      
      .then(data => {
        return data
      })
}

export default genericFetch;