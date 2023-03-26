import { Admin } from "./AdminPanel/Admin"
import { OrderList } from "./AdminPanel/OrderManagePanels/OrderList"
import { Header } from "./Header/Header"

export const OrderManager = () => {
    return (<>
        <Header />
        <Admin>
            <OrderList />
        </Admin>
    </>
    )
}