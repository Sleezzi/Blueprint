import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import NotFound from "./pages/404";
import Index from "./pages/Index";
import Invite from "./pages/Invite";
import Server from "./pages/Server";

import Docs from "./pages/Docs";
import Docs_Index from "./pages/docs/Index";
import Docs_GettingStarted_CodeRecovery from "./pages/docs/getting-started/code-recovery";
import Docs_GettingStarted_InstallingNodeJsModules from "./pages/docs/getting-started/installing-node-js-modules";
import Docs_GettingStarted_ConfigJson from "./pages/docs/getting-started/config-json";
import Docs_GettingStarted_Launch from "./pages/docs/getting-started/launch";

import Docs_Commands_Help from "./pages/docs/commands/help";
import Docs_Commands_Ban from "./pages/docs/commands/ban";
import Docs_Commands_Banlist from "./pages/docs/commands/banlist";

import Docs_Modules_AutoModerateMessage from "./pages/docs/modules/auto-moderate-message";
import Docs_Modules_Log from "./pages/docs/modules/log";
import Docs_Modules_WelcomeMessage from "./pages/docs/modules/welcome-message";
import Docs_Modules_GoodbyeMessage from "./pages/docs/modules/goodbye-message";

import "./cdn/css/main.css";

function App() {
    const location = useLocation();

    useEffect(() => {
        if (location.pathname.split("/").pop().length > 0) {
            const Text = location.pathname.split("/").pop().replaceAll("-", " ");
            document.title = `RedEye - ${Text.toUpperCase()[0]}${Text.slice(1, Text.length)}`;
        } else {
            document.title = `RedEye`;
        }
    }, [location.pathname]);
    return (
        <Routes>
            <Route exact path="" element={<Index/>} />
            <Route path="*" element={<NotFound />}/>
            <Route path="server" element={<Server/>} />
            <Route path="invite" element={<Invite/>} />
            <Route path="docs" element={<Docs/>}>
                <Route path="" element={<Docs_Index/>} />
                <Route path="gettings-started/*" element={<Docs_GettingStarted_CodeRecovery/>} />
                <Route path="gettings-started/download-modules" element={<Docs_GettingStarted_InstallingNodeJsModules/>} />
                <Route path="gettings-started/config.json" element={<Docs_GettingStarted_ConfigJson/>} />
                <Route path="gettings-started/launch" element={<Docs_GettingStarted_Launch/>} />

                <Route path="commands/*" element={<Docs_Commands_Help/>} />
                <Route path="commands/ban" element={<Docs_Commands_Ban/>} />
                <Route path="commands/banlist" element={<Docs_Commands_Banlist/>} />

                <Route path="modules/*" element={<Docs_Modules_AutoModerateMessage/>} />
                <Route path="modules/auto-role" element={<Docs_Modules_Log/>} />
                <Route path="modules/welcome-message" element={<Docs_Modules_WelcomeMessage/>} />
                <Route path="modules/goodbye-message" element={<Docs_Modules_GoodbyeMessage/>} />
                <Route path="modules/log" element={<Docs_Modules_Log/>} />
            </Route>
        </Routes>
    );
}

export default App;