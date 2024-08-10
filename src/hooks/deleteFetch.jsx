import Cookies from "js-cookie";

const deleteFetch = (path) => {
  const token = Cookies.get('token');

  return fetch(`http://localhost:8000/api/${path}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
      }
    })
    .then((response) => {
      if (!response.ok) {
        console.log(response.status)
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