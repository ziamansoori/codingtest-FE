import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Nav from 'react-bootstrap/Nav';

const Header = () => {
    return (
        <Nav
          activeKey="/"
        >
          <Nav.Item>
            <Nav.Link href="/">Cars</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/add">Add Car</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/logout">Logout</Nav.Link>
          </Nav.Item>
        </Nav>
      );
}

export default Header