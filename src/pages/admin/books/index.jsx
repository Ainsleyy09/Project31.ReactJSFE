import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { deleteBook, getBooks } from '../../../_services/books';
import { getGenres } from '../../../_services/genres';
import { getAuthors } from '../../../_services/author';
import { bookImageStorage } from '../../../_api';

export default function AdminBooks() {
    const [book, setBooks] = useState([]);
    const [genre, setGenres] = useState([]);
    const [author, setAuthors] = useState([]);
    const [openDropdownId, setOpenDropdownId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const [bookData, genreData, authorData] = await Promise.all([
                getBooks(),
                getGenres(),
                getAuthors(),
            ]);
            setBooks(bookData);
            setGenres(genreData);
            setAuthors(authorData);
        }
        fetchData();
    }, []);

    const getGenreName = (id) => {
        const g = genre.find((g) => g.id === id);
        return g ? g.name : "Unknown Genre";
    };

    const getAuthorName = (id) => {
        const a = author.find((a) => a.id === id);
        return a ? a.name : "Unknown Author";
    };

    const toggleDropdown = (id) => {
        setOpenDropdownId(openDropdownId === id ? null : id);
    };

    const handleAddProduct = () => {
        navigate("/admin/books/create");
    };

    const handleEdit = (id) => {
        navigate("/admin/books/edit/" + id);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this book?")) {
            await deleteBook(id);
            setBooks(book.filter((b) => b.id !== id));
        }
    };

    return (
        <section className="p-4 sm:p-6">
            <div className="shadow-md rounded-lg bg-white">

                {/* HEADER */}
                <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                    <div className="w-full md:w-1/2">
                        <form className="flex items-center">
                            <label htmlFor="simple-search" className="sr-only">Search</label>
                            <div className="relative w-full">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <svg className="w-5 h-5 text-blue-700" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    id="simple-search"
                                    className="border border-blue-700 text-gray-900 text-sm rounded-lg focus:ring-blue-700 focus:border-blue-700 block w-full pl-10 p-2"
                                    placeholder="Search"
                                />
                            </div>
                        </form>
                    </div>

                    <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                        <button
                            type="button"
                            onClick={handleAddProduct}
                            className="flex items-center justify-center text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2"
                        >
                            Add New Book
                        </button>
                    </div>
                </div>

                {/* TABLE */}
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-700">
                        <thead className="text-xs text-white bg-blue-700">
                            <tr>
                                <th className="px-4 py-3">Title</th>
                                <th className="px-4 py-3">Price</th>
                                <th className="px-4 py-3">Stock</th>
                                <th className="px-4 py-3">Cover</th>
                                <th className="px-4 py-3">Genre</th>
                                <th className="px-4 py-3">Author</th>
                                <th className="px-4 py-3"><span className="sr-only">Actions</span></th>
                            </tr>
                        </thead>
                        <tbody>
                            {book?.length > 0 ? book.map((b) => (
                                <tr key={b.id} className="border-b hover:bg-blue-50 transition-colors">
                                    <td className="px-4 py-3 font-medium text-gray-900">{b.title}</td>
                                    <td className="px-4 py-3 font-medium text-gray-900">Rp {b.price}</td>
                                    <td className="px-4 py-3 font-medium text-gray-900">{b.stock}</td>
                                    <td className="px-4 py-3 font-medium text-gray-900">
                                        {b.cover_photo ? (
                                            <img
                                                src={b.cover_photo.startsWith("http") ? b.cover_photo : `${bookImageStorage}/${b.cover_photo}`}
                                                alt={b.title}
                                                className="w-12 h-12 object-cover rounded"
                                            />
                                        ) : (
                                            <span className="text-gray-400">No photo</span>
                                        )}
                                    </td>
                                    <td className="px-4 py-3 font-medium text-gray-900">{getGenreName(b.genre_id)}</td>
                                    <td className="px-4 py-3 font-medium text-gray-900">{getAuthorName(b.author_id)}</td>
                                    <td className="px-4 py-3 font-medium text-gray-900 flex items-center justify-end relative !overflow-visible">
                                        <button onClick={() => toggleDropdown(b.id)} className="inline-flex items-center p-1 text-sm font-medium text-gray-500 hover:text-blue-700 rounded-lg">
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                                            </svg>
                                        </button>

                                        {openDropdownId === b.id && (
                                            <div className="absolute right-0 mt-2 z-10 w-44 bg-white rounded shadow divide-y divide-gray-200">
                                                <ul className="py-1 text-sm text-gray-700">
                                                    <li>
                                                        <button
                                                            className="block w-full text-left py-2 px-4 hover:bg-blue-100"
                                                            onClick={() => handleEdit(b.id)}
                                                        >
                                                            Edit
                                                        </button>
                                                    </li>
                                                </ul>
                                                <div className="py-1">
                                                    <button
                                                        onClick={() => handleDelete(b.id)}
                                                        className="block w-full text-left py-2 px-4 text-sm text-gray-700 hover:bg-blue-100"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            )) : (
                                <tr><td colSpan={7} className="text-center p-4">Data not found!</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}
