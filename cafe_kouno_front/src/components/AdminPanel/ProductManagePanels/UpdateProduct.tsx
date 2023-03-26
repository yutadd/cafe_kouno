import { useContext, useEffect, useState } from "react"
import { context } from "../../../App";
import "./Product.css"
export const UpdateDrink = () => {
    const stateContext = useContext(context);
    const [id, setId] = useState("0");
    const [name, setName] = useState("loading");
    const [price, setPrice] = useState(99999);
    const [priceM, setPriceM] = useState(99999);
    const [priceL, setPriceL] = useState(99999);
    const [description, setDescription] = useState("loading");
    const [drink, setDrink] = useState(false);
    const [category, setCategory] = useState("loading");
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        setLoaded(false);
        if (id !== "") load(id);
    }, [id]);
    const doUpdate = () => {
        fetch("https://" + stateContext.apiPath + "/update", {
            method: "PATCH", credentials: "include", headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(
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
    const load = (id: string) => {
        fetch("https://" + stateContext.apiPath + "/product/" + id).then((raw) => {
            if (raw.ok) raw.json().then((json) => {
                setName(json["productName"]);
                setPrice(json["price"]);
                setPriceM(json["priceM"]);
                setPriceL(json["priceL"]);
                setDescription(json["text"]);
                setDrink(json["drink"]);
                console.log(json["drink"])
                setCategory(json["category"]);
                setLoaded(true);
                console.log("loaded")
            })
        })
    }
    return (
        <div className="change-drink-outter">
            {loaded ?
                <>
                    <p>id:</p>
                    <input type="text" value={id} className="inline-block" onChange={(e) => setId(e.target.value ? e.target.value : "")} />
                    <p>name:</p>
                    <input type="text" value={name} className="inline-block" onChange={(e) => setName(e.target.value ? e.target.value : "")} />
                    <p> price(s,m,l):</p>
                    <input type="number" value={price} className="inline-block" onChange={(e) => setPrice(e.target.value ? parseInt(e.target.value) : 0)} />
                    <input type="number" value={priceM} className="inline-block" onChange={(e) => setPriceM(e.target.value ? parseInt(e.target.value) : 0)} />
                    <input type="number" value={priceL} className="inline-block" onChange={(e) => setPriceL(e.target.value ? parseInt(e.target.value) : 0)} />
                    <p>description</p>
                    <textarea className="inline-block" value={description} onChange={(e) => setDescription(e.target.value ? e.target.value : "")} name="description" id="" cols={30} rows={10}></textarea>
                    <p>is drink?</p>
                    <input type="checkbox" checked={drink} className="inline-block" onChange={(e) => { setDrink(e.target.value !== "true"); }} />
                    <p>category</p>
                    <input type="text" value={category} className="inline-block" onChange={(e) => setCategory(e.target.value ? e.target.value : "")} />
                    <div className="register-drink-button" onClick={doUpdate}>更新</div>
                </>
                :
                <>
                    <p>id:</p>
                    <input type="text" value={id} className="inline-block" onChange={(e) => setId(e.target.value ? e.target.value : "")} />
                    <div className="update-drink-loading">Now Loading</div>
                </>
            }
        </div>
    );
}