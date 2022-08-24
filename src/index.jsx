/** @format */

import React from "react";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router";

import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import User from "./layouts/User";
import NotFound from "./pages/NotFound";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <BrowserRouter>
        <StrictMode>
            <Container>
                <Routes>
                    <Route path="/" element={<User />} />
                    <Route path="/user" element={<User />} />
                    <Route path="/user/:username" element={<User />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Container>
        </StrictMode>
    </BrowserRouter>
);