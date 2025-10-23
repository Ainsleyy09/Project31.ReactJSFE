import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { getGenres } from '../../../_services/genres';

function AdminGenres() {
    const [genres, setGenres] = useState([]);
    const [openDropdownId, setOpenDropdownId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const genreData = await getGenres();
                // pastikan sesuai struktur response API
                setGenres(genreData?.data || genreData);
            } catch (error) {
                console.error("Error fetching genres:", error);
            }
        };
        fetchData();
    }, []);

    const toggleDropdown = (id) => {
        setOpenDropdownId(openDropdownId === id ? null : id);
    };

    const handleAddGenre = () => {
        navigate("/admin/genres/create");
    };

    return (
        <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
            <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                    <div className="w-full md:w-1/2">
                        <form className="flex items-center">
                            <label htmlFor="simple-search" className="sr-only">Search</label>
                            <div className="relative w-full">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <svg
                                        aria-hidden="true"
                                        className="w-5 h-5 text-gray-500 dark:text-gray-400"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    id="simple-search"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                                    placeholder="Search"
                                />
                            </div>
                        </form>
                    </div>
                    <div className="w-full md:w-auto flex items-center justify-end">
                        <button
                            type="button"
                            onClick={handleAddGenre}
                            className="flex items-center justify-center text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-4 py-2"
                        >
                            <svg
                                className="h-3.5 w-3.5 mr-2"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                                aria-hidden="true"
                            >
                                <path
                                    clipRule="evenodd"
                                    fillRule="evenodd"
                                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                />
                            </svg>
                            Add New Genre
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-4 py-3">Name</th>
                                <th scope="col" className="px-4 py-3">Description</th>
                                <th scope="col" className="px-4 py-3"><span className="sr-only">Actions</span></th>
                            </tr>
                        </thead>
                        <tbody>
                            {genres?.length > 0 ? (
                                genres.map((g) => (
                                    <tr key={g.id} className="border-b dark:border-gray-700">
                                        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {g.name}
                                        </td>
                                        <td className="px-4 py-3">{g.description}</td>
                                        <td className="px-4 py-3 flex items-center justify-end relative">
                                            <button
                                                id={`dropdown-button-${g.id}`}
                                                onClick={() => toggleDropdown(g.id)}
                                                className="inline-flex items-center p-0.5 text-sm font-medium text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none"
                                                type="button"
                                            >
                                                <svg
                                                    className="w-5 h-5"
                                                    aria-hidden="true"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM18 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                                </svg>
                                            </button>

                                            {openDropdownId === g.id && (
                                                <div
                                                    className="absolute right-0 mt-2 z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                                                >
                                                    <ul className="py-1 text-sm text-gray-700 dark:text-gray-200">
                                                        <li>
                                                            <a
                                                                href="#"
                                                                className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                            >
                                                                Edit
                                                            </a>
                                                        </li>
                                                    </ul>
                                                    <div className="py-1">
                                                        <a
                                                            href="#"
                                                            className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                                        >
                                                            Delete
                                                        </a>
                                                    </div>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={3} className="text-center p-4">Data not found!</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    )
}

export default AdminGenres;
