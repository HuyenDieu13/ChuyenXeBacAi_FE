import { RouterProvider } from "@tanstack/react-router";
import { router } from "./router";
// import GlobalLoading from "./components/GlobalLoading";
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  )
}
export default App;

