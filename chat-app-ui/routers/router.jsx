import { createBrowserRouter } from "react-router-dom";
import AuthWrapperComponent from "../MainComponent/AuthWrapComponent";
import LayoutComponent from "../MainComponent/LayoutComponent";
import { ContentComponent } from "../MainComponent/ContentComponent";
<<<<<<< HEAD
import LoginComponent from "../MainComponent/LoginComponent";
import { SiginInComponent } from "../MainComponent/SignInComponent";
=======
>>>>>>> dbdf5fcac78183f09582136b6fd4181bbbf32c2b

export const rootConfig = [
  {
    path: "/",
    element: <LayoutComponent />,
    children: [
      {
        path: "chat/:userId",
        element: (
          <AuthWrapperComponent>
            <ContentComponent />
          </AuthWrapperComponent>
        ),
      },
    ],
  }
];

const router = createBrowserRouter(rootConfig);

export default router;
