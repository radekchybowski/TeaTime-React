import React from 'react';

const Container = ({children}) => {
    return (
      <div className={'flex flex-col justify-center items-center h-screen m-1 p-4 gap-7 rounded-md bg-secondary'}>
        { children }
      </div>
    );
};

export default Container;