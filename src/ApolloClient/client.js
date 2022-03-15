import { ApolloClient, InMemoryCache } from "@apollo/client";

export let client = new ApolloClient({
    headers:{
    'authorization': localStorage.getItem('token') ? `JWT ${localStorage.getItem('token')}` : ""
    },
    uri: 'http://127.0.0.1:8000',
    cache: new InMemoryCache()
  });




// const token = localStorage.getItem('token');
// export let client = new ApolloClient({
//     headers:{
//       'authorization':'JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImhlbGxvIiwiZXhwIjoxNjQ2Mzc5MDYxLCJvcmlnSWF0IjoxNjQ2Mzc4NzYxfQ.z7BEB8Ct-1pOI8SyG53WfT8jRSkNkmqthW-bCBJBODQ'
//     },'authorization': token ? `JWT ${token}` : "",
//     uri: 'http://127.0.0.1:8000',
//     cache: new InMemoryCache()
//   });