import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";

import Select from "react-select";
import InfiniteScroll from 'react-infinite-scroll-component';
import { FaFilter } from 'react-icons/fa';

import { fetchAllUserApi } from "../../Api/user.api";
import { fetchAllUsers, filterUser } from "../../features/users/userSlice";
import User from "../User/User";
import "./Employee.css"


function Employee() {

  const [countryFilter, setCountryFilter] = useState(undefined);
  const [genderFilter, setGenderFilter] = useState(undefined);

  const users = useSelector(state => state.users);
  const userPerPage = useSelector(state => state.userPerPage);
  const filteredUser = useSelector(state => state.filteredUser);

  const dispatch = useDispatch();



  const fetchUser = async () => {
    try {
      const response = await fetchAllUserApi(userPerPage, users.length);
      console.log(response)
      let userRes = response.users;
      dispatch(fetchAllUsers(userRes))
    }
    catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchUser()
  }, [])

  useEffect(() => {
    dispatch(filterUser({ gender: genderFilter?.value, country: countryFilter?.value }))
  }, [countryFilter, genderFilter])

  return (
    <div class="flex flex-col items-center h-screen">
      <div class="flex flex-row justify-between items-center mt-4 w-full max-w-screen-lg  py-8">
        <h1 class="mb-4 font-bold text-4xl">Employee</h1>

        <div class="mb-4 flex space-x-2">
          <FaFilter className="text-4xl text-red-500 w-6 h-6 my-2" />
          <Select
            isClearable={true}
            value={genderFilter}
            placeholder="Gender"
            options={[
              { value: "male", label: "Male" },
              { value: "female", label: "Female" },
            ]}
            onChange={(option) => { setGenderFilter(option) }}
          />
          <Select
            isClearable={true}
            value={countryFilter}
            placeholder="Country"
            options={[
              { value: "United States", label: "United States" },
              { value: "United Kingdom", label: "United Kingdom" },
            ]}
            onChange={(option) => { setCountryFilter(option) }}
          />
        </div>
      </div>

      <InfiniteScroll className="max-h-50"
        dataLength={users.length} // This is important field to render the next data
        next={() => {
          fetchUser();
          dispatch(filterUser({ gender: genderFilter, country: countryFilter }))
        }}
        hasMore={true}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <div className="overflow-x-auto w-full max-w-screen-lg ">
          <table className="min-w-full border border-gray-200 rounded-mg bg-white border-collapse   ">
            <thead className="thead">
              <tr>
                <th className="px-4 py-5 ">ID</th>
                <th className="px-4 py-5 ">Image</th>
                <th className="px-4 py-5 ">Full Name</th>
                <th className="px-4 py-5 ">Demography</th>
                <th className="px-4 py-5 ">Designation</th>
                <th className="px-4 py-5 ">Location</th>
              </tr>
            </thead>
            <tbody>
              {genderFilter || countryFilter ? filteredUser.map((user) => (<User key={nanoid()} user={user} />)) : users.map((user) => (<User key={nanoid()} user={user} />))}
            </tbody>
          </table>
        </div>
      </InfiniteScroll>
    </div>

  )
}

export default Employee;
