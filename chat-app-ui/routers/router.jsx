import { createBrowserRouter } from "react-router-dom";
import { ContentComponent } from "../MainComponent/ContentComponent";
import LoginComponent, {
  AuthWrapperComponent,
} from "../MainComponent/LoginComponent";
import { SiginInComponent } from "../MainComponent/SignInComponent";
import { LayoutComponent } from "../MainComponent/LayoutComponent";
import { HomePageComponent } from "../MainComponent/HomePageComponent";
import { GameComponent } from "../MainComponent/GameComponent";

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
      {
        path: "/home",
        element: <HomePageComponent />,
      },
      {
        path: "/game",
        element: <GameComponent />,
      },
    ],
  },
];

const router = createBrowserRouter(rootConfig);

export default router;
