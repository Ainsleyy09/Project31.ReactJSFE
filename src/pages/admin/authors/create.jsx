import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createAuthor } from "../../../_services/author";

function CreateAuthors() {
    const [formData, setFormData] = useState({
        name: "",
        bio: "",
        photo: null,
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "photo") {
            setFormData({
                ...formData,
                photo: files[0],
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

            await createAuthor(payload);
            alert("Author successfully created!");
            navigate("/admin/authors");
        } catch (error) {
            console.error("Error creating author:", error);
            alert("Failed to create author!");
        }
    };

    return (
        <section className="bg-white dark:bg-gray-900 min-h-screen">
            <div className="max-w-3xl px-6 py-10 mx-auto lg:py-16">
                <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
                    Create New Author
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name */}
                    <div>
                        <label
                            htmlFor="name"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Author Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter author name"
                            required
                            className="w-full p-2.5 text-sm border border-gray-300 rounded-lg bg-gray-50 
                            focus:ring-indigo-600 focus:border-indigo-600 dark:bg-gray-700 
                            dark:border-gray-600 dark:text-white"
                        />
                    </div>

                    {/* Bio */}
                    <div>
                        <label
                            htmlFor="bio"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Bio
                        </label>
                        <textarea
                            id="bio"
                            name="bio"
                            value={formData.bio}
                            onChange={handleChange}
                            rows="5"
                            placeholder="Enter author's biography (optional)"
                            className="w-full p-2.5 text-sm border border-gray-300 rounded-lg bg-gray-50 
                            focus:ring-indigo-600 focus:border-indigo-600 dark:bg-gray-700 
                            dark:border-gray-600 dark:text-white"
                        ></textarea>
                    </div>

                    {/* Photo */}
                    <div>
                        <label
                            htmlFor="photo"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Photo
                        </label>
                        <input
                            type="file"
                            id="photo"
                            name="photo"
                            accept="image/*"
                            onChange={handleChange}
                            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:ring-indigo-600 focus:border-indigo-600 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            required
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex items-center gap-4">
                        <button
                            type="submit"
                            className="px-5 py-2.5 text-sm font-medium text-white bg-indigo-700 
                            rounded-lg hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300"
                        >
                            Save Author
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate("/admin/authors")}
                            className="px-5 py-2.5 text-sm font-medium text-red-600 border border-red-600 
                            rounded-lg hover:text-white hover:bg-red-600 focus:ring-4 focus:ring-red-300"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
}

export default CreateAuthors;
