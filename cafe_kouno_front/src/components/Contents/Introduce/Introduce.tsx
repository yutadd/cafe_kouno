import { useContext } from "react";
import { context } from "../../../App";
import "./Introduce.css";
export const Introduce = () => {
    const { apiPath, subPath } = useContext(context);
    return (<>
        <div className="introduce-title">カフェ向野</div>
        <div className="introduce-outter">
            <div className="introduce-image-outter">
                <img className="introduce-image" src={subPath + "/images/Image0008.webp"} alt="Image0008.webp" />
            </div>
            <div className="introduce-text">
                <p> 当店では、美味しいコーヒーと安らぎの空間の</p>
                <p>ご要望にお応えするべく、2023年に福岡の</p>
                <p>天神にて開業いたしました。</p>
                <p>最高品質の豆から抽出された味わい</p>
                <p>豊かなコーヒーをご提供しております。</p>
                <p>モダンな家具と緑に囲まれた非日常的な</p>
                <p>空間で、お食事をお楽しみください。</p>
            </div>
        </div>
    </>);
}