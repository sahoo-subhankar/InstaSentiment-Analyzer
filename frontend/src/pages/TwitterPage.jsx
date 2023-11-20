import { useState } from 'react';
import axios from 'axios';

const TwitterPage = () => {
    const [username, setUsername] = useState('');
    const [score, setScore] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleFetchScore = async () => {
        if (username === '') {
            alert('Please enter a valid username');
            return;
        }

        try {
            setLoading(true);
            // API endpoint for fetching user score
            const { response } = await axios.get(`http://127.0.0.1:8000/api/get_user_score/${username}`);

            // Check if the request was successful
            if (response.status === 200) {
                setScore(response.data.score);
            }
        } catch (error) {
            alert('Error fetching score. Check username and try again');
            console.error('Error fetching score:', error);
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
            <h1>Twitter Comments Sentiment Analyzer</h1>
            <div style={{ margin: '20px' }}>
                <label htmlFor="username">Enter Twitter Username: </label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    autoComplete="off"
                />
            </div>

            {loading && <p>Loading...</p>}

            {score !== null && (
                <div style={{ margin: '20px' }}>
                    <p>Score of {username}: {score}</p>
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

export default TwitterPage;