import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import './style.css'; 

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

            <button className="btn" data-text="Awesome">
                <span className="actual-text">&nbsp;Sentiment Analysis Platform&nbsp;</span>
                <span aria-hidden="true" className="hover-text">&nbsp;Sentiment Analysis Platform &nbsp;</span>
            </button>
        
            <div style={{ margin: "20px" }}>
                <Link to="/instagram" className="btn1">
                    Instagram Sentiment Analyzer
                    <FontAwesomeIcon icon={faArrowRight} style={{ marginLeft: '5px' }} />
                </Link>
            </div>
        </div>
    );
};

export default HomePage;