import { useContext, useEffect, useState } from "react"
import { reserves } from "./Food"
import "./Cart.css"
export const Cart = (props: any) => {
    const { reserveList, setReserveList } = useContext(reserves);

    const result = [];
    for (const elm of reserveList) {
        result.push(<div key={elm.id} className="cart-item-outter">
            {elm.name}(￥{elm.price}) x {elm.amount} =￥{elm.price * elm.amount}
        </div>)
    }

    return (
        <>
            {
                reserveList.length > 0 ? < div className="cart-outter" >
                    <div className="cart-title-outter">
                        カート
                    </div>
                    <div className="cart-list-outter">
                        {result}
                    </div>
                    <div className="cart-reserve-button" onClick={props.onClick}>予約ボタン</div>
                </div > :
                    <></>
            }
        </>
    )
}