import { createContext, useContext, useEffect, useState } from "react";

import "./Food.css"
import { FoodPanel } from "./FoodPanel";
export type ReserveContextType = [
    reserveList: ReserveMapType[],
    setReserveList: any
]
export type ReserveMapType = [
    id: string,
    amount: number
]
const initialize: ReserveContextType = [[], () => { }];
export const reserves = createContext<ReserveContextType>(initialize);
export const Food = () => {
    const [reserveLlist, setReserveList] = useState<ReserveMapType[]>([]);
    const [productsElement, setProductsElement] = useState<JSX.Element[]>([]);
    useEffect(() => {
        fetch("http://localhost:8080/products").then((t) => t.json().then((j) => {
            let result = [];
            for (const elm of j) {
                result.push(<><FoodPanel product_id={elm["productId"]} name={elm["productName"]} text={elm["text"]} /></>)
            }
            setProductsElement(result);

        }))
    }, [])

    return (<>
        <reserves.Provider value={[reserveLlist, setReserveList]}>
            <div className="food-outter">
                <div className="food-title">FOOD</div>
                <img className="food-image" src="/images/0.jpg" alt="0.jpg" />
                <div className="food-text">
                    <p>以下の商品は、タップしていただくことで</p>選択した後、このボタンで<p>ご予約確定画面へ遷移していただくことが</p><p>可能です。</p>
                    <div style={{ display: "block", textAlign: "center" }}>
                        <button className="food-button">予約</button>
                    </div>
                </div>
                {productsElement}
            </div>
        </reserves.Provider>
    </>);
}