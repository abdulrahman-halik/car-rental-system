import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/owner/Sidebar';
import NavbarOwner from '../../components/owner/NavbarOwner';

const Layout = () => {
    const [sidebarOpen, setSidebarOpen] = React.useState(false);

    return (
        <div className="flex flex-col h-screen overflow-hidden bg-gray-50">
            <NavbarOwner sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            <div className="flex flex-1 overflow-hidden relative">
                <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

                {/* Main Content Area */}
                <main className="flex-1 overflow-y-auto w-full">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Layout;
