import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchUsers, addUser, updateUser, deleteUser } from '../../redux/slices/adminSlice';

const UserManagement = () => {
const dispatch = useDispatch();
const navigate = useNavigate();

const {user}=useSelector((state)=>state.auth);
const {users = [], loading, error} = useSelector((state)=>state.admin);

useEffect(()=>{
    if(user && user.role!=='admin'){
        navigate('/');
    }},[user, navigate])

useEffect (() => {
  if(user && user.role === 'admin') {
    dispatch(fetchUsers());
}},[dispatch,user]);

    const [formData,setFormData]=useState({
        name:'',
        email:'',
        password:'',
        role:'customer', // default role
    })

    const handleChange=(e)=>{
     setFormData({
        ...formData,
        [e.target.name]:e.target.value,
    }); 
    }
    // const handleSubmit=(e)=>{
    //     e.preventDefault();

    //     // Handle form submission logic here
    //     // for example, you can dispatch an action to add the new user to the Redux store
    //     dispatch(addUser(formData));
    //     // reset form after submission
    //     setFormData({
    //         name:'',
    //         email:'',
    //         password:'',
    //         role:'customer', 
    //     });
    // }
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      await dispatch(addUser(formData));
      dispatch(fetchUsers()); // fetch updated list
  
      setFormData({
          name:'',
          email:'',
          password:'',
          role:'customer', 
      });
  };
  

    const handleRoleChange=(userId,newRole)=>{
        // update user role in state
        dispatch(updateUser({id: userId, role: newRole}));
        };
    const handleDeleteUser=(userId)=>{
        // remove user from state
        if(window.confirm('Are you sure you want to delete this user?')){
            dispatch(deleteUser(userId));
        }
    }
    useEffect(() => {
      console.log('Fetched users:', users);
    }, [users]);
    
  return (
    <div className='max-w-7xl mx-auto p-6'>
      <h2 className='text-2xl font-bold mb-6'>User Management</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {/* Add New User Form */}
      <div className=' p-6 rounded-lg mb-6'>
        <h3 className='text-lg font-bold mb-4'>Add New User</h3>
        <form onSubmit={handleSubmit}>
        <div className='mb-4'>
        <label htmlFor='name' className='block text-sm font-medium text-gray-700'>Name</label>
        <input type='text' id='name' name='name' className='mt-1 p-2 w-full border rounded' value={formData.name} onChange={handleChange} required />
      </div>
      <div className='mb-4'>
        <label htmlFor='email' className='block text-sm font-medium text-gray-700'>Email</label>
        <input type='email' id='email' name='email' className='mt-1 p-2 w-full border rounded' value={formData.email} onChange={handleChange} required />
      </div>
      <div className='mb-4'>
        <label htmlFor='password' className='block text-sm font-medium text-gray-700'>Password</label>
        <input type='password' id='password' name='password' className='mt-1 p-2 w-full border rounded' value={formData.password} onChange={handleChange} required />
      </div>
      <div className='mb-4'>
        <label htmlFor='role' className='block text-sm font-medium text-gray-700'>Role</label>
        <select id='role' name='role' className='mt-1 p-2 w-full border rounded' value={formData.role} onChange={handleChange}>
        <option value='admin'>Admin</option>
        <option value='customer'>Customer</option>
        </select>
      </div>
      <button type='submit' className='bg-green-500 text-white p-2 rounded hover:bg-green-600'>Add User</button>
    </form>

      </div>
      {/* User List Management */}
      <div className='overflow-x-auto shadow-md p-6 sm:rounded-lg'>
        <h3 className='text-lg font-bold mb-4'>User List</h3>
        <table className='min-w-full text-left text-gray-500 border-collapse'>
          <thead className='bg-gray-100 text-xs uppercase text-gray-700'>
            <tr>
              <th className='border p-3'>Name</th>
              <th className='border p-3'>Email</th>
              <th className='border p-3'>Role</th>
              <th className='border p-3'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {!loading && users && users.map((user) => (
                <tr key={user._id} className='border-b hover:bg-gray-50'>
                    <td className='p-4 font-medium text-gray-900 whitespace-nowrap'>{user.name}</td>
                    <td className='p-4 whitespace-nowrap'>{user.email}</td>
                    <td className='p-4'>
                        <select value={user.role} onChange={(e) => handleRoleChange(user._id, e.target.value)}
                            className='border rounded p-2 w-full'>
                            <option value='admin'>Admin</option>
                            <option value='customer'>Customer</option>
                        </select>
                    </td>
                    <td className='p-4'>
                        <button className='bg-red-500 text-white p-2 rounded hover:bg-red-600' onClick={()=> handleDeleteUser(user._id)}>Delete</button>
                    </td>
                </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default UserManagement
