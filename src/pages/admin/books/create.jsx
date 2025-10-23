import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { getGenres } from "../../../_services/genres";
import { getAuthors } from "../../../_services/author";
import { createBook } from '../../../_services/books';

function CreateBooks() {
    const [genre, setGenres] = useState([]);
    const [author, setAuthors] = useState([]);

    const [formData, setFormData] = useState({
        title: "",
        price: "",
        stock: "",
        genre_id: "",
        author_id: "",
        cover_photo: null,
        description: "",
    });

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const [genreData, authorData] = await Promise.all([
                getGenres(),
                getAuthors(),
            ])

            setGenres(genreData)
            setAuthors(authorData)
        }
        fetchData()
    }, [])

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === "cover_photo") {
            setFormData({
                ...formData,
                cover_photo: files[0],
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const payload = new FormData();
            for (const key in formData) {
                payload.append(key, formData[key]);
            }

            await createBook(payload);
            alert("Book created successfully!");
            navigate("/admin/books");
        } catch (error) {
            console.error(error);
            alert("Error creating book!");
        }
    }



    return (
        <section className="bg-white dark:bg-gray-900 min-h-screen">
            <div className="max-w-4xl px-6 py-10 mx-auto lg:py-16">
                <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
                    Create New Book
                </h2>

                <form onSubmit={handleSubmit}>
                    <div className="grid gap-6 mb-6 sm:grid-cols-2">
                        <div className="sm:col-span-2">
                            <label
                                htmlFor="title"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Title
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Book Title"
                                className="w-full p-2.5 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:ring-indigo-600 focus:border-indigo-600 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                required
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="price"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Price
                            </label>
                            <input
                                type="number"
                                id="price"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                placeholder="e.g. 150000"
                                className="w-full p-2.5 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:ring-indigo-600 focus:border-indigo-600 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="stock"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Stock
                            </label>
                            <input
                                type="number"
                                id="stock"
                                name="stock"
                                value={formData.stock}
                                onChange={handleChange}
                                placeholder="e.g. 200"
                                className="w-full p-2.5 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:ring-indigo-600 focus:border-indigo-600 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                required
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="genre_id"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Genre
                            </label>
                            <select
                                id="genre_id"
                                name="genre_id"
                                value={formData.genre_id}
                                onChange={handleChange}
                                className="w-full p-2.5 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            >
                                <option value="">--select genre--</option>
                                {genre?.map((g) => (
                                    <option key={g.id} value={g.id}>{g.name}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label
                                htmlFor="author_id"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Author
                            </label>
                            <select
                                id="author_id"
                                name="author_id"
                                value={formData.author_id}
                                onChange={handleChange}
                                className="w-full p-2.5 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            >
                                <option value="">--select author--</option>
                                {author?.map((a) => (
                                    <option key={a.id} value={a.id}>{a.name}</option>
                                ))}
                            </select>
                        </div>


                        <div className="mb-4">
                            <label
                                htmlFor="cover_photo"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Cover Photo
                            </label>
                            <input
                                type="file"
                                id="cover_photo"
                                name="cover_photo"
                                onChange={handleChange}
                                accept="image/*"
                                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:ring-indigo-600 focus:border-indigo-600 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                required
                            />
                        </div>

                        <div className="sm:col-span-2">
                            <label
                                htmlFor="description"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Description
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows="6"
                                className="w-full p-2.5 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                placeholder="Write the description of the book..."
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            type="submit"
                            className="px-5 py-2.5 text-sm font-medium text-white bg-indigo-700 rounded-lg hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300"
                        >
                            Create Book
                        </button>
                        <button
                            type="reset"
                            className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-red-600 border border-red-600 rounded-lg hover:text-white hover:bg-red-600 focus:ring-4 focus:ring-red-300"
                        >
                            Reset
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
}

export default CreateBooks;
