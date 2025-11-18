import { Outlet } from "react-router-dom";
import { Navbar, Container, Nav, Form } from "react-bootstrap";
import { useTheme } from "../context/ThemeContext";

export function MainLayout() {
    const { theme, toggleTheme } = useTheme()

    return (
        <div>
            <Navbar bg="dark" data-bs-theme="dark" expand="lg">
                <Container>
                    <Navbar.Brand href="/">Hive</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/projects">Projects</Nav.Link>
                        <Form.Check 
                        type="switch"
                        id="theme-switch"
                        label={theme === 'light' ? 'Light Mode' : 'Dark Mode'}
                        checked={theme === 'dark'}
                        onChange={toggleTheme}
                        />
                    </Nav>
                </Container>
            </Navbar>

            <main className="py-4">
                <Container>
                    <Outlet />
                </Container>
            </main>
        </div>
    );
}