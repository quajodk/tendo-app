import { ApolloClient, InMemoryCache } from '@apollo/client';


const client = new ApolloClient({
    uri: 'https://powerful-plains-98910.herokuapp.com/',
    cache: new InMemoryCache()
});

export { client }