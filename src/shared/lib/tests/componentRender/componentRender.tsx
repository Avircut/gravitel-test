import { render } from '@testing-library/react';
import { ReactNode } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { StoreProvider } from 'app/providers/StoreProvider';

export interface renderWithRouterOptions {
  route?:string;
}
export function componentRender(component:ReactNode, options:renderWithRouterOptions = {}) {
  const { route = '/' } = options;
  return render(
    <MemoryRouter initialEntries={[route]}>
      <StoreProvider>
        {component}
      </StoreProvider>
    </MemoryRouter>
    ,
  );
}
