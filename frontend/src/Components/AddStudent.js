import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
//surya vemparala hii welcome aravind
// Aravind is a good boy 
const AddStudent = () => {
    const [data, setDate] = useState({
        name: '',
        age: '',
        gender:'',
        email: '',
        phonenumber:'',
        dob:'',
        username:'',
        password: ''
        
    })

    const navigate = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault();
        const formdata = new FormData();
        formdata.append('name', data.name);
        formdata.append('age', data.age);
        formdata.append('gender', data.gender);
        formdata.append('email', data.email);
        formdata.append('phonenumber', data.phonenumber);
        formdata.append('dob', data.dob)
        formdata.append('username', data.username);
        formdata.append('password',data.password);
        axios.post('http://localhost:3000/registration', formdata)
            .then(res => {
                navigate('/')
            })
            .catch(err => console.log(err))
    }
    return (
        <div className="bg-opacity-40 bg-white p-8 rounded-lg shadow-lg max-w-xl w-full">
    <h2 className="text-4xl text-center  font-semibold mb-4">Registration Form</h2>
    <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="solid text-black-1000 font-bold uppercase text-center">Name:</label>
          <input
            type="text"
            name="name"
            // value={formData.name}
            onChange={e => setDate({ ...data, studentname: e.target.value })}
            required
            placeholder="please enter name here"
            className="w-full px-3 py-2 border rounded-lg focus:outline-solid focus:border-black-800"
          />
        </div>
        <div className="mb-4">
          <label className="solid text-black-1000 font-bold uppercase text-center">Age:</label>
          <input
            type="number"
            name="age"
            // value={formData.age}
            onChange={e => setDate({ ...data, age: e.target.value })}
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-solid focus:border-black-800"
          />
        </div>
        <div className="mb-4">
          <label className="solid text-black-1000 font-bold uppercase text-center">Gender:</label>
          <select
            name="gender"
            // value={formData.gender}
            onChange={e => setDate({ ...data, gender: e.target.value })}
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-solid focus:border-black-800"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="solid text-black-1000 font-bold uppercase text-center">Email:</label>
          <input
            type="email"
            name="email"
            // value={formData.email}
            onChange={e => setDate({ ...data,   email: e.target.value })}
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-solid focus:border-black-800"
          />
        </div>
        <div className="mb-4">
          <label className="solid text-black-1000 font-bold uppercase text-center">Phone Number:</label>
          <input
            type="text"
            name="phonenumber"
            // value={formData.phonenumber}
            onChange={e => setDate({ ...data, phonenumber: e.target.value })}
            required
            placeholder="123-456-7890"
            className="w-full px-3 py-2 border rounded-lg focus:outline-solid focus:border-black-800"
          />
        </div>
        <div className="mb-4">
          <label className="solid text-black-1000 font-bold uppercase text-center">Date of Birth:</label>
          <input
            type="date"
            name="dob"
            // selected={formData.dob}
            onChange={e => setDate({ ...data, bob: e.target.value })}
            required
            dateFormat="dd/MM/yyyy"
            className="w-full px-3 py-2 border rounded-lg focus:outline-solid focus:border-black-800"
          />
        </div>
        <div className="mb-4">
          <label className="solid text-black-1000 font-bold uppercase text-center">Username:</label>
          <input
            type="text"
            name="username"
            // value={formData.username}
            onChange={e => setDate({ ...data, username: e.target.value })}
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-solid focus:border-black-800"
          />
        </div>
        <div className="mb-4">
          <label className="solid text-black-1000 font-bold uppercase text-center">Password:</label>
          <input
            type="password"
            name="password"
            // value={formData.password}
            onChange={e => setDate({ ...data, password: e.target.value })}
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-solid focus:border-black-800"
          />
        </div>
        <div>
          <button
            type="submit"
            onChange={handleSubmit}
            className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Register
          </button>
        </div>
      </form>
    </div>
    
  );
}

export default AddStudent