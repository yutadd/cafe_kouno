import { useContext, useState } from "react";
import { context } from "../../App";
import { Top } from "../Contents/Top/Top";
import "./Header.css"
export const Header = () => {
    const mobile = useContext(context);
    const [showMenu, setShowMenu] = useState(false);
    const Menu = () => {
        return (<>
            <a className="menu-item" href="#dummy">カフェ向野</a>
            <a className="menu-item" href="#dummy">FOOD</a>
            <a className="menu-item" href="#dummy">DRINK</a>
            <a className="menu-item" href="#dummy">ACCESS</a>
        </>)
    }
    return (<>
        <header className={showMenu ? "header-outter background-perl" : "header-outter"} onMouseLeave={() => setShowMenu(false)}>
            <div className="header-container">
                <img src="/images/logo.png" alt="logo.png" className="header-logo" />
                <div className={showMenu ? "header-menu header-menu-opened" : "header-menu"} onClick={() => setShowMenu(!showMenu)} >{showMenu ? "X" : ""}</div>

            </div>
            {showMenu ? <Menu /> : <></>}
        </header>
        <Top />
    </>);

}

