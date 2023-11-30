import React from 'react'
import AccountTypeContent from '../components/account-type/AccountTypeContent'
import bgMain from '../assets/img/choose-accountt.png'


const Accounttype = () => {
  return (
    <div>
       <div
        style={{
          backgroundImage: `url(${bgMain})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="max-w-7xl m-auto h-screen">
          <AccountTypeContent />
        </div>
      </div>
    </div>
  )
}

export default Accounttype
