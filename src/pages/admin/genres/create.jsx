import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createGenre } from '../../../_services/genres';

function CreateGenres() {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await createGenre(formData);
            alert('Genre successfully created!');
            navigate('/admin/genres');
        } catch (error) {
            console.error('Error creating genre:', error);
            alert('Failed to create genre!');
        }
    };

    return (
        <section className="bg-white dark:bg-gray-900 min-h-screen">
            <div className="max-w-3xl px-6 py-10 mx-auto lg:py-16">
                <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
                    Create New Genre
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label
                            htmlFor="name"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Genre Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter genre name"
                            required
                            className="w-full p-2.5 text-sm border border-gray-300 rounded-lg bg-gray-50 
                            focus:ring-indigo-600 focus:border-indigo-600 dark:bg-gray-700 
                            dark:border-gray-600 dark:text-white"
                        />
                    </div>

                    <div>
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
                            rows="5"
                            placeholder="Enter description (optional)"
                            className="w-full p-2.5 text-sm border border-gray-300 rounded-lg bg-gray-50 
                            focus:ring-indigo-600 focus:border-indigo-600 dark:bg-gray-700 
                            dark:border-gray-600 dark:text-white"
                        ></textarea>
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            type="submit"
                            className="px-5 py-2.5 text-sm font-medium text-white bg-indigo-700 
                            rounded-lg hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300"
                        >
                            Save Genre
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate('/admin/genres')}
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

export default CreateGenres;
