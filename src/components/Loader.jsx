import React from 'react';

const Loader = () => {
    return (
        <div className='min-h-screen w-full mx-auto flex gap-10 justify-center items-center bg-gray-50 '>
            <img className='w-1/12 animate-spin' src="https://i.ibb.co/Kx8NVc70/images-q-tbn-ANd9-Gc-SIwu-CARv-k-G1eyy6a-IXkq-Fv-Sr-CVyz-J419-Vbg-s.jpg" alt="" />
            <h1 className='text-4xl font-bold'>Loading...</h1>
        </div>
    );
};

export default Loader;