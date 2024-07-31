import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from 'react-infinite-scroll-component';
import { fetchAllUserApi } from "./Api/user.api";
import { useEffect } from "react";
import { fetchAllUsers, filterUser, setGenderFilter, setCountryFilter } from "./features/users/userSlice";
import User from "./components/User";
import { nanoid } from "@reduxjs/toolkit";
import Select from "react-select";

function App() {
  const dispatch = useDispatch();
  const users = useSelector(state => state.users);
  const genderFilter = useSelector(state => state.genderFilter);
  const countryFilter = useSelector(state => state.countryFilter)
  const userPerPage = useSelector(state => state.userPerPage);

  const fetchUser = async () => {
    try {
      const response = await fetchAllUserApi(userPerPage, users.length);
      console.log("null" , response)
      let userRes = response.users;
      if (genderFilter) {
        userRes = userRes.filter((user) => (user.gender === genderFilter))
      }
      if (countryFilter) {
        userRes = userRes.filter((user) => (user.address.country === countryFilter))
      }
      dispatch(fetchAllUsers(userRes))
    }
    catch (error) {
      console.log(error);
    }
  };

  // const filterUserGender = (gender) => {
  //   dispatch(setGenderFilter(gender.value))
  //   console.log("filterUserGender", genderFilter)
  //   if (gender.value) {
  //     const filteredUser = users.filter((user) => (user.gender === gender.value))
  //     console.log(filteredUser)
  //     dispatch(filterUser(filteredUser))
  //   }
  //   if (gender.value === null) {
  //     dispatch(setGenderFilter(null))
  //     filterUser()
  //   }
  // }

  // const filterUserCountry = (country) => {
  //   dispatch(setCountryFilter(country.value));
  //   if (country.value) {
  //     const filteredUser = users.filter((user) => (user.address.country === country.value));
  //     console.log(filteredUser)
  //     dispatch(filterUser(filteredUser))
  //   }
  //   if (country.value === null) {
  //     dispatch(setCountryFilter(null))
  //     fetchUser();
  //   }
  // }

  useEffect(() => {
    fetchUser();
  }, [dispatch])
  return (
    <>
      <div>
        <h2>Employee</h2>
        <Select options={[
          { value: "male", label: "Male" },
          { value: "female", label: "Female" },
          { value: null, label: "No" }
        ]}
          onChange={(option) => { filterUserGender(option) }} />
        <Select options={[
          { value: "United States", label: "United States" },
          { value: "United Kingdom", label: "United Kingdom" },
          { value: null, label: "No" }
        ]}
          onChange={(option) => { filterUserCountry(option) }} />
      </div>
      <h1>Employees</h1>

      <InfiniteScroll
        dataLength={users.length} //This is important field to render the next data
        next={fetchUser}
        hasMore={true}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <div>
          {users.map((user) => (<User key={nanoid()} user={user} />))}
        </div>
      </InfiniteScroll>

    </>
  )
}

export default App
