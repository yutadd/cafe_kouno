import { useContext, useEffect, useState } from "react";
import { context } from "../../../App"
import { orderContext, orderContextType } from "../../OrderManager";
import "./OrderList.css"
export const OrderList = () => {
    //更新頻度が多いから少し負荷になる可能性あり。
    const stateContext = useContext(context);
    const [orderRecords, setOrderRecords] = useState<JSX.Element[]>([]);
    const [page, setPage] = useState("0");
    const [fetchedJson, setFetchedJson] = useState([]);
    const [mode, setMode] = useState(0)
    const { selectedOrders, setSelectedOrders } = useContext<orderContextType>(orderContext);
    const addOrDelselFromSelected = (prev: string[], selected: string) => {
        let index = prev.indexOf(selected);
        if (index != -1) {
            const _selectedOrders = prev.concat();
            _selectedOrders.splice(index, 1);
            return _selectedOrders
        } else {
            return [...prev, selected];
        }
    }

    const getOrders = (mode: number, page: number) => {
        fetch("https://" + stateContext.apiPath + "/orders?mode=" + mode + "&page=" + page, { credentials: 'include' }).then((row) => {
            if (row.ok) {
                row.json().then((json) => {
                    setFetchedJson(json);
                })
            }
        });
    }
    useEffect(() => {
        getOrders(mode, Number(page));
    }, [selectedOrders, mode, page])
    const fillOrder = (id: string) => {
        fetch("https://" + stateContext.apiPath + "/order/fill", {
            method: "post", headers: {
                'Content-Type': 'application/json' // JSON形式のデータのヘッダー
            }, credentials: 'include', body: JSON.stringify([id])
        }).then((row) => {
            if (row.ok) {
                row.text().then((text) => {
                    alert(text);
                    setSelectedOrders([]);
                })
            }
        });
    }
    const readyOrder = (id: string) => {
        fetch("https://" + stateContext.apiPath + "/order/ready", {
            method: "post", headers: {
                'Content-Type': 'application/json' // JSON形式のデータのヘッダー
            }, credentials: 'include', body: JSON.stringify([id])
        }).then((row) => {
            if (row.ok) {
                row.text().then((text) => {
                    alert(text);
                    setSelectedOrders([]);
                })
            }
        });
    }
    const deleteOrder = (id: string) => {
        fetch("https://" + stateContext.apiPath + "/order/delete", {
            method: "post", headers: {
                'Content-Type': 'application/json' // JSON形式のデータのヘッダー
            }, credentials: 'include', body: JSON.stringify([id])
        }).then((row) => {
            if (row.ok) {
                row.text().then((text) => {
                    alert(text);
                    setSelectedOrders([]);
                })
            }
        });
    }
    const deleteBySelected = () => {
        fetch("https://" + stateContext.apiPath + "/order/delete", {
            method: "post", headers: {
                'Content-Type': 'application/json' // JSON形式のデータのヘッダー
            }, credentials: 'include', body: JSON.stringify(selectedOrders)
        }).then((row) => {
            if (row.ok) {
                row.text().then((text) => {
                    alert(text);
                    setSelectedOrders([]);
                })
            }
        });
    }
    const deleteByMode = (mode: number) => {
        fetch("https://" + stateContext.apiPath + "/delorders?mode=" + mode, { credentials: 'include' }).then((row) => {
            if (row.ok) {
                row.text().then((text) => {
                    alert(text);
                })
            }
        });
    }

    useEffect(() => {
        const result = [];
        let i = 0;
        for (const elm of fetchedJson) {
            let parsed = new Date(elm["reserveDate"]);
            result.push(
                <tr key={elm["orderId"]} className="orders-record">
                    <td><input checked={selectedOrders.indexOf(elm["orderId"]) != -1} type="checkbox" onChange={() => setSelectedOrders((prev: string[]) => addOrDelselFromSelected(prev, elm["orderId"]))} /> </td>
                    <td>{elm["name"]}</td>
                    <td>{elm["valid"] + ""}</td>
                    <td>{elm["orderId"]}</td>
                    <td>{parsed.toLocaleString('ja-JP')}</td>
                    <td><input type="checkbox" checked={elm["filled"]} onChange={(e) => fillOrder(elm["orderId"])} /></td>
                    <td>{elm["cancelled"] + ""}</td>
                    <td><input type="checkbox" checked={elm["ready"]} onChange={(e) => readyOrder(elm["orderId"])} /></td>
                    <td>{elm["email"]}</td>
                    <td><input type="checkbox" checked={elm["deleted"]} onChange={(e) => deleteOrder(elm["orderId"])} /></td>
                </tr>);
        }
        console.log("setorderrecords→", result)
        setOrderRecords(result);
    }, [fetchedJson])
    return (<div className="order-outter">
        <div onClick={() => deleteBySelected()} className="order-list-manage-button">
            選択(selected)されている注文を削除
        </div>
        <div onClick={() => deleteByMode(0)} className="order-list-manage-button">
            キャンセルされた注文(cancelled)を削除
        </div>
        <div onClick={() => deleteByMode(1)} className="order-list-manage-button">
            受け渡しが終わった注文(filled)を削除
        </div>
        <div onClick={() => deleteByMode(2)} className="order-list-manage-button">
            注文から30分間アクティベーション(valid)されなかった注文を削除
        </div>
        <div onClick={() => setMode(0)} className="order-list-manage-button">
            有効かつキャンセルされていない予約のみ表示
        </div>
        <div onClick={() => setMode(1)} className="order-list-manage-button">
            すべて表示
        </div>
        <div onClick={() => setMode(2)} className="order-list-manage-button">
            削除された予約表示
        </div>
        <div className="order-list-title">
            オーダーリスト
        </div>
        <table className="order-table">
            <thead>
                <tr>
                    <th>selected</th>
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
        <div className="order-paging-outter">
            <div onClick={() => setPage((prev) => (Number(prev) - 1) + "")} className="order-paging-button">←</div>
            <input type="number" value={page ? page : ""} onChange={(e) => setPage(e.target.value)} className="order-paging-num" />
            <div onClick={() => setPage((prev) => (Number(prev) + 1) + "")} className="order-paging-button">→</div>
        </div>
    </div >)
}