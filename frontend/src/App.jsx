import { useState } from 'react';
import axios from 'axios';

const App = () => {
    const [username, setUsername] = useState('');
    const [score, setScore] = useState(null);
    const [comment, setComment] = useState(null);

    const handleFetchScore = async () => {
        if (username === '') {
            alert('Please enter a valid username');
        } else {
            try {
                // Make an API request to fetch the score
                const response = await axios.get(`api/get_user_score/${username}`);

                // Check if the request was successful
                if (response.status === 200) {
                    setScore(response.data.score);
                }
            } catch (error) {
                alert('Error fetching score. Check username and try again');
                console.error('Error fetching score:', error);
            }
        }
    };

    const handleComments = async () => {
        try {
            // Make an API request to fetch the score
            const response = await axios.get(`api/get_user_comments/${username}`);

            // Check if the request was successful
            if (response.status === 200) {
                setComment(response.data.comment);
            }
        } catch (error) {
            alert('Error fetching score. Check username and try again');
            console.error('Error fetching score:', error);
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
            <h1>Instagram Comments Sentiment Analyzer</h1>
            <div style={{ margin: '20px' }}>
                <label htmlFor="username">Enter Instagram Username: </label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            {score !== null && (
                <div style={{ margin: '20px' }}>
                    <p>Score of the {username}: {score}</p>
                </div>
            )}
            <div style={{ margin: '20px' }}>
                <button onClick={handleFetchScore}>Show Score</button>
            </div>
            {score !== null && (
                <div style={{ margin: '20px' }}>
                    <p>Comments by {username}: {comment}</p>
                </div>
            )}
            <div style={{ margin: '20px' }}>
                <button onClick={handleComments}>Show Comments</button>
            </div>
        </div>
    );
};

export default App;
