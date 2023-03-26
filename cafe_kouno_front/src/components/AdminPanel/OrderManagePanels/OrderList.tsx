import { useContext, useEffect, useState } from "react";
import { context } from "../../../App"
import { orderContext } from "../../OrderManager";
import "./OrderList.css"
export const OrderList = () => {
    const stateContext = useContext(context);
    const [orderRecords, setOrderRecords] = useState<JSX.Element[]>([]);
    const [page, setPange] = useState(0);
    const { selectedOrder, setSelectedOrder } = useContext(orderContext);
    const getOrders = (mode: number, page: number) => {
        fetch("https://" + stateContext.apiPath + "/orders?mode=" + mode + "&page=" + page, { credentials: 'include' }).then((row) => {
            if (row.ok) {
                row.json().then((json) => {
                    const result = [];
                    for (const elm of json) {
                        let parsed = new Date(elm["reserveDate"]);
                        parsed.setHours(parsed.getHours() + 9);
                        result.push(<tr onClick={() => setSelectedOrder(elm["orderId"])} key={elm["orderId"]} className="orders-record">
                            <td>{elm["name"]}</td>
                            <td>{elm["valid"] + ""}</td>
                            <td>{elm["orderId"]}</td>
                            <td>{parsed.toLocaleString('ja-JP')}</td>
                            <td>{elm["filled"] + ""}</td>
                            <td>{elm["cancelled"] + ""}</td>
                            <td>{elm["ready"] + ""}</td>
                            <td>{elm["email"]}</td>
                            <td>{elm["deleted"] + ""}</td>
                        </tr>);
                    }
                    setOrderRecords(result);
                })
            }
        });
    }
    const deleteFilled = (mode: number) => {
        fetch("https://" + stateContext.apiPath + "/delorders?mode=" + mode, { credentials: 'include' }).then((row) => {
            if (row.ok) {
                row.text().then((text) => {
                    alert(text);
                })
            }
        });
    }
    useEffect(() => {

        getOrders(0, page);
    }, [])
    return (<div className="order-outter">
        <div onClick={() => deleteFilled(0)} className="order-list-manage-button">
            キャンセルされた注文(cancelled)を削除
        </div>
        <div onClick={() => deleteFilled(1)} className="order-list-manage-button">
            受け渡しが終わった注文(filled)を削除
        </div>
        <div onClick={() => deleteFilled(2)} className="order-list-manage-button">
            注文から30分間アクティベーション(valid)されなかった注文を削除
        </div>
        <div onClick={() => getOrders(0, 0)} className="order-list-manage-button">
            有効かつキャンセルされていない予約のみ表示
        </div>
        <div onClick={() => getOrders(1, 0)} className="order-list-manage-button">
            すべて表示
        </div>
        <div onClick={() => getOrders(2, 0)} className="order-list-manage-button">
            削除された予約表示
        </div>
        <table className="order-table">
            <thead>
                <tr>
                    <th>name</th>
                    <th>valid</th>
                    <th>orderId</th>
                    <th>reserveDate</th>
                    <th>filled</th>
                    <th>cancelled</th>
                    <th>ready</th>
                    <th>email</th>
                    <th>deleted</th>
                </tr>
            </thead>
            <tbody>
                {orderRecords}
            </tbody>
        </table>
    </div>)
}