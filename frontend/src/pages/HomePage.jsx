import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
                fontFamily: 'Arial, sans-serif',
            }}>
            <h1>Sentiment Analysis Platform</h1>
            <div style={{ margin: "20px" }}>
                <Link to="/instagram">Instagram</Link>
            </div>
        </div>
    );
};

export default HomePage;