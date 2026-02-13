import { Outlet } from "react-router";
import { Footer } from "~/components/layout-components/Footer";
import { Navbar } from "~/components/layout-components/Navbar";
import type { Route } from "./+types/main-layout";
import { getUserId } from "~/utils/cookie-session/session.server";
import { getTotalResourceCount, getTotalUserCount } from "~/utils/prisma/resource-prisma.server";

export async function loader({request} : Route.LoaderArgs) {
    const userId = await getUserId(request)
    const totalResource = await getTotalResourceCount()
    const totalUser = await getTotalUserCount()
    let isLoggedIn = false;
    if(userId)  {
       isLoggedIn = true
    }

    return {isLoggedIn, totalResource, totalUser} 
}
export default function MainLayout({loaderData } : Route.ComponentProps ) {
    return (
        <>
        <Navbar isLoggedIn = {loaderData.isLoggedIn}/>
        <main>
        <Outlet />
        </main>
        <Footer totalResource = {loaderData.totalResource} totalUser = {loaderData.totalUser}/>
        </>
    )
}