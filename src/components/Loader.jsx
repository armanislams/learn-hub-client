import React from 'react';

const Loader = () => {
    
    return (
        <div className='min-h-screen w-full mx-auto flex gap-10 justify-center items-center bg-gray-50 '>
            <img className='w-1/12 animate-pulse' src={'/public/codeIcon.png'} alt="" />
            <h1 className='text-4xl font-bold'>Loading...</h1>
        </div>
    );
};

export default Loader;