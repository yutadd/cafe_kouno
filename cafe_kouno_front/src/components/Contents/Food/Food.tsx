import { createContext, useContext, useEffect, useState } from "react";
import { context } from "../../../App";
import { ConfirmModal } from "./ConfirmModal/ConfirmModal";
import { DrinkPanel } from "./DrinkPanel";

import "./Food.css"
import { FoodPanel } from "./FoodPanel";
export type ReserveContextType = {
    reserveList: ReserveMapType[],
    setReserveList: any
};
export type ReserveMapType = {
    id: string,
    name: string,
    price: number,
    amount: number,
    size: string
};
const initialize: ReserveContextType = { reserveList: [], setReserveList: () => { } };
export const reserves = createContext<ReserveContextType>(initialize);
export const Food = () => {
    const [reserveLlist, setReserveList] = useState<ReserveMapType[]>([]);
    const [food, setFood] = useState<JSX.Element[]>([]);
    const [hotCoffee, setHotCoffee] = useState<JSX.Element[]>([]);
    const [iceCoffee, setIceCoffee] = useState<JSX.Element[]>([]);
    const [hotOther, setHotOther] = useState<JSX.Element[]>([]);
    const [iceOther, setIceOther] = useState<JSX.Element[]>([]);
    const [showConfirm, setShowConfirm] = useState(false);
    const { apiPath, subPath } = useContext(context);
    useEffect(() => {
        fetch("http://" + apiPath + "/products").then((t) => t.json().then((j) => {
            let _food = [];
            let hot_coffee = [];
            let ice_coffee = [];
            let hot_other = [];
            let ice_other = [];
            for (const elm of j) {
                if (elm["category"] == "food") {
                    _food.push(<FoodPanel key={elm["productId"]} product_id={elm["productId"]} name={elm["productName"]} text={elm["text"]} price={elm["price"]} />)
                } else if (elm["category"] == "hot-coffee") {
                    hot_coffee.push(<DrinkPanel key={elm["productId"]} product_id={elm["productId"]} name={elm["productName"]} price={elm["price"]} priceM={elm["priceM"]} priceL={elm["priceL"]} />);
                } else if (elm["category"] == "ice-coffee") {
                    ice_coffee.push(<DrinkPanel key={elm["productId"]} product_id={elm["productId"]} name={elm["productName"]} price={elm["price"]} priceM={elm["priceM"]} priceL={elm["priceL"]} />);
                } else if (elm["category"] == "hot-other") {
                    hot_other.push(<DrinkPanel key={elm["productId"]} product_id={elm["productId"]} name={elm["productName"]} price={elm["price"]} priceM={elm["priceM"]} priceL={elm["priceL"]} />);
                } else if (elm["category"] == "ice-other") {
                    ice_other.push(<DrinkPanel key={elm["productId"]} product_id={elm["productId"]} name={elm["productName"]} price={elm["price"]} priceM={elm["priceM"]} priceL={elm["priceL"]} />);
                }

            }
            setFood(_food);
            setHotCoffee(hot_coffee);
            setIceCoffee(ice_coffee);
            setHotOther(hot_other);
            setIceOther(ice_other);
        }))
    }, [])

    return (<>
        <reserves.Provider value={{ reserveList: reserveLlist, setReserveList: setReserveList }}>
            <div className="food-outter" id="shop">
                {showConfirm ? <ConfirmModal closeFunc={setShowConfirm} /> : <></>}
                <div className="food-title">FOOD&drink</div>
                <div style={{ display: "block" }}>
                    <img className="food-image" src={subPath + "/images/11.jpg"} alt="0.jpg" />
                    <div className="food-text">
                        <p>以下の商品は、タップしていただくことで</p>選択した後、このボタンで<p>ご予約確定画面へ遷移していただくことが</p><p>可能です。</p>
                        <div style={{ display: "block", textAlign: "center" }}>
                            <button onClick={() => { setShowConfirm(true) }} className="food-button">予約</button></div>
                    </div>
                </div>
                {food}
                <div className="food-title">DRINK</div>
                ドリンクをご予約いただくには、それぞれのサイズをタップしてください
                <div className="big-category-outter">
                    <div className="sub-title">Coffee/コーヒー</div>
                    <div className="category-outter">
                        <div className="category-title">HOT</div>
                        {hotCoffee}
                    </div>
                    <div className="category-outter">
                        <div className="category-title">ICE</div>
                        {iceCoffee}
                    </div>
                </div>
                <hr />
                <div className="big-category-outter">
                    <div className="sub-title">other/その他</div>
                    <div className="category-outter">
                        <div className="category-title">HOT</div>
                        {hotOther}
                    </div>
                    <div className="category-outter">
                        <div className="category-title">ICE</div>
                        {iceOther}
                    </div>
                </div>
            </div>
        </reserves.Provider>
    </>);
}