'use client';

import { Link} from "react-router-dom";
import ClickOutSide from "../ClickOutSide";
import { menuItems } from "../../utils/routes";
import SidebarItem from "./SidebarItem";
import { useState } from "react";


interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (_: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const [pageName,setPageName] = useState("");
  
  return (
    <ClickOutSide onClick={() => setSidebarOpen(false)}>
      <aside
        className={`absolute left-0 top-0 z-[9999] flex h-[99%] rounded-[30px] w-[200px] flex-col 
        justify-between overflow-y-hidden bg-[#FFFFFFCC] backdrop-blur-[8px] duration-300 ease-linear ml-[10px] dark:bg-boxdark lg:static lg:translate-x-0 px-4 
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex flex-col gap-10 pt-[24px]">
          <div className="flex items-center justify-center gap-2 px-6 py-[24px]">
            <Link to="/">
              <img
                width={105}
                height={40}
                src={'/logo-shre.svg'}
                alt="Logo"
              />
            </Link>

            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-controls="sidebar"
              className="block lg:hidden"
            >
              <svg
                className="fill-current"
                width="20"
                height="18"
                viewBox="0 0 20 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
                  fill=""
                />
              </svg>
            </button>
          </div>
          <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
            <nav>
                  <ul className="mb-6 flex flex-col gap-2">
                    {menuItems.map((menuItem, menuIndex) => (
                      <SidebarItem
                        key={menuIndex}
                        item={menuItem}
                        pageName={pageName}
                        setPageName={setPageName}
                      />
                    ))}
                  </ul>
            </nav>
          </div>
        </div>
      </aside>
    </ClickOutSide>
  );
};

export default Sidebar;
