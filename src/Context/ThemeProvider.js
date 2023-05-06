import React, { createContext, useEffect } from 'react';



const defaultTheme  ='light'
const darkTheme ='dark'


export const ThemeContext = createContext()
const ThemeProvider = ({ children }) => {
    

    const toggleTheme = () => {
        const oldtheme = localStorage.getItem('theme')
        const newtheme = oldtheme === defaultTheme ? darkTheme : defaultTheme
        
      document.documentElement.classList.remove(oldtheme)
        document.documentElement.classList.add(newtheme)
        
   
        localStorage.setItem('theme',  newtheme)
    }
    
useEffect(() => {
    const theme = localStorage.getItem('theme')
    if (!theme) { 
        document.documentElement.classList.add(defaultTheme)
    }
    else {
        document.documentElement.classList.add(darkTheme)
   }
}, [])

    return (
        <ThemeContext.Provider value={{toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;