import { useEffect, useState } from "react"
import Fade from "react-reveal/Fade"
import Card from './Card'

export default function Cards({ selected , flex , grid , myRef}) {
    let percentage = true
    if(selected.tested === 0) {
        percentage = false
    }
    return(
        <div ref={myRef} >
                    <Fade right>
                        <p className='text-primary font-bold text-xl mt-10 md:mt-0 uppercase text-center'>{selected.stateName}</p>
                        <hr />
                        <div className={flex ? 'flex flex-wrap md:w-52' : '' + grid ? 'grid grid-cols-2 gap-x-2' : ''}>
                            <Card 
                                percentage={percentage}
                                type='confirmed'
                                color={'bg-tomato text-red-600'} 
                                value={selected.confirmed} 
                                overall={selected.tested}  
                                desc={'Out of Tested '+selected.tested.toLocaleString()+' samples '+selected.confirmed.toLocaleString()+' are Confirmed Covid. That is '}/>
                            <Card 
                                percentage={true}
                                type='active' 
                                color={'bg-blue-300 text-blue-600'} 
                                value={selected.active} 
                                overall={selected.confirmed}  
                                desc={'Out of Confirmed '+selected.tested.toLocaleString()+' cases '+selected.confirmed.toLocaleString()+' are Still Active. That is '}/>
                            <Card 
                                percentage={true}
                                type='recovered'
                                color={'bg-green-400 text-green-600'} 
                                value={selected.recovered} 
                                overall={selected.confirmed}  
                                desc={'Out of Confirmed '+selected.tested.toLocaleString()+' cases '+selected.confirmed.toLocaleString()+' are Recovered. That is '}/>
                            <Card 
                                percentage={true}
                                type='deceased'
                                color={'bg-gray-500 text-gray-600'} 
                                value={selected.deceased} 
                                overall={selected.confirmed}  
                                desc={'Out of Tested '+selected.tested.toLocaleString()+' cases '+selected.confirmed.toLocaleString()+' are Confirmed Covid. That is '}/>
                            {/* <Card 
                                type='Partially Vaccinated'
                                color={['dark','gray-600']} 
                                value={selected.vaccinated1} 
                                overall={selected.tested}  
                                desc={'Out of '+selected.tested+' ; '+selected.vaccinated1+' are got their First Dose of Vaccination Covid. That is '}/>
                            <Card 
                                type='Completely Vaccinated'
                                color={['dark','gray-600']} 
                                value={selected.vaccinated2} 
                                overall={selected.tested}  
                                desc={'Out of Tested '+selected.tested+' ; '+selected.vaccinated2+' are got their Second Dose of Vaccination Covid. That is '}/>  */}
                        </div>
                    </Fade>
                </div>
    )
}