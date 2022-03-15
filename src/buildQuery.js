
import {  gql } from "@apollo/client";
// export const buildQuery = introspectionResults => (raFetchType, resourceName, params) => {
//     const resource = introspectionResults.resources.find(r => r.type.name === resourceName);

//     switch (raFetchType) {
//         case 'GET_ONE':
//             return {
//                 query: gql`query {
//                     findLikeMovied(id:"the"){
//                         title,tagline,released
//                     }
//                 }`,
//                 variables: params, // params = { id: ... }
//                 parseResponse: response => response.data,
//             }
//             break;
//         // ... other types handled here
//     }
// }


export const buildQuery = () => {
    return {
                        query: gql`query {
                            findLikeMovied(id:"the"){
                                title,tagline,released
                            }
                        }`,
                        //variables: params, // params = { id: ... }
                        parseResponse: response => response.data,
                    }
}