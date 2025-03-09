import React from 'react';

const Loading = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-white dark:bg-gray-900">
            <div className="relative w-16 h-16">
                <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-500 animate-spin"></div>
                <div className="absolute inset-0 rounded-full border-4 border-transparent border-b-blue-500 animate-spin-reverse"></div>
            </div>
        </div>
    );
};

export default Loading;
