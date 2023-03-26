import { useContext, useEffect, useState } from "react"
import { context } from "../../../App";
import "./Product.css"
export const DeleteProduct = () => {
    const stateContext = useContext(context);
    const [id, setId] = useState("");
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
    const doDelete = () => {
        fetch("https://" + stateContext.apiPath + "/delete?id=" + id, {
            method: "DELETE", credentials: "include", headers: { 'Content-Type': 'application/json' }
        }).then((raw) => { if (raw.ok) raw.text().then((text) => alert(text)) });
    }
    const load = (id: string) => {
        fetch("http://" + stateContext.apiPath + "/product/" + id).then((raw) => {
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
                console.log("loaded");
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
                    {name}
                    <p> price(s,m,l):</p>
                    {price},{priceM},{priceM}
                    <p>description</p>
                    {description}
                    <p>is drink?</p>
                    {drink ? "yes" : "no"}
                    <p>category</p>
                    {category}
                    <div className="register-drink-button" onClick={doDelete}>削除</div>
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