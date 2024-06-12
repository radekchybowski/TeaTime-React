import { useQuery } from "@tanstack/react-query";

const genericFetch = async ({path, search, method = 'GET', body = null, pagination = null, token = null}) => {
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

  console.log(path)
  await fetch(`http://localhost:8000/api/${path}`, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
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

export default function useFetch ({path, search, method = 'GET', body = null, pagination = null}) {
  return useQuery({
  queryFn: () => genericFetch({path: fetch, search: searchQuery, pagination: pagination}),
  queryKey: [fetch, {searchQuery, pagination}],
  // cacheTime: 0
  });
}