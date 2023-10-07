import { ReactNode } from 'react';
import {
  ApolloClient, ApolloProvider, InMemoryCache, createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

interface StoreProviderProps {
  children?: ReactNode;
}
export const StoreProvider = (props: StoreProviderProps) => {
  const {
    children,
  } = props;
  const httpLink = createHttpLink({
    uri: __API__,
  });
  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('token');
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${JSON.parse(token)}` : '',
      },
    };
  });
  const client = new ApolloClient(
    {
      link: authLink.concat(httpLink),
      cache: new InMemoryCache(),
      resolvers: {
        Query: {
          isLoggedIn() {
            return !!localStorage.getItem('token');
          },
        },
      },
    },
  );
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
