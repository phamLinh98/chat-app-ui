import { createBrowserRouter } from "react-router-dom";
import AuthWrapperComponent from "../MainComponent/AuthWrapComponent";
import LayoutComponent from "../MainComponent/LayoutComponent";
import { ContentComponent } from "../MainComponent/ContentComponent";

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
