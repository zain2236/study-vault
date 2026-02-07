import type { Route } from './+types/dashboard-layout';
import { useState } from 'react';
import { Outlet, redirect } from 'react-router';

import { Header } from '~/components/dashboard-components/Header';
import { Sidebar } from '~/components/dashboard-components/Sidebar';
import { getUserId } from '~/utils/cookie-session/session.server';
import prisma from '~/utils/prisma.server';

export async function loader({request} : Route.LoaderArgs) {
    const userId = await getUserId(request) 
    if(!userId) {
        return redirect('/login')
    }
    
    const user = await prisma.user.findUnique({where : {id : userId}})

    if (!user) {
        return redirect('/login')
    }

    return {
        userName: user.user_name,
        profileImg: (user as any).profileImg || null
    }
    }

export default function DashboardLayout({loaderData} : any) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-[#f5f5f0] dark:bg-gray-800">
            {/* Top Navigation Bar */}
            <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} userInfo={loaderData} />

            <div className="max-w-7xl mx-auto">
                <div className="flex">
                    {/* Sidebar */}
                    <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

                    {/* Main Content */}
                    <main className="flex-1 p-4 lg:p-8">
                        <Outlet />
                    </main>
                </div>
            </div>
        </div>
    );
}