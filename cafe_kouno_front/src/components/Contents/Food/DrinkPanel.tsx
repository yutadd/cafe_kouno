import { useContext, useEffect, useState } from 'react'
import { ReserveContextType, ReserveMapType, reserves, } from './Food';
import './DrinkPanel.css'
//TODO:サイズの扱い方の統一（数値か文字か）
export const DrinkPanel = (props: any) => {
    const { reserveList, setReserveList }: ReserveContextType = useContext(reserves);
    const [amountS, setAmountS] = useState(0);
    const [amountM, setAmountM] = useState(0);
    const [amountL, setAmountL] = useState(0);
    const product_id = props.product_id;
    const getIndex = (product_id: string, size: string) => {
        for (let i = 0; i < reserveList.length; i++) {
            if (reserveList[i].id == product_id && reserveList[i].size == size) {
                return (i);
            }
        }
        return -1;
    }
    const doReserve = (size: number) => {
        const index = getIndex(product_id, (size == 0 ? "S" : size == 1 ? "M" : "L"));
        if (index != -1) {
            let _reserveList = reserveList.concat();
            _reserveList = del(_reserveList, index);
            setReserveList(_reserveList);
            switch (size) {
                case 0: setAmountS(0);
                    break;
                case 1: setAmountM(0);
                    break;
                case 2: setAmountL(0);
                    break;
            }
        } else {
            let _reserveList = reserveList.concat();
            _reserveList.push({ id: product_id, name: props.name + (size == 0 ? "S" : size == 1 ? "M" : "L"), price: size == 0 ? props.price : size == 1 ? props.priceM : props.priceL, amount: 1, size: size == 0 ? "S" : size == 1 ? "M" : "L" });
            setReserveList(_reserveList);
            switch (size) {
                case 0: setAmountS(1);
                    break;
                case 1: setAmountM(1);
                    break;
                case 2: setAmountL(1);
                    break;
            }
        }
    }
    function changeamount(increase: boolean, size: number) {
        const index = getIndex(product_id, (size == 0 ? "S" : size == 1 ? "M" : "L"));
        if (index != -1) {
            let element = reserveList[index];
            if (increase) {
                element.amount += 1;
                switch (size) {
                    case 0: setAmountS(amountS + 1);
                        break;
                    case 1: setAmountM(amountM + 1);
                        break;
                    case 2: setAmountL(amountL + 1);
                        break;
                }
            } else {
                if (element.amount > 1) {
                    element.amount -= 1;
                    switch (size) {
                        case 0: setAmountS(amountS - 1);
                            break;
                        case 1: setAmountM(amountM - 1);
                            break;
                        case 2: setAmountL(amountL - 1);
                            break;
                    }

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

    return (<>
        <div className='drink-outter'>
            <div className='drink-title'>{props.name}</div>
            <div className='drink-price-outter'>
                <div className={getIndex(product_id, "S") != -1 && reserveList[getIndex(product_id, "S")].name.endsWith('S') ? 'drink-price food-selected-border' : 'drink-price'} >
                    <div className='price-text' onClick={() => doReserve(0)}> S:{"￥" + props.price}</div>
                    {(getIndex(product_id, "S") != -1 && reserveList[getIndex(product_id, "S")].name.endsWith('S')) ? <>
                        <div onClick={() => changeamount(false, 0)} className='drink-reserve-amount-button'>-</div>
                        <div className='drink-reserve-amount-text'>{amountS}</div>
                        <div onClick={() => changeamount(true, 0)} className='drink-reserve-amount-button'>+</div></> : <></>}
                </div>
                <div className={getIndex(product_id, "M") != -1 && reserveList[getIndex(product_id, "M")].name.endsWith('M') ? 'drink-price food-selected-border' : 'drink-price'} >
                    <div className='price-text' onClick={() => doReserve(1)}> M:{"￥" + props.priceM}</div>
                    {(getIndex(product_id, "M") != -1 && reserveList[getIndex(product_id, "M")].name.endsWith('M')) ? <>
                        <div onClick={() => changeamount(false, 1)} className='drink-reserve-amount-button'>-</div>
                        <div className='drink-reserve-amount-text'>{amountM}</div>
                        <div onClick={() => changeamount(true, 1)} className='drink-reserve-amount-button'>+</div></> : <></>}
                </div>
                <div className={getIndex(product_id, "L") != -1 && reserveList[getIndex(product_id, "L")].name.endsWith('L') ? 'drink-price food-selected-border' : 'drink-price'} >
                    <div className='price-text' onClick={() => doReserve(2)}> L:{"￥" + props.priceL}</div>
                    {(getIndex(product_id, "L") != -1 && reserveList[getIndex(product_id, "L")].name.endsWith('L')) ? <>
                        <div onClick={() => changeamount(false, 2)} className='drink-reserve-amount-button'>-</div>
                        <div className='drink-reserve-amount-text'>{amountL}</div>
                        <div onClick={() => changeamount(true, 2)} className='drink-reserve-amount-button'>+</div></> : <></>}
                </div>
            </div>
        </div>
    </>)
}
