import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import InstagramPage from "./pages/InstagramPage";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} exact />
                <Route path="/instagram" element={<InstagramPage />} />
            </Routes>
        </Router>
    );
};

export default App;