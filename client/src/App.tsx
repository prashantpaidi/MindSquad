import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import StudyMode from './pages/StudyMode';

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
    const { token, loading } = useAuth();
    if (loading) return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="bg-lime-300 border-2 border-black rounded-none shadow-[4px_4px_0px_0px_#000] py-4 px-8 font-[family-name:var(--font-mono)] font-bold uppercase text-black">
                Loading...
            </div>
        </div>
    );
    return token ? children : <Navigate to="/login" />;
};

function App() {
    return (
        <Router>
            <div className="app">
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route
                        path="/"
                        element={
                            <PrivateRoute>
                                <Dashboard />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/study/:deckId"
                        element={
                            <PrivateRoute>
                                <StudyMode />
                            </PrivateRoute>
                        }
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
