import { Outlet } from "react-router-dom"

export default function Layout() {
    return (
        <>
            <h1>Desde Layout</h1>
            <Outlet/>
        </>
    )
}
