import { ReactNode } from 'react';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

interface StoreProviderProps {
  children?: ReactNode;
}
export const StoreProvider = (props: StoreProviderProps) => {
  const {
    children,
  } = props;
  const client = new ApolloClient(
    {
      uri: __API__,
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
