import React from 'react';

const NotFoundText = ({ text, visible }) => {
    return (
        <h1 className="font-semibold text-3xl text-red-700  text-center py-5 ">
      {text}
    </h1>
    );
};

export default NotFoundText;