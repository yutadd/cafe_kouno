import React, { createContext, useEffect, } from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Activation } from './components/Activation';
import { ProductManager } from './components/ProductManager';
import { Cancel } from './components/Cancel';
import { Home } from './components/Home';

import { OrderManager } from './components/OrderManager';

export type context_type = {
  apiPath: string,
  subPath: string,
}

const initialValue: context_type = { apiPath: "yutadd.com:8080", subPath: "" };
export const context = createContext<context_type>(initialValue);
function App() {
  useEffect(() => {
    setTimeout(() => {
      const targetEl = document.getElementById(window.location.hash.split('#')[1]);
      console.log(window.location.hash.split('#')[1]);
      console.log("scrolling to " + targetEl);
      targetEl?.scrollIntoView({ behavior: 'smooth' });
    }, 500);
  }, []);
  return (
    <>
      <context.Provider value={initialValue}>
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/admin/products' component={ProductManager} />
            <Route exact path='/admin/orders' component={OrderManager} />
            <Route exact path='/cancel/:id' component={Cancel} />
            <Route exact path='/activation/:id' component={Activation} />
            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>
      </context.Provider>
    </>
  );
}
export function NotFound() {
  return (

    <div>
      <h1>404 Not Found</h1>
      <p>The page you are looking for does not exist.</p>
    </div>

  );
}
export default App;
