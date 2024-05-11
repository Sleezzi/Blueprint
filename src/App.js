import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

import {
    NotFound,
    Index,
    Invite,
    Server,
    
    Docs,
    Docs_Index,
    Docs_GettingStarted_CodeRecovery,
    Docs_GettingStarted_InstallingNodeJsModules,
    Docs_GettingStarted_ConfigJson,
    Docs_GettingStarted_Launch,
    
    Docs_Commands_Help,
    Docs_Commands_Ban,
    Docs_Commands_Banlist,
    Docs_Commands_AddBannedWord,
    Docs_Commands_RemoveBannedWord,
    Docs_Commands_Commands,
    Docs_Commands_Clean,
    Docs_Commands_Clear,
    
    Docs_Modules_AutoModerateMessage,
    Docs_Modules_Log,
    Docs_Modules_Autorole,
    Docs_Modules_WelcomeMessage,
    Docs_Modules_GoodbyeMessage,
    Docs_Modules_Levels,
    Docs_Modules_BlockLink,
    Docs_Commands_Modules,
} from "./Pages";

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
                <Route path="gettings-started/dev/download-modules" element={<Docs_GettingStarted_InstallingNodeJsModules/>} />
                <Route path="gettings-started/dev/config.json" element={<Docs_GettingStarted_ConfigJson/>} />
                <Route path="gettings-started/dev/launch" element={<Docs_GettingStarted_Launch/>} />

                <Route path="commands/*" element={<Docs_Commands_Help/>} />
                <Route path="commands/ban" element={<Docs_Commands_Ban/>} />
                <Route path="commands/banlist" element={<Docs_Commands_Banlist/>} />
                <Route path="commands/add-banned-word" element={<Docs_Commands_AddBannedWord/>} />
                <Route path="commands/remove-banned-word" element={<Docs_Commands_RemoveBannedWord/>} />
                <Route path="commands/commands" element={<Docs_Commands_Commands/>} />
                <Route path="commands/clean" element={<Docs_Commands_Clean/>} />
                <Route path="commands/clear" element={<Docs_Commands_Clear/>} />
                <Route path="commands/modules" element={<Docs_Commands_Modules/>} />

                <Route path="modules/*" element={<Docs_Modules_AutoModerateMessage/>} />
                <Route path="modules/auto-role" element={<Docs_Modules_Autorole/>} />
                <Route path="modules/welcome-message" element={<Docs_Modules_WelcomeMessage/>} />
                <Route path="modules/goodbye-message" element={<Docs_Modules_GoodbyeMessage/>} />
                <Route path="modules/log" element={<Docs_Modules_Log/>} />
                <Route path="modules/levels" element={<Docs_Modules_Levels/>} />
                <Route path="modules/block-link" element={<Docs_Modules_BlockLink/>} />
            </Route>
        </Routes>
    );
}

export default App;