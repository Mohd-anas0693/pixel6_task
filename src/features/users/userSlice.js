import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users: [],
    userPerPage: 10,
    sortBy: "",
    sortOrder: "asc",
    genderFilter: null,
    countryFilter: null,
}


const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        setGenderFilter: (state, action) => {
            state.genderFilter = action.payload
            console.log("slice ", state.genderFilter);
        },
        setCountryFilter: (state, action) => {
            state.countryFilter = action.payload;
        },
        filterUser: (state, action) => {
            state.users = [...action.payload]
        },
        fetchAllUsers: (state, action) => {
            state.users = [...state.users, ...action.payload]
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