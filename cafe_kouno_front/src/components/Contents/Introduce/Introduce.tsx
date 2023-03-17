import { useContext } from "react";
import { context } from "../../../App";
import "./Introduce.css";
export const Introduce = () => {
    const { apiPath, subPath } = useContext(context);
    return (<>
        <div className="introduce-title">カフェ向野</div>
        <div className="introduce-outter">
            <img className="introduce-image" src={subPath + "/images/Image0008.jpg"} alt="Image0008.jpg" />
            <div className="introduce-text">
                <p>当店では、美味しいコーヒーへのご要望に</p>
                <p>お応えするべく、2012年に西新宿0-0-0</p>
                <p>に開業いたしました。カフェこうのでは、</p>
                <p>最高品質のコーヒー豆から抽出された味わい</p>
                <p>豊かなコーヒーをご提供しております。</p>
                <p>厳選されたコーヒー豆からじっくりと</p>
                <p>風味を引き出した味わいは、</p>
                <p> 最後の一滴まで心ゆくまでお楽しみいただけます。</p>
                <p>以下から当店へのアクセスやコーヒーに関する</p>
                <p>情報をご覧いただき、</p>
                <p> 当カフェにぜひお立ち寄りください。</p>
            </div>
        </div>
    </>);
}