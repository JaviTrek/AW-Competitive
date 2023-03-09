import React from 'react';
import Axios from 'axios';

// function postForm() {
//     return (
//         <div style={{
//             width: '200px',
//             heigth: '200px',
//         }}>
//             <form method='post' action="/register">
//                 <input placeholder='username' type='text'></input>
//                 <input placeholder='password' type='password'></input>
//             </form>
//         </div>
//     )
// }

export function Register() {

    
    return (
        <div>
            <form method='post' action="/registerUser">
                <label htmlFor="username"> Username:</label>
                <input type="text" name="username"/>

                <label htmlFor="password]"> Password:</label>
                <input type="text" name="password"/>

                <button type="submit"> Add new user</button>
                <br/>

            </form>

            <form method="get" action="/routes/auth">
                <button type="submit"> Discord</button>
            </form>
        </div>
    )
}


