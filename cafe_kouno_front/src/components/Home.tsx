import { Embed } from './Contents/Embed/Embed';
import { Food } from './Contents/Food/Food';
import { Introduce } from './Contents/Introduce/Introduce';
import { Top } from './Contents/Top/Top';
import { Header } from './Header/Header';
import "./Home.css";
export const Home = () => {
    return (
        <>
            <Header showGoshop={true} />
            <Top />
            <div className='home-contents-outter'>
                <div className='home-contents-inner'>
                    <Introduce />
                    <Food />
                    <Embed />
                </div>
            </div>
        </>
    );
}