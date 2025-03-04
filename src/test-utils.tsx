import React from 'react';
import { render as rtlRender } from '@testing-library/react';

const render = (ui: React.ReactElement) => {
  return rtlRender(ui);
};

export * from '@testing-library/react';
export { render };
