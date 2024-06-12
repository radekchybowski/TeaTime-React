
const loginFetch = async ({path = 'login', body}) => {
  let data; 

  await fetch(`http://localhost:8000/api/${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: body
    })
      .then(response => {
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

export default loginFetch;