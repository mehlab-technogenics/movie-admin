// import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_ERROR, AUTH_CHECK } from 'react-admin';
// import {  gql } from "@apollo/client";
// import { client } from "./ApolloClient/client";
// import { Promise } from 'core-js';
//    export const authProvider = (type, params) => {
//     // when a user tries to log in 
//     console.log(type,params,'Hl')
//     if (type === AUTH_LOGIN) {
//      const { username,password } = params;
//      console.log(params)
//      const request =await client.mutate({
//         mutation: gql`mutation {
//             tokenAuth(username: "${username}", password: "${password}") {
//               token
//             }
//           }
//           `
//       })
//         .then(response => {
//                 if (response.status < 200 || response.status >= 300) {
//                     throw new Error(response.statusText);
//                 }
//                 localStorage.setItem('token', response.data.tokenAuth.token);
//                 return Promise.resolve();
//             })
//      return Promise.resolve();
//     }
//     // when a user tries to logout
//     if (type === AUTH_LOGOUT) {
//         localStorage.removeItem('token');
//      return Promise.resolve();
//     }
//     // when the API throws an error
//     if (type === AUTH_ERROR) {
//      const { status } = params;
//      if (status === 401 || status === 403) {
//       localStorage.removeItem('token');
//       return Promise.reject()
//      }
//      return Promise.resolve()
//     }
//     // when a user navigates to a new location
//     if (type === AUTH_CHECK) {
//      return localStorage.getItem('token') ?
//       Promise.resolve() :
//       Promise.reject();
//     }
//     return Promise.reject('Unknown Method');
//    };






export const authProvider = {
  // authentication
  login: ({ username, password }) => {
    const request = new Request(
      'http://127.0.0.1:8000',
      {
        method: 'POST',
        body: `{"query":"mutation($username: String!, $password: String!) {  tokenAuth(username: $username, password: $password) {token }}","variables":{"username":"${username}","password":"${password}"}}`,
        headers: new Headers({ 'Content-Type': 'application/json' }),
      }
    );
    return fetch(request)
      .then((response) => {
        
        if (response.status < 200 || response.status >= 300) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((auth) => {
        console.log(auth,'tttKKKKK');
        localStorage.setItem(
          'auth',
          JSON.stringify({ ...auth, fullName: username, token:auth.data.tokenAuth.token})
        );
        localStorage.setItem(
          'token',auth.data.tokenAuth.token)
      })
      .catch(() => {
        throw new Error('Network error');
      });
  },
  checkError: (error) => {
    const status = error.status;
    if (status === 401 || status === 403) {
      localStorage.removeItem('auth');
      return Promise.reject();
    }
    // other error code (404, 500, etc): no need to log out
    return Promise.resolve();
  },
  checkAuth: () =>
    localStorage.getItem('auth')
      ? Promise.resolve()
      : Promise.reject({ message: 'login required' }),
  logout: () => {
    localStorage.removeItem('auth');
    localStorage.removeItem('token');
    
    return Promise.resolve();
  },
  getIdentity: () => {
    try {
      const { id, fullName, avatar } = JSON.parse(localStorage.getItem('auth'));
      return Promise.resolve({ id, fullName, avatar });
    } catch (error) {
      return Promise.reject(error);
    }
  },
  getPermissions: (params) => Promise.resolve(),
};




