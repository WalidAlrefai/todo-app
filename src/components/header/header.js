import {Navbar,Button} from "@blueprintjs/core"
import "./header.scss"
const Header = () =>{
    return (
        <Navbar className="header">
            <Navbar.Group  >
                <Navbar.Heading>TODO</Navbar.Heading>
                <Navbar.Divider />
                <Button className="bp4-minimal" icon="home" text="Home" style={{color: "white"}} />
            </Navbar.Group>
        </Navbar>
    )
}
export default Header;