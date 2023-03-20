import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { context } from "../../App";
import "./CancelPanel.css"
const doCancel = (apiPath: string, id: string) => {
    fetch("http://" + apiPath + "/cancel/" + id, { method: 'post', }).then((t) => t.text().then((text) => alert(text)));
}
export const CancelPanel = () => {
    const statecontext = useContext(context);
    const [button, setButton] = useState(<></>);
    const { id } = useParams<{ id: string }>();
    useEffect(() => {
        fetch("http://" + statecontext.apiPath + "/cancelable/" + id,).then((t) => {
            t.text().then((t2) => {
                if (t2 === "true") {
                    setButton(<div onClick={() => doCancel(statecontext.apiPath, id)} className="cancel-panel-button">
                        ご注文キャンセル実行
                    </div>)
                }
            })
        })

    }, [])
    return (
        <>
            <div className="cancel-panel-outter">
                <div className="cancel-panel-title-outter">
                    <div className="cancel-panel-title">
                        ご注文のキャンセル
                    </div>
                </div>
                <div className="cancel-panel-contents-outter">
                    <ol className="cancel-panel-contents-inner">
                        <li>ご注文のされた商品の準備が整った後のキャンセルは致しかねます。</li>
                    </ol>
                    <div className="concel-panel-button-outter">{button}</div>
                </div>
            </div>
        </>)
}