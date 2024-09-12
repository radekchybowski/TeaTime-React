import Cookies from "js-cookie";

const deleteFetch = (path) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = Cookies.get('token');

  return fetch(`${apiUrl}/api/${path}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
      }
    })
    .then((response) => {
      if (!response.ok) {
        if (response.status === 401) {
          Cookies.remove('token');
          localStorage.removeItem('user');
        }
        if(response.status === 404) {
          throw new Error('Error has occurred: this comment does not exist in database, so it cannot be deleted.')
        }
        else {
          throw new Error('Error has occurred: ' + response.body.detail)
        }
      }
    })
}

export default deleteFetch;