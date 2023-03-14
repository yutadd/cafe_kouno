import { useContext, useEffect, useState } from 'react'
import { ReserveContextType, ReserveMapType, reserves, } from './Food';
import './FoodPanel.css'
export const FoodPanel = (props: any) => {
    const [reserveList, setReserveList]: ReserveContextType = useContext(reserves);
    console.log(reserveList);
    const [amount, setAmount] = useState(0);
    const product_id = props.product_id;
    const getIndex = (product_id: string) => {
        for (let i = 0; i < reserveList.length; i++) {
            if (reserveList[i][0] == product_id) {
                return (i);
            }
        }
        return -1;
    }
    const doReserve = () => {
        const index = getIndex(product_id);
        if (index != -1) {
            let _reserveList = reserveList.concat();
            _reserveList.splice(index);
            setReserveList(_reserveList);
            setAmount(0);
        } else {
            let _reserveList = reserveList.concat();
            _reserveList.push([product_id, 1]);
            setReserveList(_reserveList);
            setAmount(1);
        }
    }
    function changeamount(increase: boolean) {
        const index = getIndex(product_id);
        if (index != -1) {
            let element = reserveList[index];
            if (increase) {

                element[1] += 1;
                setAmount(amount + 1);
            } else {
                if (element[1] > 0) element[1] -= 1;
                setAmount(amount - 1);
            }
            let _reserveList = reserveList.concat();
            _reserveList.splice(index);
            _reserveList.push(element);
            setReserveList(_reserveList);
        } else {
            console.log("this item is not reserved yet");
        }

    }

    return (<><div className='food-panel-outter'>
        <img onClick={() => doReserve()} className={getIndex(product_id) != -1 ? "food-panel-image food-selected-border" : "food-panel-image"} src={"/images/" + props.product_id + ".jpg"} alt="" />
        {getIndex(product_id) != -1 ? <>
            <div onClick={() => changeamount(false)} className='reserve-amount-button'>-</div>
            <div className='reserve-amount-text'>{amount}</div>
            <div onClick={() => changeamount(true)} className='reserve-amount-button'>+</div>
        </> : <></>}
    </div></>)
}
