import { createContext, useEffect, useState } from "react";
import { Admin } from "./AdminPanel/Admin"
import { OrderDetailList } from "./AdminPanel/OrderManagePanels/OrderDetailList";
import { OrderList } from "./AdminPanel/OrderManagePanels/OrderList"
import { Header } from "./Header/Header"

export type orderContextType = { selectedOrders: string[], setSelectedOrders: any };
const initialValue: orderContextType = { selectedOrders: [], setSelectedOrders: () => { } }
export const orderContext = createContext<orderContextType>(initialValue);
export const OrderManager = () => {
    const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
    return (<>
        <Header />
        <Admin>
            <orderContext.Provider value={{ selectedOrders, setSelectedOrders }}>
                <OrderList />
                <OrderDetailList />
            </orderContext.Provider>
        </Admin>

    </>
    )
}