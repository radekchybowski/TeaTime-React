import React from 'react';

const InnerContainer = ({children}) => {
    return (
      <div className={'flex flex-col justify-center items-center p-4 gap-2.5 rounded-md bg-card'}>
        { children }
      </div>
    );
};

export default InnerContainer;