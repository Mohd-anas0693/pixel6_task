export const fetchAllUserApi = async (limit,skip) => {
    const response = await fetch(`https://dummyjson.com/users?limit=${limit}&skip=${skip}`);
    const data = await response.json()
    return data;
}