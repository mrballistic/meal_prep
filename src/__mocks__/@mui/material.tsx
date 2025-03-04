import React from 'react';

export const TextField = (props: any) => {
  const { fullWidth, InputProps = {}, label, ...rest } = props;
  return (
    <div 
      className={`MuiFormControl-root ${fullWidth ? 'MuiFormControl-fullWidth' : ''}`}
      style={fullWidth ? { width: '100%' } : undefined}
    >
      <label className="MuiInputLabel-root">{label}</label>
      <input
        type="text"
        aria-label={label}
        aria-describedby={InputProps['aria-describedby']}
        {...rest}
        {...InputProps}
      />
    </div>
  );
};

export const Box = (props: any) => {
  const { sx, ...rest } = props;
  const style = sx && typeof sx === 'object' ? {
    ...(sx.my ? { marginTop: `${sx.my * 8}px`, marginBottom: `${sx.my * 8}px` } : {})
  } : {};
  
  return <div style={style} {...rest} />;
};

export const ThemeProvider = ({ children }: any) => children;

export const createTheme = () => ({
  palette: {
    mode: 'light',
    primary: { main: '#1976d2' },
    secondary: { main: '#dc004e' }
  }
});
