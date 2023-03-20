import { Embed } from './Contents/Embed/Embed';
import { Food } from './Contents/Food/Food';
import { Introduce } from './Contents/Introduce/Introduce';
import { Top } from './Contents/Top/Top';
import { Header } from './Header/Header';
export const Home = () => {
    return (<><Header />
        <Top />
        <Introduce />
        <Food />
        <Embed /></>);
}