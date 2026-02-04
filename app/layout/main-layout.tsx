import { Outlet } from "react-router";
import { Footer } from "~/components/layout-components/Footer";
import { Navbar } from "~/components/layout-components/Navbar";

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-[#f5f5f0]">
                {children}
            </main>
            <Footer />
        </>
    )
}