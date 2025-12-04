import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Card, Input, Button, Alert } from '../components/ui';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/auth/login', { username, password });
            login(res.data.token, { userId: res.data.userId, username: res.data.username });
            navigate('/');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <Card className="w-full max-w-md" title="System Access">
                {error && <Alert variant="error" message={error} />}
                <form onSubmit={handleSubmit}>
                    <Input
                        label="Username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <Input
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <Button type="submit" variant="primary" size="lg" fullWidth>
                        Initialize Session
                    </Button>
                </form>
                <div className="mt-4 text-center text-sm">
                    <span className="font-[family-name:var(--font-mono)] text-gray-600">NO ACCOUNT? </span>
                    <Link to="/register" className="text-black font-bold underline hover:text-lime-300 transition-colors">REGISTER</Link>
                </div>
            </Card>
        </div>
    );
}
