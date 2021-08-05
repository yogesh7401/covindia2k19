export default function Card({type,value,overall,desc,color,percentage}) {
    let percent
    if(percentage) {
        percent = value / overall * 100
    }
    else {
        desc = "Tested data Not available"
    }
    return(
        <>
        <div className={" sm:w-52 md:w-auto mx-auto h-auto rounded-lg bg-opacity-40 p-4 mt-5  "+color}>
            <p className=" uppercase text-xl mt-3 font-bold">{type}</p>
            <p className=" uppercase text-lg mt-3 font-bold flex  flex-row ">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 mr-1 mt-1 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                </svg>
                <span>{value.toLocaleString()}</span> 
            </p>
            <p className="mt-2"> {desc}{ percentage ? <b>{percent.toFixed(1)+'%'}</b> : ''}</p>
        </div>
        </>
    )
}