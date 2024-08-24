import React from 'react';

const Container = ({children}) => {
    return (
      <main className={'flex flex-col items-center h-screen m-1 p-2 sm:p-4 gap-7 overflow-scroll rounded-md bg-container'}>
        { children }
      </main>
    );
};

export default Container;