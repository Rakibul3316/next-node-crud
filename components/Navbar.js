import Link from "next/link";

const Navbar = () => {
    return (
        <nav nav className="navbar" >
            <Link href="/">
                <a className="navbar-brand">Event App</a>
            </Link>
            <Link href="/create-event">
                <a className="creat">Creat One</a>
            </Link>
        </nav >
    )
}

export default Navbar;