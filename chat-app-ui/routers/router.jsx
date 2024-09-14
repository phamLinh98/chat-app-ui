import { createBrowserRouter } from "react-router-dom";
import AuthWrapperComponent from "../MainComponent/AuthWrapComponent";
import LayoutComponent from "../MainComponent/LayoutComponent";
import { ContentComponent } from "../MainComponent/ContentComponent";
import LoginComponent from "../MainComponent/LoginComponent";
import { SiginInComponent } from "../MainComponent/SignInComponent";

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
  },
  {
    path: "/login",
    element: <LoginComponent />,
  },
  {
    path: "/signin",
    element: <SiginInComponent />,
  },
];

const router = createBrowserRouter(rootConfig);

export default router;
