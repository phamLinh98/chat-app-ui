import { createBrowserRouter } from "react-router-dom";
import LayoutComponent from "../MainComponent/LayoutComponent";
import { ContentComponent } from "../MainComponent/ContentComponent";
import LoginComponent from "../MainComponent/LoginComponent";
import { SiginInComponent } from "../MainComponent/SignInComponent";
import { AuthenticationComponent } from "../MainComponent/PrivateComponent";

export const rootConfig = [
  {
    path: "/",
    element: (
      <AuthenticationComponent>
        <LayoutComponent />
      </AuthenticationComponent>
    ),
    children: [
      {
        path: "chat/:userId",
        element: <ContentComponent />,
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
