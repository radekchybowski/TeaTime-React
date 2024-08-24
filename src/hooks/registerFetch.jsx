const registerFetch = ({body = null}) => {
  return fetch(`http://localhost:8000/api/register`, {
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
          console.log(response)
          throw new Error('Error has occurred: ' + response.body.error)
        }
        else return response.json()
      })
      .then(data => {
        return data
      })
}

export default registerFetch;