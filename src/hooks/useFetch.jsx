import { useQuery } from "@tanstack/react-query";

const fetchResource = async (path, method, search) => {
  let data;
  await fetch(`http://localhost:8000/api/${path}`, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }})
      .then((response) => response.json())
      .then((json) => data = json)
  return data;
}

const useFetch = (path, method = 'GET', search) => {
  return useQuery({
    queryFn: () => fetchResource(path, method),
    queryKey: [path],
  });
}

export default useFetch;