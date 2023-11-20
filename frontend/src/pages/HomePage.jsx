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
            }}>
            <h1>Sentiment Analysis Platform</h1>
            <div style={{ margin: "20px" }}>
                <Link to="/instagram">Instagram</Link>
            </div>
            {/* <div style={{ margin: "20px" }}>
                <Link to="/facebook">Facebook</Link>
            </div>
            <div style={{ margin: "20px" }}>
                <Link to="/twitter">Twitter</Link>
            </div> */}
        </div>
    );
};

export default HomePage;