import MobileSidebar from "../MobileSidebar/MobileSidebar"
import Sidebar from "../Sidebar/Sidebar"

export default function GraphPlotter() {
    return (
        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
            <Sidebar />
            <div className="flex flex-col">
               <MobileSidebar />

            </div>
        </div>
    )
}