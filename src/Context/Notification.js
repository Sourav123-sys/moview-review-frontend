import React, { createContext } from 'react';


const NotificationContext = createContext()


const Notification = ({ children }) => {
    const updateNotification = () => {
        
    }
    return (
        <NotificationContext.provider value ={{updateNotification}}>
            {children}
        </NotificationContext.provider>
    );
};

export default Notification;