import { useContext, useState } from "react";
import { context } from "../../../App";
import "./LoginPanel.css"
function doLogin(password: string, apiPath: string, setLogin: (param: boolean) => void) {

    fetch("http://" + apiPath + "/login?password=" + password, { method: "post", credentials: 'include' }).then((raw) => { raw.text().then((text) => alert(text + raw.ok)); setLogin(raw.ok) });
}
export const LoginPanel = (props: any) => {
    const [password, setPassword] = useState("");
    const stateContext = useContext(context);
    return (
        <>
            <div className="login-contents-outter">
                <div className="login-title-outter">
                    <div className="login-title-inner">
                        管理者ログイン
                    </div>
                </div>
                <div className="login-content-outter">
                    ログイン後一時間でログイン期限が切れます。
                    <p>パスワード:</p>
                    <input onChange={(c) => {
                        setPassword(c.target.value ? c.target.value : "");//フロントエンドは書き換え可能なので、極力バックエンドで値のチェックを行いますねー
                    }} className="login-password-input" type="password" />

                </div>
                <div className="login-submit-button" onClick={() => { doLogin(password, stateContext.apiPath, props.setLogin) }}>
                    ログイン
                </div>
            </div>
        </>
    )
}