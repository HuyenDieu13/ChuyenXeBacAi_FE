import React from "react";
import Header from "../shared/components/Header";

const MainLayout = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col w-full">
            <Header />
        <main className="flex-1 w-full">{children}</main>
    </div>
    );
}
export default MainLayout;