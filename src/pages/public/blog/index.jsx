import React from 'react';

function Blogs() {
    return (
        <section className="bg-gray-50 py-12 antialiased dark:bg-gray-900">
            <div className="mx-auto max-w-screen-xl px-6 2xl:px-0">
                <h2 className="text-4xl font-bold text-indigo-900 dark:text-white mb-8 text-center">
                    Discover GoBook
                </h2>

                <p className="text-indigo-800 dark:text-indigo-200 text-lg text-center mb-12">
                    GoBook is your digital hub for books, reviews, and recommendations. Founded in 2023, it brings book lovers together and makes reading more exciting!
                </p>

                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {/* Card 1 */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                        <div className="flex justify-center items-center h-64 overflow-hidden rounded-t-xl">
                            <img
                                className="h-full w-auto object-cover"
                                src="https://m.media-amazon.com/images/I/61dYziUodfL._UF1000,1000_QL80_.jpg"
                                alt="Book 1"
                            />
                        </div>
                        <div className="p-5">
                            <h3 className="text-xl font-semibold text-indigo-900 dark:text-white mb-2 hover:text-indigo-600 transition-colors">
                                Small Steps, Big Changes
                            </h3>
                            <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm">
                                Learn how small daily actions can create big life changes.
                            </p>
                            <button className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-all">
                                Read More
                            </button>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                        <div className="flex justify-center items-center h-64 overflow-hidden rounded-t-xl">
                            <img
                                className="h-full w-auto object-cover"
                                src="https://m.media-amazon.com/images/I/81u6nYTiQwL._UF1000,1000_QL80_.jpg"
                                alt="Book 2"
                            />
                        </div>
                        <div className="p-5">
                            <h3 className="text-xl font-semibold text-indigo-900 dark:text-white mb-2 hover:text-indigo-600 transition-colors">
                                Adventures in the Magical World
                            </h3>
                            <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm">
                                Enter a fantasy world full of magic, fun characters, and exciting adventures.
                            </p>
                            <button className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-all">
                                Read More
                            </button>
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                        <div className="flex justify-center items-center h-64 overflow-hidden rounded-t-xl">
                            <img
                                className="h-full w-auto object-cover"
                                src="https://images.essentialresources.co.nz/products/science-in-the-real-world---book-1_5901_l.png"
                                alt="Book 3"
                            />
                        </div>
                        <div className="p-5">
                            <h3 className="text-xl font-semibold text-indigo-900 dark:text-white mb-2 hover:text-indigo-600 transition-colors">
                                The World of Science for Everyone
                            </h3>
                            <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm">
                                Perfect for all ages to explore science in a fun and easy way.
                            </p>
                            <button className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-all">
                                Read More
                            </button>
                        </div>
                    </div>
                </div>

                <p className="mt-12 text-indigo-900 dark:text-indigo-200 text-center text-lg">
                    Join GoBook today and discover books that inspire, educate, and entertain!
                </p>
            </div>
        </section>
    );
}

export default Blogs;
