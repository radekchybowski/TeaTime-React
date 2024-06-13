
const genericFetch = async ({path, search, method = 'GET', body = null, pagination = null}) => {
  const token = localStorage.getItem('token');
  let data; 
  path = path.replace('/api/', '')

  if (pagination) {
    let separator = path.includes('?') ? '&' : '?';
    path = path + separator + 'itemsPerPage=' + pagination;
  }

  if (search) {
    let separator = path.includes('?') ? '&' : '?';
    path = path + separator + search;
  }

  await fetch(`http://localhost:8000/api/${path}`, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: body
    })
      .then((response) => {
        if (!response.ok) {
          console.log(response.status)
          return response.json()
          .then(body => {throw new Error('Error has occurred: ' + body.error)})
        }
        return response.json()
      })
      
      .then((json) => data = json)
  return data;
}

export default genericFetch;