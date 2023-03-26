import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { context } from "../../App";

const doCancel = (apiPath: string, id: string) => {
    fetch("https://" + apiPath + "/activation/" + id, { method: 'post', }).then((t) => t.text().then((text) => alert(text)));
}
export const ActivationPanel = () => {
    const statecontext = useContext(context);
    const [button, setButton] = useState(<></>);
    const { id } = useParams<{ id: string }>();
    useEffect(() => {
        setButton(<div onClick={() => doCancel(statecontext.apiPath, id)} className="cancel-panel-button">
            ご注文の有効化
        </div>)
    }, [])
    return (
        <>
            <div className="cancel-panel-outter">
                <div className="cancel-panel-title-outter">
                    <div className="cancel-panel-title">
                        ご注文の有効化
                    </div>
                </div>
                <div className="cancel-panel-contents-outter">
                    <ol className="cancel-panel-contents-inner">
                        <li>ご注文を有効化されるまでは商品のご注文は実行されません</li>
                        <li>ご注文のキャンセルの可否は、商品の作成状況によりますので、ご注意ください</li>
                    </ol>
                    <div className="concel-panel-button-outter">{button}</div>
                </div>
            </div>
        </>)
}