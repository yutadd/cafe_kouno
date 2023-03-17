import { useContext } from "react";
import { context } from "../../../App";
import "./Top.css";
export const Top = () => {
    const { apiPath, subPath } = useContext(context);
    return (<div className="top-container">
        <img src={subPath + "/images/10.jpg"} className="top-image" alt="" />
        <div className="top-image-hover-logo">
            <div className="top-image-hover-logo-text-small">cafe</div>
            <div className="top-image-hover-logo-text-big">KOUNO</div>
        </div>
    </div>);
}