import { LoginContext } from '../../context/LoginContext';
import { useContext, useState } from 'react';
import { When } from 'react-if';
import { Button } from '@blueprintjs/core';
import "./Login.scss"

export default function Login(props) {
    const log = useContext(LoginContext);
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [role, setRole] = useState();
    const [signup, setSignup] = useState(false);
    const [login, setLogin] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        log.login(username, password);
    }

    const handleSignup = (e) => {
        e.preventDefault();
        log.signup(username, password, role);
    }

    function ifLogin(e) {
        e.preventDefault();
        setLogin(!login);
        setSignup(false)
    }

    function ifSignup(e) {
        e.preventDefault();
        setSignup(!signup);
        setLogin(false)
    }

    return (
        <div className="log-form">
            {/* <p>Welcome to TODO!</p> */}
            <When condition={!log.loggedIn}>
                <div>
                    <When condition={login}>
                        
                        <form onSubmit={handleLogin}>
                            <input
                                style={{ marginRight: 5 }}
                                type='text'
                                placeholder='username'
                                onChange={(e) => setUsername(e.target.value)}
                                value={username}
                                required
                            />
                            <input
                                placeholder='password'
                                type='password'
                                onChange={(e) => setPassword(e.target.value)}
                                style={{ marginRight: 5 }}
                                required
                            />
                            <Button type='submit' style={{ backgroundColor: 'blue', color: 'white' }} >
                                Log in
                            </Button>
                        </form>
                    </When>
                    <When condition={signup}>
                        <form onSubmit={handleSignup} style={{ display: 'flex' }}>
                            <div id='signup-inputs'>
                                <input
                                    type='text'
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder='username'
                                    required
                                />
                                <input
                                    type='password'
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder='password'
                                    required
                                />
                                <select
                                    name='roles'
                                    onChange={(e) => setRole(e.target.value)}
                                    required
                                >
                                    <option value='' disabled selected>
                                        select your role
                                    </option>
                                    <option value='user'>user</option>
                                    <option value='admin'>editor</option>
                                    <option value='writer'>writer</option>
                                    <option value='editor'>admin</option>
                                </select>
                            </div>
                            <Button type='submit' className='sign-up' style={{ backgroundColor: 'blue', color: 'white' }}>
                                Sign up!
                            </Button>
                        </form>
                    </When>
                    <div id='signup-signin' style={{ marginTop: '20px' }}>
                        <When condition={signup}>
                            <Button
                                minimal='true'
                                intent='primary'
                                outlined='true'
                                style={{ backgroundColor: 'blue', color: 'white', marginRight: 5 }}
                                onClick={ifLogin}
                            >
                                Log In
                            </Button>
                        </When>
                        <When condition={login}>
                            <Button
                                minimal='true'
                                intent='primary'
                                outlined='true'
                                style={{ backgroundColor: 'blue', color: 'white' }}
                                onClick={ifSignup}
                            >
                                Sign Up
                            </Button>
                        </When>
                    </div>
                </div>
            </When>
        </div>
    )
}