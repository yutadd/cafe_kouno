import { useContext, useState } from "react";
import { context } from "../../App";
import { Top } from "../Contents/Top/Top";
import "./Header.css"
export const Header = () => {
    const mobile = useContext(context);
    const [showMenu, setShowMenu] = useState(false);
    return (<>
        <header className="header-outter" onMouseLeave={() => setShowMenu(false)}>
            <div className="header-container">
                <div className="header-title">
                    KOUNO
                </div>
                <div className="header-menu" onClick={() => setShowMenu(!showMenu)} />
            </div>
            {showMenu ? <Menu /> : <></>}
        </header>
        <Top />
    </>);
}
const Menu = () => {
    return (<>
        <hr />
        <a className="menu-item" href="#dummy">カフェ向野</a>
        <a className="menu-item" href="#dummy">FOOD</a>
        <a className="menu-item" href="#dummy">DRINK</a>
        <a className="menu-item" href="#dummy">ACCESS</a>
    </>)
}