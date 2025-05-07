// import React from 'react'

import type React from "react"
import ChatBox from "./Components/ChatBox"
import Contacts from "./Components/Contacts"




const App:React.FC = ()=> {
    
  return (
    <div className="flex " >
        <Contacts/>
        <ChatBox/>
    </div>
  )
}

export default App