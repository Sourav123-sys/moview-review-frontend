import React, { useContext } from 'react';
import { ThemeContext } from '../Context/ThemeProvider';

const useTheme = () => useContext(ThemeContext)

export default useTheme;