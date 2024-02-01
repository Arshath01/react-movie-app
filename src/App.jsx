import React from "react";
import Home from "./page/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Show from "./page/Show";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shows/:q" element={<Show />} />
      </Routes>
    </BrowserRouter>
  );
}
