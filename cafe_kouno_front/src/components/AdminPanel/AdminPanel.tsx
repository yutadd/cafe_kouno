import { useContext, useEffect, useState } from "react";
import { context, context_type } from "../../App";
import { ChangeDrink } from "./ChangeDrink/ChangeDrink";
import { LoginPanel } from "./LoginPanel.tsx/LoginPanel";
const getlogin = (context: context_type, setLogin: (value: boolean) => void) => {
    fetch("http://" + context.apiPath + "/login", { credentials: 'include' }).then((raw) => raw.text().then((text) => { setLogin(text === "true") }));
}
export const AdminPanel = () => {
    const stateContext = useContext(context);
    const [login, setLogin] = useState(false);
    useEffect(() => {
        getlogin(stateContext, setLogin);
    }, []);

    return (<>{login ? <>
        <ChangeDrink />
        {/*other components goes here*/}
    </> : <LoginPanel setLogin={setLogin} />}</>)
}