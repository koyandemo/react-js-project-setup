import { Outlet } from 'react-router-dom'
import Sidebar from '../components/sidebar/Sidebar'
import { useState } from 'react';
import Header from '../components/header';

const DashboardLayout = () => {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex w-full h-screen pt-[10px] bg-[#EDECEE]">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="w-full flex flex-1 flex-col overflow-y-auto shreScrollBar">
        <Header  sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="w-full mx-auto px-[20px] pt-[28px]">
          <Outlet />
        </main>

        <div className="flex h-screen overflow-hidden">
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout
