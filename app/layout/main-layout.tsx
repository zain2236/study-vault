import { Outlet } from "react-router";
import { Footer } from "~/components/layout-components/Footer";
import { Navbar } from "~/components/layout-components/Navbar";
import type { Route } from "./+types/main-layout";
import { getUserId } from "~/utils/cookie-session/session.server";

export async function loader({request} : Route.LoaderArgs) {
    const userId = await getUserId(request)
    let isLoggedIn ;
    if(userId)  {
       return isLoggedIn = true
    }

    return isLoggedIn= false
}
export default function MainLayout({loaderData } : Route.ComponentProps ) {
    return (
        <>
        <Navbar isLoggedIn = {loaderData}/>
        <main>
        <Outlet />
        </main>
        <Footer />
        </>
    )
}