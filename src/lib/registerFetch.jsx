const registerFetch = ({body = null}) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  return fetch(`${apiUrl}/api/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: body
    })
      .then((response) => {
        if(response.status === 422) {
          throw new Error('This email address is already registered.')
        }
        else if (!response.ok) {
          throw new Error('Error has occurred: ' + response.body.error)
        }
        else return response.json()
      })
}

export default registerFetch;