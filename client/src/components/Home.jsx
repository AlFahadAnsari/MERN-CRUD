import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'


const Home = () => {

  const [inputUser, setInputUser] = useState({
    name: "",
    email: "",
    password: "",
  });


  const handleChnage = (event) => {
    setInputUser({
      ...inputUser,
      [event.target.name]: event.target.value,
    });
  };


  let onsubmit = async (event)=>{
    event.preventDefault();
    console.log(inputUser);
    let postData =await axios.post('https://mern-crud-server-blond.vercel.app/creteuser',inputUser)
    window.location.reload()
  }


  // fatch all data
  const [UserAllData, setUserAllData] = useState([])
  useEffect(() => {
    let FechAllData = async () => {
      let res = await axios.get('https://mern-crud-server-blond.vercel.app/readuser')
      console.log(res);
      setUserAllData(res.data)
    }
    FechAllData()
  }, [])



      // delete method

  let handleDelete=async (id)=>{
    let delteData =await axios.delete(`https://mern-crud-server-blond.vercel.app/delete/${id}`)
    window.location.reload()
  }



  return (


    <div className="w-2/3 mx-auto mt-5">
      {/* creating form */}
      <form onSubmit={onsubmit}>
        <h1>Create User</h1>
        <div className="">
          <label className=" text-sm text-gray-500 ">Name</label>

          
          <input
            type="text"
            name="name"
            className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent  border-2 border-gray-300"
            placeholder="Enter name"
            required
            value={inputUser.name}
            onChange={handleChnage}


          />
        </div>
        <div className="">
          <label className=" text-sm text-gray-500 ">Email</label>
          <input
            type="text"
            name="email"
            className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent  border-2 border-gray-300"
            placeholder="Enter email "
            required
            value={inputUser.email}
            onChange={handleChnage}


          />
        </div>
        <div className="">
          <label className=" text-sm text-gray-500 ">Password</label>
          <input
            type="password"
            name="password"
            className="block py-2.5 px-3 w-full text-sm text-gray-900 bg-transparent  border-2 border-gray-300"
            placeholder="Enter Password "
            required
            value={inputUser.password}
            onChange={handleChnage}

          />
        </div>

        <div className="flex justify-center my-4">
          <button type="submit" className="px-4 py-2 bg-yellow-400 rounded-sm" >
            Add User
          </button>
        </div>
      </form>







      <div className="overflow-x-auto shadow-md">
        <table className="w-full text-lg text-center text-gray-500 ">
          <thead className="text-[17px] text-gray-700 uppercase bg-gray-500">
            <tr>
              <th scope="col" className="px-6 py-3">
                SN.
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Password
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>

        



{UserAllData.map((item, i) => (
              <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {i + 1}
                </th>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {item.name}
                </th>
                <td className="px-6 py-4"> {item.email}</td>
                <td className="px-6 py-4"> {item.password}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-x-4 justify-center">
                    <Link
                      to={`/readuser/${item._id}`}
                      className="font-medium text-green-600 dark:text-blue-500 hover:underline"
                    >
                      Read
                    </Link>
                    <Link
                      to={`/update/${item._id}`}
                      className="font-medium text-yellow-400 dark:text-blue-500 hover:underline"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="font-medium text-red-500  hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}

          

          </tbody>
        </table>
      </div>
    </div>
  );







}

export default Home
