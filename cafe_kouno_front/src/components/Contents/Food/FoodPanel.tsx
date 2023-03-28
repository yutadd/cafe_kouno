import { useContext, useEffect, useState } from 'react'
import { context } from '../../../App';
import { ReserveContextType, ReserveMapType, reserves, } from './Food';
import './FoodPanel.css'
export const FoodPanel = (props: any) => {
    const { reserveList, setReserveList }: ReserveContextType = useContext(reserves);
    const [amount, setAmount] = useState(0);
    const product_id = props.product_id;
    const { apiPath, subPath } = useContext(context);
    const getIndex = (product_id: string) => {
        for (let i = 0; i < reserveList.length; i++) {
            if (reserveList[i].id == product_id) {
                return (i);
            }
        }
        return -1;
    }
    const doReserve = () => {
        const index = getIndex(product_id);
        if (index != -1) {
            let _reserveList = reserveList.concat();

            _reserveList = del(_reserveList, index);

            setReserveList(_reserveList);

            setAmount(0);
        } else {
            let _reserveList = reserveList.concat();

            _reserveList.push({ id: product_id, name: props.name, price: props.price, amount: 1, size: "S" });

            setReserveList(_reserveList);
            setAmount(1);
        }
    }
    function changeamount(increase: boolean) {

        const index = getIndex(product_id);
        if (index != -1) {
            let element = reserveList[index];
            if (increase) {
                element.amount += 1;
                setAmount(amount + 1);
            } else {
                if (element.amount > 1) {
                    element.amount -= 1;
                    setAmount(amount - 1);
                }
            }
            let _reserveList = reserveList.concat();
            console.log(reserveList);
            _reserveList = del(_reserveList, index);
            console.log(index)
            console.log(_reserveList);
            _reserveList.push(element);
            console.log(element);
            console.log(_reserveList);
            setReserveList(_reserveList);
        } else {
            console.log("this item is not reserved yet");
        }
    }
    function del(origin: any[], index: number) {
        let result = [];
        for (let i = 0; i < origin.length; i++) {
            if (i != index) {
                result.push(origin[i]);
            }
        }
        return result;
    }

    return (<><div className='food-panel-outter'>
        <img onClick={() => doReserve()} className={getIndex(product_id) != -1 ? "food-panel-image food-selected-border" : "food-panel-image"} src={subPath + "/images/" + props.product_id + ".webp"} alt="food_image" />
        {getIndex(product_id) != -1 ? <>
            <div onClick={() => changeamount(false)} className='reserve-amount-button'>-</div>
            <div className='reserve-amount-text'>{amount}</div>
            <div onClick={() => changeamount(true)} className='reserve-amount-button'>+</div>
        </> : <><div className='food-panel-placeholder'> 予約するには画像をタップしてください！</div></>}
        <div className='food-panel-text-outter'>
            <div className='food-panel-name'>{props.name}</div>
            <div className='food-panel-text'>{props.text}</div>
            <div className='food-panel-name'>￥{props.price}</div>
        </div>
        <hr />
    </div></>)
}
