import React from 'react';


export function Login() {    
    return (
        <div>
            <form method='post' action="/loginUser">
                <label htmlFor="username"> Username:</label>
                <input type="text" name="username"/>

                <label htmlFor="password]"> Password:</label>
                <input type="text" name="password"/>

                <button type="submit"> Login</button>
                <br/>

            </form>

            <form method="get" action="/routes/auth">
                <button type="submit"> Discord</button>
            </form>
        </div>
    )
}