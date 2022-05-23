import { Navbar, Button } from "@blueprintjs/core"
import { useContext } from 'react'
import "./header.scss"
import { LoginContext } from '../../context/LoginContext';
import { When } from 'react-if';
import Login from '../login/Login'
const Header = () => {
    const log = useContext(LoginContext);
    return (
        <Navbar className="header">
            <Navbar.Group className="heading"  >
                <Navbar.Heading >TODO</Navbar.Heading>
                <Navbar.Divider />
                <Button className="bp4-minimal" icon="home" text="Home" style={{ color: "white" }} />
            </Navbar.Group>
            <div className="log">
                    <Login />
                    <When condition={log.loggedIn}>
                        <Button intent='danger' onClick={(e) => log.logout()} style={{marginTop:'20px'}}>
                            Logout
                        </Button>
                    </When>
                </div>
        </Navbar>
    )
}
export default Header;