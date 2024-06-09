import { useQuery } from "@tanstack/react-query";

const fetchResource = async (path, method, search) => {
  let data;
  const validated_path = path.replace('/api/', '')
  await fetch(`http://localhost:8000/api/${validated_path}`, {
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
    cacheTime: 0
  });
}

export default useFetch;