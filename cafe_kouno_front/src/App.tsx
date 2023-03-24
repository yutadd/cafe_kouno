import React, { createContext, } from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Activation } from './components/Activation';
import { Admin } from './components/Admin';
import { Cancel } from './components/Cancel';
import { Home } from './components/Home';

export type context_type = {
  apiPath: string,
  subPath: string,
}

const initialValue: context_type = { apiPath: "localhost:8080", subPath: "" };
export const context = createContext<context_type>(initialValue);
function App() {

  return (
    <>
      <context.Provider value={initialValue}>
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/admin' component={Admin} />
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
