import { createContext, useState } from "react";
import { Admin } from "./AdminPanel/Admin"
import { OrderDetailList } from "./AdminPanel/OrderManagePanels/OrderDetailList";
import { OrderList } from "./AdminPanel/OrderManagePanels/OrderList"
import { Header } from "./Header/Header"

export type orderContextType = { selectedOrder: string, setSelectedOrder: (value: string) => void };
const initialValue: orderContextType = { selectedOrder: "initialValue", setSelectedOrder: (value: string) => { console.log("executed setSelectedOrder with initial value") } }
export const orderContext = createContext<orderContextType>(initialValue);
export const OrderManager = () => {
    const [selectedOrder, setSelectedOrder] = useState("0");
    const _orderContext: orderContextType = {
        selectedOrder: selectedOrder, setSelectedOrder: setSelectedOrder
    }
    return (<>

        <Header />
        <Admin>
            <orderContext.Provider value={_orderContext}>
                <OrderList />
                <OrderDetailList />
            </orderContext.Provider>
        </Admin>

    </>
    )
}