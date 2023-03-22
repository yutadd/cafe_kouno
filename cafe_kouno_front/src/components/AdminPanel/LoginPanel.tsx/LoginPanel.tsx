import { useState } from "react";
import "./LoginPanel.css"
export const LoginPanel = (props: any) => {
    const [password, setPassword] = useState("");
    return (
        <>
            <div className="login-contents-outter">
                <div className="login-title-outter">
                    <div className="login-title-inner">
                        管理者ログイン
                    </div>
                </div>
                <div className="login-content-outter">
                    パスワード:
                    <input onChange={(c) => {
                        setPassword(c.target.value ? c.target.value : "");//フロントエンドは書き換え可能なので、極力バックエンドで値のチェックを行いますねー
                    }} type="login-password-input" />

                </div>
                <div className="login-submit-button">
                    ログイン
                </div>
            </div>
        </>
    )
}