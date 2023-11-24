import React from "react";
import NavigationBar from "../Components/NavigationBar/NavigationBar";
import Footer from "../Components/Footer/Footer";
import { Outlet } from "react-router-dom";

const Main = () => {
    return (
        <div className="max-w-7xl mx-auto min-h-screen">
            <div className="fixed w-full max-w-7xl border-b">
                <NavigationBar></NavigationBar>
            </div>
            <div className="lg:min-h-[710px] min-h-screen pt-[68px] ">
                <Outlet></Outlet>
            </div>
            <div>
                <Footer></Footer>
            </div>
        </div>
    );
};

export default Main;
