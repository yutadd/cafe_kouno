import React, { createContext, useEffect, useState } from 'react';
import { Drink } from './components/Contents/Food/Drink';
import { Embed } from './components/Contents/Embed/Embed';
import { Food } from './components/Contents/Food/Food';
import { Introduce } from './components/Contents/Introduce/Introduce';
import { Top } from './components/Contents/Top/Top';
import { Header } from './components/Header/Header';
export type context_type = [
  mobile: boolean
]


export const context = createContext({ mobile: true });
function App() {
  const [mobile, setMobile] = useState(true);
  useEffect(() => {
    const handleResize = () => {
      setMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
  });
  return (
    <>
      <context.Provider value={{ mobile: mobile }}>
        <Header />
        <Top />
        <Introduce />
        <Food />
        <Embed />
        <Drink />
      </context.Provider>
    </>
  );
}

export default App;
