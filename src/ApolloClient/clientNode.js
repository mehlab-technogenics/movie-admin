import { ApolloClient, InMemoryCache } from "@apollo/client";



export let clientNode = new ApolloClient({
    uri:'http://localhost:5000',
    cache: new InMemoryCache()
  });