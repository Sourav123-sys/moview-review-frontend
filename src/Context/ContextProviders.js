import React from 'react';
import AuthProvider from './AuthProvider';
import ThemeProvider from './ThemeProvider';
import SearchProvider from './SearchProvider';
import MoviesProvider from './MoviesProvider';

const ContextProviders = ({children}) => {
    return (
      <SearchProvider>
        <MoviesProvider>
        <AuthProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </AuthProvider>
        </MoviesProvider>
       
      </SearchProvider>
    
    );
};

export default ContextProviders;