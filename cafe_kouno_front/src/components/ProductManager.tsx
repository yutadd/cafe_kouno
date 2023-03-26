import { Admin } from "./AdminPanel/Admin";
import { DeleteProduct } from "./AdminPanel/ProductManagePanels/DeleteProduct";
import { RegisterDrink } from "./AdminPanel/ProductManagePanels/RegisterProduct";
import { UpdateDrink } from "./AdminPanel/ProductManagePanels/UpdateProduct";
import { Header } from "./Header/Header"

export const ProductManager = () => {

    return (
        <>
            <Header />
            <Admin >
                <RegisterDrink />
                <UpdateDrink />
                <DeleteProduct />
            </Admin>
        </>
    )
}