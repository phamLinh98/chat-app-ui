import { createBrowserRouter } from "react-router-dom";
import LayoutComponent from "../MainComponent/LayoutComponent";
import { ContentComponent } from "../MainComponent/ContentComponent";

export const rootConfig = [
  {
    path: "/",
    element: <LayoutComponent />,
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
