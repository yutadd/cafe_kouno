import { useContext, useEffect, useState } from "react";
import { context, context_type } from "../../App";
import { ChangeDrink } from "./ChangeDrink/ChangeDrink";
import { LoginPanel } from "./LoginPanel.tsx/LoginPanel";
const getlogin = (context: context_type): boolean => {
    fetch("http://" + context.apiPath + "/login").then((raw) => raw.text().then((text) => { return text === "true" }));
    return false;
}
export const AdminPanel = () => {
    const stateContext = useContext(context);
    const [login, setLogin] = useState(false);
    useEffect(() => {
        setLogin(getlogin(stateContext));
    }, []);

    return (<>{login ? <>
        <ChangeDrink />
        {/*other components goes here*/}
    </> : <LoginPanel />}</>)
}