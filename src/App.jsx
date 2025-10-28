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
import EditBooks from "./pages/admin/books/edit";
import ShowBooks from "./pages/public/books/show";
import EditAuthors from "./pages/admin/authors/edit";
import EditGenres from "./pages/admin/genres/edit";
import Blogs from "./pages/public/blog";
import Services from "./pages/public/service";
import TransactionHistory from "./pages/public/history";
import AdminTransactions from "./pages/admin/transactions";
import AdminUsers from "./pages/admin/users";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<PublicLayout />}>
                    <Route index element={<Home />} />

                    <Route path="books">
                        <Route index element={<Books />} />
                        <Route path="show/:id" element={<ShowBooks />} />
                    </Route>

                    <Route path="blogs" element={<Blogs />} />
                    <Route path="services" element={<Services />} />
                    <Route path="transactions" element={<TransactionHistory />} />
                </Route>

                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />

                <Route path="admin" element={<AdminLayout />}>
                    <Route index element={<Dashboard />} />

                    <Route path="books">
                        <Route index element={<AdminBooks />} />
                        <Route path="create" element={<CreateBooks />} />
                        <Route path="edit/:id" element={<EditBooks />} />
                    </Route>

                    <Route path="authors">
                        <Route index element={<AdminAuthors />} />
                        <Route path="create" element={<CreateAuthors />} />
                        <Route path="edit/:id" element={<EditAuthors />} />
                    </Route>

                    <Route path="genres">
                        <Route index element={<AdminGenres />} />
                        <Route path="create" element={<CreateGenres />} />
                        <Route path="edit/:id" element={<EditGenres />} />
                    </Route>

                    <Route path="transactions">
                        <Route index element={<AdminTransactions />} />
                    </Route>

                    <Route path="users">
                        <Route index element={<AdminUsers />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter >
    );
}

export default App;
