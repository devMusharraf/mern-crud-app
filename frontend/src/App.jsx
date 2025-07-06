import React, { useState } from 'react';
import CreateUserForm from './components/CreateUserForm';
import UserList from './components/UserList';

<script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
const App = () => {

  const [editingUser, setEditingUser] =   useState(null);

  return (
    <div style={{ padding: '20px' }}>
      <h1>MERN CRUD App</h1>
      <CreateUserForm editingUser={editingUser} setEditingUser={setEditingUser}  />
      <UserList setEditingUser={setEditingUser} />
    </div>
  );
};

export default App;
