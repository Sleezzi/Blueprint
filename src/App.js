import { createBrowserRouter, RouterProvider } from "react-router-dom";

import NotFound from "./pages/404";
import Index from "./pages/Index";
import Invite from "./pages/Invite";
import Server from "./pages/Server";
import Thanks from "./pages/Thanks";

import Docs from "./pages/Docs";
import Docs_Index from "./pages/docs/Index";
import Docs_GettingStarted_CodeRecovery from "./pages/docs/getting-started/code-recovery";
import Docs_GettingStarted_InstallingNodeJsModules from "./pages/docs/getting-started/installing-node-js-modules";
import Docs_GettingStarted_ConfigJson from "./pages/docs/getting-started/config-json";
import Docs_GettingStarted_Launch from "./pages/docs/getting-started/launch";

import "./cdn/css/main.css";

function App() {
    const router = createBrowserRouter([
        {
            path: "*",
            element: <NotFound />
        },
        {
            path: "/",
            element: <Index />,
        },
        {
            path: "invite",
            element: <Invite />
        },
        {
            path: "server",
            element: <Server />
        },
        {
            path: "thanks",
            element: <Thanks />
        },
        {
            path: "docs",
            element: <Docs />,
            children: [
                {
                    path: "",
                    element: <Docs_Index />
                },
                {
                    path: "gettings-started/code-recovery",
                    element: <Docs_GettingStarted_CodeRecovery />
                },
                {
                    path: "gettings-started/download-modules",
                    element: <Docs_GettingStarted_InstallingNodeJsModules />
                },
                {
                    path: "gettings-started/config.json",
                    element: <Docs_GettingStarted_ConfigJson />
                },
                {
                    path: "gettings-started/launch",
                    element: <Docs_GettingStarted_Launch />
                }
            ]
        }
    ]);

    return (
        <>
            <RouterProvider router={router} />
        </>
    );
}

export default App;