import { createRootRoute } from "@tanstack/react-router";
import { redirect } from "react-router-dom";

export const rootRoute = createRootRoute({
    beforeLoad: ({location})=>{
        if(location.pathname === "/"){
            return redirect("/home");
        }
    }
});
