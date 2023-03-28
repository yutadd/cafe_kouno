import { useContext, useEffect, useState } from "react";
import { context } from "../../../App";
import "./Top.css";
export const Top = () => {
    const { apiPath, subPath } = useContext(context);
    return (<div id="top" className="top-container">
        <div className="top-image-slides">
            <img src={subPath + "/images/slide-0.webp"} className="top-image" alt="" />
            <img src={subPath + "/images/slide-1.webp"} className="top-image" alt="" />
            <img src={subPath + "/images/slide-2.webp"} className="top-image" alt="" />
            <img src={subPath + "/images/slide-3.webp"} className="top-image" alt="" />
        </div>
        <div className="top-image-hover-logo">
            <div className="top-image-hover-logo-text-small">cafe</div>
            <div className="top-image-hover-logo-text-big">KOUNO</div>
        </div>
    </div>);
}