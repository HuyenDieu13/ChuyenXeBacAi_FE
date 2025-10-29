import { createRootRoute, redirect } from "@tanstack/react-router";

export const rootRoute = createRootRoute({
    beforeLoad: ({location})=>{
        if(location.pathname === "/"){
            throw redirect({to: "/home"});
        }
    }
});
