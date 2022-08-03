/** @format */
import React from "react";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router";

import User from "./components/User";
import NotFound from "./components/NotFound";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <BrowserRouter>
        <StrictMode>

            <Routes>
                <Route path="/" element={<User />} />
                <Route path="*" element={<NotFound />} />
            </Routes>

        </StrictMode>
    </BrowserRouter>
);