import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

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
            <div className="w-full max-w-md border-2 border-black shadow-[4px_4px_0px_0px_#000] bg-white p-6">
                <h2 className="mb-6 text-center font-bold uppercase tracking-tight">System Access</h2>
                {error && <div className="text-red-600 mb-4 font-[family-name:var(--font-mono)]">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block mb-2 font-[family-name:var(--font-mono)] text-sm uppercase tracking-wider">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="w-full p-3 border-2 border-black font-[family-name:var(--font-mono)] text-base outline-none transition-shadow focus:shadow-[4px_4px_0px_0px_#000] focus:bg-gray-50"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block mb-2 font-[family-name:var(--font-mono)] text-sm uppercase tracking-wider">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full p-3 border-2 border-black font-[family-name:var(--font-mono)] text-base outline-none transition-shadow focus:shadow-[4px_4px_0px_0px_#000] focus:bg-gray-50"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-[#ccff00] py-3 px-6 border-2 border-black hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0px_0px_#000] shadow-[4px_4px_0px_0px_#000] font-[family-name:var(--font-mono)] font-bold uppercase transition-all cursor-pointer"
                    >
                        Initialize Session
                    </button>
                </form>
                <div className="mt-4 text-center text-sm">
                    <span className="font-[family-name:var(--font-mono)]">NO ACCOUNT? </span>
                    <Link to="/register" className="text-black font-bold">REGISTER</Link>
                </div>
            </div>
        </div>
    );
}
