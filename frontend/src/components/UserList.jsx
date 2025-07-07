import React, { useEffect, useState } from 'react';
import axios from 'axios';

<script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
const UserList = ({ setEditingUser }) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('https://mern-crud-app-f2z4.onrender.com/api/users');

            if (Array.isArray(response.data)) {
                setUsers(response.data);
            } else {
                console.error('Response is not an array:', response.data);
                setUsers([]);
            }

        } catch (error) {
            console.error('Error fetching users:', error);
            setUsers([]); // avoid undefined
        } finally {
            setLoading(false);
        }
    };


    const deleteUser = async (id) => {
        const confirm = window.confirm("Are you sure you want to delete this user?");
        if (!confirm) return;

        try {
            await axios.delete(`https://mern-crud-app-f2z4.onrender.com/api/users/${id}`);
            alert('USer deleted successfully!')
            fetchUsers();
        } catch (error) {
            console.error('Error deleting user:', error)
            alert('Failed to delte a user')
        }
    }
    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className="container mt-5">
            <h3 className="text-center mb-4">User List</h3>

            {loading ? (
                <p>Loading users...</p>
            ) : users.length === 0 ? (
                <p>No users found.</p>
            ) : (
                <div className="table-responsive">
                    <table className="table table-bordered table-striped">
                        <thead className="table-primary">
                            <tr>
                                <th>Name</th>
                                <th>Age</th>
                                <th>Email</th>
                                <th style={{ width: '160px' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user._id}>
                                    <td>{user.name}</td>
                                    <td>{user.age}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <button
                                            className="btn btn-sm btn-danger me-2"
                                            onClick={() => deleteUser(user._id)}
                                        >
                                            Delete
                                        </button>
                                        <button
                                            className="btn btn-sm btn-success"
                                            onClick={() => setEditingUser(user)}
                                        >
                                            Edit
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default UserList;
