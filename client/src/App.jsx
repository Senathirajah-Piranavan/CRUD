import { useEffect, useState } from "react";
import axios from "axios";
import './App.css';

function App() {
  return (
    <>
      <div className='container'>
      <h2>CRUD application with ReactJs frontend and NodeJs backend</h2>
      </div>
      <div className="input-search">
           <input type='search'/>
           <button className='btn green'>Add Record</button>
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
          <tr>
            <td>1</td>
            <td>Jhon</td>
            <td>28</td>
            <td>Jaffna</td>
            <td>
              <button className='btn green'>Edit</button>
            </td>
            <td>
              <button className='btn red'>Delete</button>
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>Joy</td>
            <td>26</td>
            <td>Galle</td>
            <td>
              <button className='btn green'>Edit</button>
            </td>
            <td>
              <button className='btn red'>Delete</button>
            </td>
          </tr>
          <tr>
            <td>3</td>
            <td>Ravi</td>
            <td>30</td>
            <td>Kandy</td>
            <td>
              <button className='btn green'>Edit</button>
            </td>
            <td>
              <button className='btn red'>Delete</button>
            </td>
          </tr>
         </tbody>
      </table>
      </>
  )
}

export default App
