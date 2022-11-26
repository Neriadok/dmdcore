import './App.css';
import { googleAnalytics } from "./state/firebase";
import { authWithGoogle } from "./lib/login";
import { Button, AppBar, Toolbar, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Router from './pages/router';
import { useState } from 'react';
import { userSubject } from './state/session';
import { skip } from 'rxjs';

function App() {
    const analytics = googleAnalytics;
    const navigate = useNavigate();
    const [user, setUser] = useState(userSubject.value);
    userSubject.pipe(skip(1)).subscribe((v) => setUser(v));

    return (
        <main >
            <AppBar position="static" color="inherit">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} onClick={() => navigate("/")}>
                        DMD-Core
                    </Typography>
                    {
                        user ? <Button id="profile" onClick={() => navigate("/profile")}>{user?.name || 'Anonymous'}</Button>
                            : <Button id="access" color="primary" variant="text" onClick={() => access()}>Access</Button>
                    }
                </Toolbar>
            </AppBar>
            <Router></Router>
        </main>
    );

    async function access() {
        await authWithGoogle();
    }
}

export default App;
