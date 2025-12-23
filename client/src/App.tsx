import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentToken } from './store/authSlice';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import StudyMode from './pages/StudyMode';
import Community from './pages/Community';

function App() {
    const token = useSelector(selectCurrentToken);



    return (
        <Router>
            <div className="app">
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route
                        path="/"
                        element={token ? <Dashboard /> : <Navigate to="/login" />}
                    />
                    <Route
                        path="/study/:deckId"
                        element={token ? <StudyMode /> : <Navigate to="/login" />}
                    />
                    <Route
                        path="/community"
                        element={token ? <Community /> : <Navigate to="/login" />}
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
