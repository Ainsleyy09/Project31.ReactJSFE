import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { deleteGenre, getGenres } from '../../../_services/genres';

function AdminGenres() {
    const [genres, setGenres] = useState([]);
    const [openDropdownId, setOpenDropdownId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const genreData = await getGenres();
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

    const handleEdit = (id) => {
        navigate("/admin/genres/edit/" + id);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this genre?")) {
            await deleteGenre(id);
            setGenres(genres.filter((g) => g.id !== id));
        }
    };

    return (
        <section className="p-4 sm:p-6">
            <div className="shadow-md rounded-lg bg-white">

                {/* Header */}
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

                    <div className="w-full md:w-auto flex items-center justify-end">
                        <button
                            type="button"
                            onClick={handleAddGenre}
                            className="flex items-center justify-center text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2"
                        >
                            Add New Genre
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-700">
                        <thead className="text-white bg-blue-700">
                            <tr>
                                <th className="px-4 py-3">Name</th>
                                <th className="px-4 py-3">Description</th>
                                <th className="px-4 py-3"><span className="sr-only">Actions</span></th>
                            </tr>
                        </thead>
                        <tbody>
                            {genres.length > 0 ? (
                                genres.map((g) => (
                                    <tr key={g.id} className="border-b hover:bg-blue-50 transition-colors">
                                        <td className="px-4 py-3 font-medium text-gray-900">{g.name}</td>
                                        <td className="px-4 py-3 font-medium text-gray-900">{g.description}</td>
                                        <td className="px-4 py-3 font-medium text-gray-900 flex items-center justify-end relative">
                                            <button
                                                onClick={() => toggleDropdown(g.id)}
                                                className="inline-flex items-center p-1 text-sm text-gray-500 hover:text-blue-700 rounded-lg"
                                            >
                                                ...
                                            </button>

                                            {openDropdownId === g.id && (
                                                <div className="absolute right-0 mt-2 z-10 w-44 bg-white rounded shadow divide-y divide-gray-200">
                                                    <ul className="py-1 text-sm text-gray-700">
                                                        <li>
                                                            <button
                                                                onClick={() => handleEdit(g.id)}
                                                                className="block py-2 px-4 hover:bg-blue-100"
                                                            >
                                                                Edit
                                                            </button>
                                                        </li>
                                                    </ul>
                                                    <div className="py-1">
                                                        <button
                                                            onClick={() => handleDelete(g.id)}
                                                            className="block py-2 px-4 hover:bg-blue-100"
                                                        >
                                                            Delete
                                                        </button>
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
