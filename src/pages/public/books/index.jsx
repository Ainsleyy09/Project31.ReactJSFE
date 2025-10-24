import React, { useEffect, useState } from 'react'
import { getBooks } from '../../../_services/books';
import { Link } from 'react-router-dom';
import { bookImageStorage } from '../../../_api';

function Books() {
    const [book, setBooks] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const [bookData] = await Promise.all([getBooks()]);
            setBooks(bookData);
        };
        fetchData();
    }, []);

    return (
        <>
            <section className="bg-gray-50 py-10 antialiased dark:bg-gray-900">
                <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {book.length > 0 ? book.map((b) => (
                            <div 
                                key={b.id}
                                className="rounded-xl border border-gray-200 bg-white shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 dark:border-gray-700 dark:bg-gray-800"
                            >
                                {/* Gambar */}
                                <div className="h-56 w-full">
                                    <Link to={`/books/show/${b.id}`}>
                                        <img
                                            className="mx-auto h-full"
                                            src={b.cover_photo.startsWith("http") ? b.cover_photo : `${bookImageStorage}/${b.cover_photo}`}
                                            alt=""
                                        />
                                    </Link>
                                </div>

                                {/* Detail */}
                                <div className="pt-6 px-4 pb-5">
                                    <Link
                                        to={`/books/show/${b.id}`}
                                        className="text-lg font-semibold leading-tight text-gray-900 hover:text-indigo-800 transition-colors dark:text-white dark:hover:text-indigo-400"
                                    >
                                        {b.title}
                                    </Link>

                                    <ul className="mt-3 flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                                        <li className="flex items-center gap-2">
                                            <svg
                                                className="h-4 w-4 text-indigo-600 dark:text-indigo-400"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M13 7h6l2 4m-8-4v8m0-8V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v9h2m8 0H9m4 0h2m4 0h2v-4m0 0h-5m3.5 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm-10 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"
                                                />
                                            </svg>
                                            Fast Delivery
                                        </li>

                                        <li className="flex items-center gap-2">
                                            <svg
                                                className="h-4 w-4 text-indigo-600 dark:text-indigo-400"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M8 7V6c0-.6.4-1 1-1h11c.6 0 1 .4 1 1v7c0 .6-.4 1-1 1h-1M3 18v-7c0-.6.4-1 1-1h11c.6 0 1 .4 1 1v7c0 .6-.4 1-1 1H4a1 1 0 0 1-1-1Zm8-3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
                                                />
                                            </svg>
                                            Best Price
                                        </li>
                                    </ul>

                                    <div className="mt-5 flex items-center justify-between">
                                        <p className="text-lg font-semibold text-indigo-800 dark:text-indigo-400">
                                            Rp {b.price}
                                        </p>

                                        <Link
                                            to={`/books/show/${b.id}`}
                                            className="inline-flex items-center gap-1.5 rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 active:scale-95 transition-all duration-200"
                                        >
                                            View Detail
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="2"
                                                stroke="currentColor"
                                                className="w-3.5 h-3.5"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )) : (
                            <p className="text-center text-gray-500 dark:text-gray-400">Books not found!</p>
                        )}
                    </div>

                    {/* Tombol Show More */}
                    <div className="w-full text-center mt-10">
                        <button
                            type="button"
                            className="rounded-md border border-indigo-700 bg-white px-5 py-2 text-sm font-medium text-indigo-800 hover:bg-indigo-700 hover:text-white transition-all duration-300 shadow-sm hover:shadow-md dark:bg-gray-800 dark:border-indigo-500 dark:text-indigo-400 dark:hover:bg-indigo-500 dark:hover:text-white"
                        >
                            Show More
                        </button>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Books;
