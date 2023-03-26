import { useContext, useEffect, useState } from "react";
import { context, context_type } from "../../App";
import { LoginPanel } from "./LoginPanel.tsx/LoginPanel";
import "./Admin.css";
const getlogin = (context: context_type, setLogin: (value: boolean) => void) => {
    fetch("https://" + context.apiPath + "/login", { credentials: 'include' }).then((raw) => raw.text().then((text) => { setLogin(text === "true") }));
}
export const Admin = (props: any) => {
    const stateContext = useContext(context);
    const [login, setLogin] = useState(false);
    useEffect(() => {
        getlogin(stateContext, setLogin);
    }, []);

    return (
    <>
    {login ? 
    <>
        {props.children}
    </> 
    :
     <LoginPanel setLogin={setLogin} />
     }
     </>)
}