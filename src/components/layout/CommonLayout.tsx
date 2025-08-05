import type { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface IChild {
    children: ReactNode
}

const CommonLayout = ({ children }: IChild) => {
    return (
        <div>
            <Navbar />
            {children}
            <Footer />
        </div>
    );
};

export default CommonLayout;