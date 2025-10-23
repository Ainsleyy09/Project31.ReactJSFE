import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PublicLayout from "./layout/public";
import Home from "./pages/public/index";
import Books from "./pages/public/books";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import AdminLayout from "./layout/admin";
import Dashboard from "./pages/admin";
import AdminBooks from "./pages/admin/books";
import CreateBooks from "./pages/admin/books/create";
import AdminAuthors from "./pages/admin/authors";
import CreateAuthors from "./pages/admin/authors/create";
import AdminGenres from "./pages/admin/genres";
import CreateGenres from "./pages/admin/genres/create";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<PublicLayout />}>
                    <Route index element={<Home />} />
                    <Route path="books" element={<Books />} />
                </Route>

                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />

                <Route path="admin" element={<AdminLayout />}>
                    <Route index element={<Dashboard />} />

                    <Route path="books">
                        <Route index element={<AdminBooks />} />
                        <Route path="create" element={<CreateBooks />} />
                    </Route>

                    <Route path="authors">
                        <Route index element={<AdminAuthors />} />
                        <Route path="create" element={<CreateAuthors/>} />
                    </Route>

                    <Route path="genres">
                        <Route index element={<AdminGenres />} />
                        <Route path="create" element={<CreateGenres/>} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter >
    );
}

export default App;
