import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useRegisterMutation } from '../store/apiSlice';
import { Card, Input, Button, Alert } from '../components/ui';

export default function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [register, { isLoading }] = useRegisterMutation();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await register({ username, password }).unwrap();
            navigate('/login');
        } catch (err: any) {
            setError(err?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <Card className="w-full max-w-md" title="New User Entry">
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
                    <Button type="submit" variant="primary" size="lg" fullWidth disabled={isLoading}>
                        {isLoading ? 'Creating...' : 'Create Record'}
                    </Button>
                </form>
                <div className="mt-4 text-center text-sm">
                    <span className="font-[family-name:var(--font-mono)] text-gray-600">EXISTING USER? </span>
                    <Link to="/login" className="text-black font-bold underline hover:text-lime-300 transition-colors">LOGIN</Link>
                </div>
            </Card>
        </div>
    );
}
