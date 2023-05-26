import React, { useContext } from 'react';
import { ThemeContext } from '../Context/ThemeProvider';
import { AuthContext } from '../Context/AuthProvider';
import { SearchContext } from '../Context/SearchProvider';

export  const useTheme = () => useContext(ThemeContext)
export const useAuth = () => useContext(AuthContext)
export const useSearch = () => useContext(SearchContext);


