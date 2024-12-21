import React from 'react';
import { render as RTLRender, RenderOptions } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <MemoryRouter initialEntries={['/']}>{children}</MemoryRouter>;
};

const customRender = (ui: React.ReactElement, options?: Omit<RenderOptions, 'wrapper'>) => {
  return RTLRender(ui, { wrapper: Wrapper, ...options });
};

export * from '@testing-library/react';
export { customRender as render };
