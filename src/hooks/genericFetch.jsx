import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const genericFetch = ({path, search, method = 'GET', body = null, pagination = null}) => {
  const token = Cookies.get('token');
  // const navigate = useNavigate();
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
        if (response.status === 401) {
          Cookies.remove('token');
          localStorage.removeItem('user');
          location.reload()
        }
        if (!response.ok) {
          console.log(response)
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