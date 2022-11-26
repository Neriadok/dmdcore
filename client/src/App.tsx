import logo from './logo.png';
import './App.css';
import { handleApiErrors } from "./lib/api-call";
import { googleAnalytics } from "./state/firebase";
import { authWithGoogle } from "./lib/login";
import { Button, Container, AppBar, Toolbar, Typography } from '@mui/material';

function App() {
    const analytics = googleAnalytics;
    return (
        <main >
            <AppBar position="static" color="transparent">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        DMD-Core
                    </Typography>
                    <Button id="access" color="primary" variant="text" onClick={() => access()}>Access</Button>
                </Toolbar>
            </AppBar>
            <Container style={{textAlign: 'center'}}>
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
