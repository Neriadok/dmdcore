import logo from './logo.png';
import './App.css';
import { handleApiErrors } from "./lib/api-call";
import { googleAnalytics } from "./state/firebase";
import { authWithGoogle } from "./lib/login";
import { Button, Container, AppBar, IconButton, Toolbar, Typography } from '@mui/material';

function App() {
    const analytics = googleAnalytics;
    return (
        <main>
            <AppBar position="static" color="inherit">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    </Typography>
                    <Button id="access" color="inherit" onClick={() => access()}>Access</Button>
                </Toolbar>
            </AppBar>
            <Container>
                    <img src={logo} className="App-logo" alt="logo" />
            </Container>
        </main>
    );

    async function access() {
        const user = await authWithGoogle();
        await sayHello(user?.name || 'Buddy');
    }

    async function sayHello(name: string) {
        try {
            const response = await fetch(`/api/hello?name=${name}`);
            handleApiErrors(response, handleResponse);
        } catch (e) {
            console.error(e);
            alert('Request error.')
        }
    }

    async function handleResponse(response: Response) {
        const body = await response.json();
        alert(body?.message)

    }
}

export default App;
