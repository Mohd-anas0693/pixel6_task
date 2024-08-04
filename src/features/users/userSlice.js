import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users: [],
    userPerPage: 10,
    sortBy: "",
    sortOrder: "asc",
    filteredUser: [],
}


const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {

        fetchAllUsers: (state, action) => {
            state.users = [...state.users, ...action.payload]
        },
        filterUser: (state, action) => {
            const userData = state.users;
            console.log(action.payload)
            const { gender, country } = action.payload;
        
            if (userData.length > 0) {
                if (gender && country) {
                    state.filteredUser =  userData.filter((user) => (user.gender === gender && user.address.country === country));
                    return;
                };
                if (gender) {
                    state.filteredUser = userData.filter((user) => (user.gender === gender));
                    return;
                };
                if (country) {
                    state.filteredUser =  userData.filter((user) => (user.address.country === country));
                    return;
                }
                else {
                    state.filteredUser = [];
                }
            }
        },
        setSortBy: (state, action) => {
            state.sortBy = action.payload;
        },
        setSortOrder: (state, action) => {
            state.sortOrder = action.payload;
        },
        sortUsers: (state) => {
            state.users = state.users.sort((a, b) => {
                if (state.sortOrder === 'asc') {
                    return a[state.sortBy] > b[state.sortBy] ? 1 : -1;
                } else {
                    return a[state.sortBy] < b[state.sortBy] ? 1 : -1;
                }
            });
        },
    }
});
export const { fetchAllUsers, sortBy, setSortOrder, sortUsers, filterUser, setGenderFilter, setCountryFilter } = userSlice.actions;
export default userSlice.reducer;