import { useEffect, useState } from "react";
import axios from "axios";
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [filterUsers, setFilterUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userData, setUserData] = useState({ name: "", age: "", district: "" });

  const getAllUsers = async () => {
    try {
      const res = await axios.get("http://localhost:8000/users");
      setUsers(res.data);
      setFilterUsers(res.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const handleSearchChange = (e) => {
    const searchText = e.target.value.toLowerCase();
    const filteredUsers = users.filter((user) =>
      user.name.toLowerCase().includes(searchText) || 
      user.district.toLowerCase().includes(searchText));
    setFilterUsers(filteredUsers);
  };

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this user?');
    if (isConfirmed) {
      try {
        await axios.delete(`http://localhost:8000/users/${id}`);
        getAllUsers();
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    getAllUsers();
  };

  const handleAddRecord = () => {
    setUserData({ name: "", age: "", district: "" });
    setIsModalOpen(true);
  };

  const handleData = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (userData.id) {
        await axios.patch(`http://localhost:8000/users/${userData.id}`, userData);
      } else {
        await axios.post("http://localhost:8000/users", userData);
      }
      closeModal();
      setUserData({ name: "", age: "", district: "" });
    } catch (error) {
      console.error("Error adding/updating user:", error);
    }
  };

  const handleUpdateRecord = (user) => {
    setUserData(user);
    setIsModalOpen(true);
  };

  return (
    <>
      <div>
        <div className='container'>
          <h2>CRUD application with ReactJs frontend and NodeJs backend</h2>
        </div>
        <div className="input-search">
          <input 
            type='search' 
            placeholder="Search Text Here" 
            onChange={handleSearchChange}
          />
          <button className='btn green' onClick={handleAddRecord}>Add Record</button>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Age</th>
              <th>District</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {filterUsers && filterUsers.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.age}</td>
                <td>{user.district}</td>
                <td>
                  <button className='btn green' onClick={() => handleUpdateRecord(user)}>Edit</button>
                </td>
                <td>
                  <button onClick={() => handleDelete(user.id)} className='btn red'>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {isModalOpen && (
          <div className="model">
            <div className="model-content">
              <span className="close" onClick={closeModal}>&times;</span>
              <h2>{userData.id ? "Update Record" : "Add Record"}</h2>
              <form onSubmit={handleSubmit}>
                <div className="input-group">
                  <label htmlFor="name">Full Name</label>
                  <input type="text" value={userData.name} name="name" id='name' onChange={handleData} />
                </div>
                <div className="input-group">
                  <label htmlFor="age">Age</label>
                  <input type="number" value={userData.age} name="age" id='age' onChange={handleData} />
                </div>
                <div className="input-group">
                  <label htmlFor="district">District</label>
                  <input type="text" value={userData.district} name="district" id='district' onChange={handleData} />
                </div>
                <button className="btn green" type="submit">{userData.id ? "Update Record" : "Add Record"}</button>
              </form>
            </div>
          </div>
        )}
      </div>  
    </>
  );
}

export default App;
