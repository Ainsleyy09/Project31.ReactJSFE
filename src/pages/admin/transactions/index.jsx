import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { bookImageStorage } from '../../../_api';

function AdminTransactions() {
    const [transactions, setTransactions] = useState([]);
    const [openDropdownId, setOpenDropdownId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const res = await axios.get('http://127.0.0.1:8000/api/transactions', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    }
                });
                setTransactions(res.data.data || []);
            } catch (err) {
                console.error("Error fetching transactions:", err);
            }
        };

        fetchTransactions();
    }, []);

    const toggleDropdown = (id) => {
        setOpenDropdownId(openDropdownId === id ? null : id);
    };
    

    const handleDeleteTransaction = async (id) => {
        if (window.confirm("Are you sure you want to delete this transaction?")) {
            try {
                await axios.delete(`http://127.0.0.1:8000/api/transactions/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    }
                });
                setTransactions(transactions.filter(t => t.id !== id));
            } catch (error) {
                console.error(error);
                alert("Failed to delete transaction!");
            }
        }
    };

    return (
        <section className="p-4 sm:p-6">
            <div className="shadow-md rounded-lg bg-white">
                {/* Header */}
                <div className="flex items-center justify-between p-4">
                    <h2 className="text-lg font-semibold">All Transactions</h2>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-700">
                        <thead className="text-xs text-white bg-blue-700">
                            <tr>
                                <th className="px-4 py-3">Order Number</th>
                                <th className="px-4 py-3">Customer ID</th>
                                <th className="px-4 py-3">Book</th>
                                <th className="px-4 py-3">Total Amount</th>
                                <th className="px-4 py-3">Created At</th>
                                <th className="px-4 py-3"><span className="sr-only">Actions</span></th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.length > 0 ? (
                                transactions.map(t => (
                                    <tr key={t.id} className="border-b hover:bg-blue-50 transition-colors">
                                        <td className="px-4 py-3">{t.order_number}</td>
                                        <td className="px-4 py-3">{t.customer_id}</td>
                                        <td className="px-4 py-3 font-medium text-gray-900">
                                            {t.book ? (
                                                <div className="flex items-center">
                                                    <img
                                                        src={t.book.cover_photo?.startsWith("http") ? t.book.cover_photo : `${bookImageStorage}/${t.book.cover_photo}`}
                                                        alt={t.book.title}
                                                        className="w-12 h-16 object-cover rounded mr-2"
                                                    />
                                                    <span>{t.book.title}</span>
                                                </div>
                                            ) : "-"}
                                        </td>
                                        <td className="px-4 py-3">Rp {t.total_amount}</td>
                                        <td className="px-4 py-3">{new Date(t.created_at).toLocaleDateString()}</td>
                                        <td className="px-4 py-3 text-right">
                                            <button
                                                onClick={() => handleDeleteTransaction(t.id)}
                                                className="text-white bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4m-4 0a1 1 0 00-1 1v1h6V4a1 1 0 00-1-1m-4 0h4" />
                                                </svg>
                                            </button>
                                            {openDropdownId === t.id && (
                                                <div className="absolute right-0 mt-2 z-10 w-44 bg-white rounded shadow divide-y divide-gray-200">
                                                    <div className="py-1">
                                                        <button
                                                            onClick={() => handleDeleteTransaction(t.id)}
                                                            className="block py-2 px-4 text-sm text-gray-700 hover:bg-red-100 w-full text-left"
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
                                    <td colSpan={6} className="text-center p-4">No transactions found!</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}

export default AdminTransactions;
