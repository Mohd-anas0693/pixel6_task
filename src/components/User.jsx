import React from 'react'

function User({user}) {
    return (
        <div>
            <ul key={user.id} className="users">
                <li >{user.id}</li>
                <img src={`${user.image}`} />
                <li> {user.firstName + " " + user.maidenName + " " + user.lastName}</li>
                <li> {user.gender + "/" + user.age} </li>
                <li>{user.company.title}</li>
                <li>{user.address.state + "," + user.address.country}</li>
            </ul>
        </div>
    )
}

export default User