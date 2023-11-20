import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import InstagramPage from "./pages/InstagramPage";
// import FacebookPage from "./pages/FacebookPage";
// import TwitterPage from "./pages/TwitterPage";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} exact />
                <Route path="/instagram" element={<InstagramPage />} />
                {/* <Route path="/facebook" element={<FacebookPage />} /> */}
                {/* <Route path="/twitter" element={<TwitterPage />} /> */}
            </Routes>
        </Router>
    );
};

export default App;