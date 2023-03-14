import { useContext, useState } from 'react'
import { reserves, reserve_type } from './Food';
import './FoodPanel.css'
export const FoodPanel = (props: any) => {
    const [reserveList, setReserveList]: reserve_type = useContext(reserves);
    const [id_amount, setId_amount] = useState({ id: props.product_id, amount: 0 });
    return (<><div className='food-panel-outter'>
        <img onClick={() => doReserve(reserveList, id_amount)} className={isReserved(reserveList, id_amount) ? "food-panel-image food-selected-border" : "food-panel-image"} src={"/images/" + props.product_id + ".jpg"} alt="" />
        {isReserved(reserveList, id_amount) ? <>
            <div className='reserve-amount-button'>-</div>
            <div className='reserve-amount-text'>{id_amount.amount}</div>
            <div className='reserve-amount-button'>+</div>
        </> : <></>}
    </div></>)
}
function isReserved(reserves: reserve_type[], id_amount: {
    id: any;
    amount: number;
}) {
    for (const reserve of reserves) {
        if (reserve == id_amount.id) {
            return true;
        }
    }
    return false;
}
const doReserve = (reserves: reserve_type[], id_amount: {
    id: any;
    amount: number;
}) => {
    if (isReserved(reserves, id_amount)) {

    } else {
    }

}