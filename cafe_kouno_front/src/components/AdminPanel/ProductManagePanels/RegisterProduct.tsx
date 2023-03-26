import { useContext, useState } from "react"
import { json, } from "stream/consumers";
import { context } from "../../../App";
import "./Product.css"
export const RegisterDrink = () => {
    const stateContext = useContext(context);
    const [id, setId] = useState("loading");
    const [name, setName] = useState("loading");
    const [price, setPrice] = useState(99999);
    const [priceM, setPriceM] = useState(99999);
    const [priceL, setPriceL] = useState(99999);
    const [description, setDescription] = useState("loading");
    const [drink, setDrink] = useState(false);
    const [category, setCategory] = useState("loading");
    const doRegister = () => {
        fetch("https://" + stateContext.apiPath + "/register", {
            method: "post", credentials: "include", headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(
                {
                    productId: id,
                    productName: name,
                    category: category,
                    drink: drink,
                    price: price,
                    priceM: priceM,
                    priceL: priceL,
                    text: description
                }
            )
        }).then((raw) => { if (raw.ok) raw.text().then((text) => alert(text)) });
    }
    return (
        <div className="change-drink-outter">
            <p>id:</p>
            <input type="text" className="inline-block" onChange={(e) => setId(e.target.value ? e.target.value : "0")} />
            <p>name:</p>
            <input type="text" className="inline-block" onChange={(e) => setName(e.target.value ? e.target.value : "")} />
            <p> price(s,m,l):</p>
            <input type="number" className="inline-block" onChange={(e) => setPrice(e.target.value ? parseInt(e.target.value) : 0)} />
            <input type="number" className="inline-block" onChange={(e) => setPriceM(e.target.value ? parseInt(e.target.value) : 0)} />
            <input type="number" className="inline-block" onChange={(e) => setPriceL(e.target.value ? parseInt(e.target.value) : 0)} />
            <p>description</p>
            <textarea className="inline-block" onChange={(e) => setDescription(e.target.value ? e.target.value : "0")} name="description" id="" cols={30} rows={10}></textarea>
            <p>is drink?</p>
            <input type="checkbox" className="inline-block" onChange={(e) => { setDrink(e.target.value !== "true"); }} />
            <p>category</p>
            <input type="text" className="inline-block" onChange={(e) => setCategory(e.target.value ? e.target.value : "")} />
            <div className="register-drink-button" onClick={doRegister}>登録</div>
        </div>
    );
}