import React, { useEffect, useState } from 'react'
import axios from "axios"

<script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
const CreateUserForm = ({ editingUser, setEditingUser }) => {
    const [formData, setFormData] = useState({
        name: '',
        age: "",
        email: ''
    })

    useEffect(() => {
        if (editingUser) {
            setFormData({
                name: editingUser.name,
                age: editingUser.age,
                email: editingUser.email
            })
        }
    }, [editingUser])
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (editingUser) {

                await axios.put(`http://localhost:5000/api/users/${editingUser._id}`, formData);
                alert('User updated successfully!')
            }
            else {
                await axios.post('http://localhost:5000/api/users', formData);
                alert('User created succesfully!')
            }
            setFormData({ name: "", age: '', email: "" });
            setEditingUser(null)

        }
        catch (error) {
            console.error('Error submitting form:', error);
            alert('Something went wrong!');
        }

    }
    return (
        <div className="container mt-4">
            <h3 className="text-center mb-4">{editingUser ? 'Edit User' : 'Create New User'}</h3>
            <form onSubmit={handleSubmit} className="border p-4 shadow-sm rounded">
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                        name="name"
                        className="form-control"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter name"
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Age</label>
                    <input
                        type="number"
                        name="age"
                        className="form-control"
                        value={formData.age}
                        onChange={handleChange}
                        placeholder="Enter age"
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        name="email"
                        className="form-control"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter email"
                        required
                    />
                </div>

                <div className="d-flex gap-2">
                    <button type="submit" className="btn btn-primary">
                        {editingUser ? 'Update' : 'Create'}
                    </button>
                    {editingUser && (
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => {
                                setEditingUser(null);
                                setFormData({ name: '', age: '', email: '' });
                            }}
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default CreateUserForm