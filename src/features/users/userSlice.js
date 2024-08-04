import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users: [], 
    userPerPage: 10, 
    filteredUser: [], 
}

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        fetchAllUsers: (state, action) => {
            state.users = [...state.users, ...action.payload] // Add fetched users to the state
        },
        filterUser: (state, action) => {
            const userData = state.users; 
            const { gender, country } = action.payload; // Get gender and country from the action payload

            if (userData.length > 0) {
                if (gender && country) {
                    // Filter users based on gender and country
                    state.filteredUser = userData.filter((user) => (user.gender === gender && user.address.country === country));
                    return;
                };
                if (gender) {
                    // Filter users based on gender
                    state.filteredUser = userData.filter((user) => (user.gender === gender));
                    return;
                };
                if (country) {
                    // Filter users based on country
                    state.filteredUser = userData.filter((user) => (user.address.country === country));
                    return;
                }
                else {
                    state.filteredUser = []; // Reset filtered users array
                }
            }
        },
    }
});

// Export the actions and reducer
export const { fetchAllUsers, filterUser } = userSlice.actions;
export default userSlice.reducer;