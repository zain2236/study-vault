import { useState } from 'react';
import { Outlet } from 'react-router';
import { Header } from '~/components/dashboard-components/Header';
import { Sidebar } from '~/components/dashboard-components/Sidebar';

export default function DashboardLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-[#f5f5f0]">
            {/* Top Navigation Bar */}
            <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            <div className="flex">
                {/* Sidebar */}
                <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

                {/* Main Content */}
                <main className="flex-1 p-4 lg:p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}