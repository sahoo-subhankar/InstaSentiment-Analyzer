import { useState } from 'react';
import axios from 'axios';

const InstagramPage = () => {
    const [username, setUsername] = useState('');
    const [score, setScore] = useState(null);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleFetchScore = async () => {
        if (username === '') {
            alert('Please fill up all the inputs');
            return;
        }

        try {
            setLoading(true);
            const response = await axios.get(`http://127.0.0.1:8000/api/get_user_score_instagram/${username}`);

            if (response.status === 200) {
                setScore(response.data.score);
                setMessage(response.data.message);
            }
        } catch (error) {
            alert('Error fetching score. Check username and try again');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
            }}>
            <h1>Instagram Comments & Captions Sentiment Analyzer</h1>
            <div style={{ margin: '20px' }}>
                <label htmlFor="username">Enter Instagram Username: </label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    autoComplete="off" />
            </div>

            {loading && <p>Loading...</p>}

            {score !== null && message !== '' && (
                <div style={{ margin: '20px' }}>
                    <p>{message}</p>
                </div>
            )}

            {score !== null && (
                <div style={{ margin: '20px' }}>
                    <p>Score of {username} is: {score}</p>
                </div>
            )}

            <div style={{ margin: '20px' }}>
                <button onClick={handleFetchScore} disabled={loading}>
                    Show Profile Score
                </button>
            </div>
        </div>
    );
};

export default InstagramPage;