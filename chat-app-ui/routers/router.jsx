import { createBrowserRouter } from "react-router-dom";
import { ContentComponent } from "../MainComponent/ContentComponent";
import LoginComponent, {
  AuthWrapperComponent,
} from "../MainComponent/LoginComponent";
import { SiginInComponent } from "../MainComponent/SignInComponent";
import { LayoutComponent } from "../MainComponent/LayoutComponent";

export const rootConfig = [
  {
    path: "/login",
    element: <LoginComponent />,
  },
  {
    path: "/signin",
    element: <SiginInComponent/>
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
