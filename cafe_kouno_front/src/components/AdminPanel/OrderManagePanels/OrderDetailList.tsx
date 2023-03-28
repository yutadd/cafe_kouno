import { orderContext } from "../../OrderManager";
import { useContext, useEffect, useState } from "react";
import { context } from "../../../App";

export const OrderDetailList = () => {
    const { selectedOrders, setSelectedOrders } = useContext(orderContext);
    const stateContext = useContext(context);
    const [orderDetailTable, setOrderDetailTable] = useState<JSX.Element[]>([]);
    const [fetchedJsons, setFetchedJsons] = useState<any[]>([]);
    const addTableToOrderDetailTable = (prev: JSX.Element[], tableElement: JSX.Element) => {
        const _orderDetailTable = prev.concat();
        _orderDetailTable.push(tableElement);
        return (_orderDetailTable);
    }
    useEffect(() => {
        setFetchedJsons([])
        setOrderDetailTable([]);
        for (const order of selectedOrders) {
            fetch("https://" + stateContext.apiPath + "/getorderdetail?id=" + order, { credentials: 'include' }).then((row) => {
                if (row.ok) {
                    row.json().then((json) => {
                        setFetchedJsons((prev) => { const _prev = prev.concat(); _prev.push(json); return (_prev) });
                    })
                }
            });
        }

    }, [selectedOrders])
    useEffect(() => {

        let i = 0;
        setOrderDetailTable([]);
        for (const json of fetchedJsons) {
            const result: JSX.Element[] = [];
            for (const od of json) {
                result.push(
                    <tr key={od["orderDetailId"]}>
                        <td>
                            {od["orderDetailId"]}
                        </td>
                        <td>
                            {od["orderId"]}
                        </td>
                        <td>
                            {od["size"]}
                        </td>
                        <td>
                            {od["productId"]}
                        </td>
                        <td>
                            {od["amount"]}
                        </td>
                    </tr>);
            }
            setOrderDetailTable((prev: JSX.Element[]) => addTableToOrderDetailTable(prev,
                <>
                    <hr />
                    <div className="order-detail-subtitle">オーダー{json[0]["orderId"]}の詳細</div>
                    <table key={json[0]["orderId"]}>
                        <thead>
                            <tr>
                                <th>orderDetailId</th>
                                <th>orderId</th>
                                <th>size</th>
                                <th>productId</th>
                                <th>amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {result}
                        </tbody>
                    </table >
                </>
            ))
            i++;

        }

    }, [fetchedJsons])
    return (<><div className="order-detail-title">オーダー詳細</div>{orderDetailTable}</>);
}