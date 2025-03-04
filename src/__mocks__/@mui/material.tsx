import React from 'react';

export const TextField = (props: any) => {
  const { fullWidth, InputProps = {}, label, ...rest } = props;
  return (
    <input
      type="text"
      aria-label={label}
      aria-describedby={InputProps['aria-describedby']}
      {...rest}
      {...InputProps}
    />
  );
};

export const Box = (props: any) => <div {...props} />;

export const ThemeProvider = ({ children }: any) => children;

export const createTheme = () => ({
  palette: {
    mode: 'light',
    primary: { main: '#1976d2' },
    secondary: { main: '#dc004e' }
  }
});
