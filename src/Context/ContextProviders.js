import React from 'react';
import AuthProvider from './AuthProvider';
import ThemeProvider from './ThemeProvider';
import SearchProvider from './SearchProvider';

const ContextProviders = ({children}) => {
    return (
        <SearchProvider>
        <AuthProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </AuthProvider>
      </SearchProvider>
    
    );
};

export default ContextProviders;