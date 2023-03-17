import { useContext, useState } from "react";
import "./ConfirmModal.css"
import { ReserveContextType, reserves } from "../Food";
import { ConfirmModalInput } from "./ConfirmModalInput";
import { METHODS } from "http";

export const ConfirmModal = (props: any) => {
    const { reserveList, setReserveList }: ReserveContextType = useContext(reserves);
    const [email, setEmail] = useState<string>("");
    const [name, setName] = useState<string>("");
    let products = [];
    let sum = 0;
    for (const elm of reserveList) {
        products.push(<><div className="confirm-modal-products-item">{elm.name}x{elm.amount}　　小計￥{elm.price * elm.amount}</div></>);
        sum += elm.price * elm.amount;
    }
    const setShowConfirm = props.closeFunc;
    const doReserve = () => {
        let products = [];
        for (const elm of reserveList) {
            products.push({ "product_id": elm.id, "amount": elm.amount, size: elm.size });
        }
        console.log(JSON.stringify({ name: name, mail: email, products: products }));
        fetch("http://localhost:8080/order", { method: 'post', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: name, mail: email, products: products }) })
        alert('ご注文を確定いたしました！\r\nメールの送信が完了するまで少しお待ち頂く場合がございます');
        setShowConfirm(false);
    }
    return <>
        <div className="confirm-modal-outter" >
        </div>
        <div className="confirm-modal-contents-outter">
            <div className="confirm-modal-close-button" onClick={() => setShowConfirm(false)}>X</div>
            <div className="confirm-modal-title">ご注文内容</div>
            <div>{products}</div>
            <div className="confirm-model-sum">合計　￥{sum}</div>
            <div className="confirm-modal-form-outter">
                <ConfirmModalInput email={email} setEmail={setEmail} label="メールアドレス" autocomplete="email" />
                <ConfirmModalInput email={name} setEmail={setName} label="お名前" autocomplete="name" />
            </div>
            <p className="confirm-modal-verify-way">ご注文確定後、メールにて認証メールをお送りいたしますので、メールの内容に従い、認証を行ってください。</p>
            <div onClick={doReserve} className="confirm-modal-submit-button">注文確定</div>
        </div>
    </>
}