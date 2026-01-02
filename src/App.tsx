import { RouterProvider } from "@tanstack/react-router";
import { router } from "./router";
// @ts-ignore
import "swiper/css";
// @ts-ignore
import "swiper/css/pagination";
// @ts-ignore
import "swiper/css/navigation";
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

