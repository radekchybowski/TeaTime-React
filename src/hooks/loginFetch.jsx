import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

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
          return response.json()
          .then(body => {throw new Error(body.message)})
        }
        return response.json()
      })
      
      .then((json) => data = json)
      Cookies.set("token", data.token, { expires: 1/24, path: "/" });
      const user = jwtDecode(data.token)
      return user.username
}


export default loginFetch;