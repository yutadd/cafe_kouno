import React, { createContext, useEffect, useState } from 'react';
import { Embed } from './components/Contents/Embed/Embed';
import { Food } from './components/Contents/Food/Food';
import { Introduce } from './components/Contents/Introduce/Introduce';
import { Top } from './components/Contents/Top/Top';
import { Header } from './components/Header/Header';
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
        <Header />
        <Top />
        <Introduce />
        <Food />
        <Embed />
      </context.Provider>
    </>
  );
}

export default App;
