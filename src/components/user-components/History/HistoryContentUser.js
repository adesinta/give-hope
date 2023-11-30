import React from 'react'
import UserSidebar from "../user-global-component/UserSidebar";
import HistoryContainerUser from './HistoryContainerUser';
import { useEffect } from 'react';

const HistoryContentUser = () => {
  useEffect(() => {
    document.title = "History"
  }, [])
  return (
    <div className='flex'>
        <UserSidebar/>
        <HistoryContainerUser/>
    </div>
  )
}

export default HistoryContentUser