import './App.css'
import UserList from './components/UserList'
import UserSummary from './components/UserSummary'
import React, { useState } from "react";

function App() {

  const [child, setChild] = useState('');

  const handlechild = (childData) => {
    setChild(childData);
  }

  return (
    <>
      <div className='flex flex-row justify-between mx-[7.5%] h-full mt-[10%] overflow-hidden'>
        <div className='w-[50%]' style={{ height: "100vh" }}>
          <UserList papa={handlechild} />
        </div>
        <div className='w-[40%]' style={{ height: "100vh" }}>
          <UserSummary user={child} />
        </div>
      </div>
    </>
  )
}

export default App
