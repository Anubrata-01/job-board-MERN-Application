import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Components/Home";
import Auth from "./Components/Authentication/Auth";
import Hero from "./Components/HeroComponent/Hero";
import Jobs from "./Components/NavComponents/Jobs";
import  { ProtectedRoute, RecruiterProtectedRoute,} from "./utilities/ProtectedRoute";
import Recruiter from "./Components/Recruiter";
import { useAtom } from "jotai";
import { userDataAtom } from "./store/store";
import { memo } from "react";

const MemoiezedJobs=memo(Jobs)
function App() {
  const [userData]=useAtom(userDataAtom);
  const isAuth=userData && userData?.profileType || false;
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Auth />,
    },
    {
      path: "/home",
      element: (
        <ProtectedRoute isAuth={isAuth}>
          <Home />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "",
          element: <Hero />,
        },
        {
          path: "jobs",
          element: <ProtectedRoute isAuth={isAuth}>
            <MemoiezedJobs/>
          </ProtectedRoute>,
        },
      ],
    },
    {
      path: "/recruiter",
      element: (
        <RecruiterProtectedRoute>
          <Recruiter />
        </RecruiterProtectedRoute>
      ),
    },
  ]);

  return <RouterProvider router={routes} />;
}

export default App;