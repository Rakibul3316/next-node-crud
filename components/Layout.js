import Head from "next/head";
import Navbar from './Navbar';

const Layout = ({ children }) => {
    return (
        <>
            <Head>
                <title>Event App</title>
            </Head>
            <Navbar />
            {children}
        </>
    )
}

export default Layout;