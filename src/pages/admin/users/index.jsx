import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API } from '../../../_api'; // sesuai struktur project
import { getUsers } from '../../../_services/user';

function AdminUsers() {
    const [users, setUsers] = useState([]);
    const [openDropdownId, setOpenDropdownId] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await getUsers();
                setUsers(data || []);
            } catch (err) {
                console.error("Error fetching users:", err);
            }
        };

        fetchUsers();
    }, []);

    const toggleDropdown = (id) => {
        setOpenDropdownId(openDropdownId === id ? null : id);
    };

    const handleDeleteUser = async (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            try {
                await API.delete(`/user/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    }
                });
                setUsers(users.filter(u => u.id !== id));
            } catch (error) {
                console.error(error.response?.data || error);
                alert("Failed to delete user!");
            }
        }
    };

    return (
        <section className="p-4 sm:p-6">
            <div className="shadow-md rounded-lg bg-white">
                <div className="flex items-center justify-between p-4">
                    <h2 className="text-lg font-semibold">All Users</h2>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-700">
                        <thead className="text-xs text-white bg-blue-700">
                            <tr>
                                <th className="px-4 py-3">ID</th>
                                <th className="px-4 py-3">Name</th>
                                <th className="px-4 py-3">Email</th>
                                <th className="px-4 py-3">Role</th>
                                <th className="px-4 py-3"><span className="sr-only">Actions</span></th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.length > 0 ? (
                                users.map(u => (
                                    <tr key={u.id} className="border-b hover:bg-blue-50 transition-colors">
                                        <td className="px-4 py-3">{u.id}</td>
                                        <td className="px-4 py-3">{u.name}</td>
                                        <td className="px-4 py-3">{u.email}</td>
                                        <td className="px-4 py-3">{u.role}</td>
                                        <td className="px-4 py-3 text-right">
                                            <button
                                                onClick={() => handleDeleteUser(u.id)}
                                                className="text-white bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="text-center p-4">No users found!</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}

export default AdminUsers;
