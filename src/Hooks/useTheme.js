import React, { useContext } from 'react';
import { ThemeContext } from '../Context/ThemeProvider';
import { AuthContext } from '../Context/AuthProvider';

export  const useTheme = () => useContext(ThemeContext)
export const useAuth = () => useContext(AuthContext)



