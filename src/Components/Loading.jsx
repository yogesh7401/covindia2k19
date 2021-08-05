import React from 'react';
import ReactLoading from 'react-loading';
 
function Loading() {
    let circleCommonClasses = 'h-2.5 w-2.5 bg-current   rounded-full';

    return (
        <div className='flex'>
            <div className={`${circleCommonClasses} mr-1 animate-bounce`}></div>
            <div
                className={`${circleCommonClasses} mr-1 animate-bounce200`}
            ></div>
            <div className={`${circleCommonClasses} animate-bounce400`}></div>
        </div>
    );
}
 
export default Loading;