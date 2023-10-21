import React, { useEffect, useState } from 'react'

const Counter = () => {
    const [count, setcount] = useState(59)
    // useEffect(()=>{
    //     setTimeout(()=>{
    //         if(count==0)
    //         setcount(59)
    //         else{
    //             let newcount=count-1;
    //          
    //             setcount(newcount)
    //         }
    //     },1000)
    // },[count])
    setTimeout(()=>{
        if(count==0)
        setcount(59)
        else{
            let newcount=count-1;
            setcount(newcount)
        }
    },1000)

    setTimeout(()=>{
    },1000)
  return (
    <div style={{color:"white"}}>counter {count}</div>
  )
}

export default Counter