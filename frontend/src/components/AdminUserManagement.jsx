import { useState, useEffect } from 'react';
import api from '../services/api';
import { toast } from 'react-toastify';

const AdminUserManagement = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const { data } = await api.get('/users');
            setUsers(data);
        } catch (error) {
            console.error(error);
            toast.error('Failed to fetch users');
        }
    };

    const toggleBlockStatus = async (id, currentStatus) => {
        try {
            const { data } = await api.put(`/users/${id}/block`);
            toast.success(data.message);
            setUsers(users.map(user => user._id === id ? { ...user, isBlocked: !currentStatus } : user));
        } catch (error) {
            console.error(error);
            toast.error('Failed to update user status');
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-12">
            <div className="p-6 border-b border-gray-100">
                <h3 className="text-2xl font-bold text-gray-800">Manage Users</h3>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="p-4 font-semibold text-gray-600">Name</th>
                            <th className="p-4 font-semibold text-gray-600">Email</th>
                            <th className="p-4 font-semibold text-gray-600">Role</th>
                            <th className="p-4 font-semibold text-gray-600">Status</th>
                            <th className="p-4 font-semibold text-gray-600">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                                <td className="p-4">{user.name}</td>
                                <td className="p-4">{user.email}</td>
                                <td className="p-4">{user.isAdmin ? 'Admin' : 'User'}</td>
                                <td className="p-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${user.isBlocked ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                                        }`}>
                                        {user.isBlocked ? 'Blocked' : 'Active'}
                                    </span>
                                </td>
                                <td className="p-4">
                                    {!user.isAdmin && (
                                        <button
                                            onClick={() => toggleBlockStatus(user._id, user.isBlocked)}
                                            className={`px-3 py-1 rounded text-sm text-white transition ${user.isBlocked ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'
                                                }`}
                                        >
                                            {user.isBlocked ? 'Unblock' : 'Block'}
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminUserManagement;
