import { useContext, useState } from "react";
import { context } from "../../App";
import "./Header.css"
export const Header = (props: any) => {
    const mobile = useContext(context);
    const { apiPath, subPath } = useContext(context);
    const [showMenu, setShowMenu] = useState(false);
    const Menu = () => {
        return (<>
            <a className="menu-item" href="/#top">カフェ向野</a>
            <a className="menu-item" href="/#reserve">webご予約</a>
            <a className="menu-item" href="/#instagram">Instagram</a>
            <a className="menu-item" href="/#access">ACCESS</a>
        </>)
    }
    return (<>
        <header className={showMenu ? "header-outter background-perl" : "header-outter"} onMouseLeave={() => setShowMenu(false)}>
            <div className="header-container">
                <img src={subPath + "/images/logo.png"} alt="logo.png" className="header-logo" />
                <div className={showMenu ? "header-menu header-menu-opened" : "header-menu"} onClick={() => setShowMenu(!showMenu)} >{showMenu ? "X" : ""}</div>
            </div>
            {showMenu ? <Menu /> : <></>}
        </header>

    </>);

}

