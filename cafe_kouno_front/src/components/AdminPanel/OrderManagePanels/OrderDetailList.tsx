import { orderContext } from "../../OrderManager";
import { useContext, useEffect, useState } from "react";
import { context } from "../../../App";

export const OrderDetailList = () => {
    const { selectedOrder, setSelectedOrder } = useContext(orderContext);
    const stateContext = useContext(context);
    const [orderDetailElements, setOrderDetailElements] = useState<JSX.Element[]>([]);
    useEffect(() => {
        fetch("http://" + stateContext.apiPath + "/getorderdetail?id=" + selectedOrder, { credentials: 'include' }).then((row) => {
            if (row.ok) {
                row.json().then((json) => {
                    const result = [];
                    for (const od of json) {
                        result.push(
                            <tr>
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
                            </tr>
                        )
                    }
                    setOrderDetailElements(result);
                })
            }
        });
    }, [selectedOrder])
    return (<table>
        <thead>
            <th>orderDetailId</th>
            <th>orderId</th>
            <th>size</th>
            <th>productId</th>
            <th>amount</th>
        </thead>
        <tbody>
            {orderDetailElements}
        </tbody>
    </table>);
}