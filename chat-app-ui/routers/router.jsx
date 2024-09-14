import { createBrowserRouter } from "react-router-dom";
import LayoutComponent from "../MainComponent/LayoutComponent";
import { ContentComponent } from "../MainComponent/ContentComponent";
import LoginComponent, {
  AuthWrapperComponent,
} from "../MainComponent/LoginComponent";
import { SiginInComponent } from "../MainComponent/SignInComponent";

export const rootConfig = [
  {
    path: "/login",
    element: <LoginComponent />,
  },
  {
    path: "/signin",
    element: <SiginInComponent />,
  },
  {
    path: "/",
    element: (
      <AuthWrapperComponent>
        <LayoutComponent />
      </AuthWrapperComponent>
    ),
    children: [
      {
        path: "chat/:userId",
        element: <ContentComponent />,
      },
    ],
  },
];

const router = createBrowserRouter(rootConfig);

export default router;
