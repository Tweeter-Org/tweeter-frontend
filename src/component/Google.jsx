import React, { useEffect, useState } from 'react'

const Google = () => {
    const [path, setPath] = useState("")
    const [url, setUrl] = useState("")
    useEffect(()=>{
        setPath(window.location.href)
        setUrl(path.substring(34))
    },[])
    console.log(path)
  return (<>
  <div style={{"color":"white"}}>
  <div>Google</div>
    <p>{path}</p>
    <p>{path.substring(34)}</p>
    <p>{url}</p>
  </div>
   
</>
  )
}

export default Google