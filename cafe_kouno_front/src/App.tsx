import React, { createContext, useEffect, useState } from 'react';
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
      </context.Provider>
    </>
  );
}

export default App;
