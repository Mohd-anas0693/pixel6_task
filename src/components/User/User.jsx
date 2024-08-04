import React from 'react'

function User({ user }) {
    return (

         <tr className="bg-white border-b">
      <td className="px-4 py-5  text-center   ">{user.id}</td>
      <td className="px-4 py-2  flex justify-center items-center">
        <img className="w-10 h-10 rounded-full" src={user.image} alt={`${user.firstName} ${user.lastName}`} />
      </td>
      <td className="px-4 py-5  text-center">{`${user.firstName} ${user.maidenName} ${user.lastName}`}</td>
      <td className="px-4 py-5  text-center">{`${user.gender}/${user.age}`}</td>
      <td className="px-4 py-5  text-center">{user.company.title}</td>
      <td className="px-4 py-5  text-center">{`${user.address.state}, ${user.address.country}`}</td>
    </tr>
    )
}

export default User