
const genericFetch = async ({path, search, method = 'GET', body = null}) => {
  let data; 
  let validated_path = path.replace('/api/', '')
  if (search) {
    let separator = path.includes('?') ? '&' : '?';
    validated_path = validated_path + separator + search;
  }

  console.log(validated_path)
  await fetch(`http://localhost:8000/api/${validated_path}`, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: body
    })
      .then((response) => {
        if (!response.ok) {
          console.log(response.status)
          throw new Error(`Error: ${response.body}`)
        }
        return response.json()
      })
      
      .then((json) => data = json)
  return data;
}

export default genericFetch;