import { useState } from 'react';
import axios from 'axios';

const App = () => {
    const [username, setUsername] = useState('');
    const [score, setScore] = useState(null);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleFetchScore = async () => {
        if (username === '') {
            alert('Please enter a valid username');
            return;
        }

        try {
            setLoading(true);
            // alert("Connection established with server")
            // API endpoint for fetching user score
            const response = await axios.get(`http://localhost:8000/api/get_user_score/${username}/`);

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

    const handleFetchComments = async () => {
        if (username === '') {
            alert('Please enter a valid username');
            return;
        }

        try {
            setLoading(true);
            // alert("Connection established with server")
            // API endpoint for fetching user comments
            const response = await axios.get(`http://localhost:8000/api/get_user_comments/${username}/`);

            // Check if the request was successful
            if (response.status === 200) {
                setComments(response.data.comment);
            }
        } catch (error) {
            alert('Error fetching comments. Check username and try again');
            console.error('Error fetching comments:', error);
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

            {loading && <p>Loading...</p>}

            {score !== null && (
                <div style={{ margin: '20px' }}>
                    <p>Score of {username}: {score}</p>
                </div>
            )}

            <div style={{ margin: '20px' }}>
                <button onClick={handleFetchScore} disabled={loading}>
                    Show Score
                </button>
            </div>

            {comments.length > 0 && (
                <div style={{ margin: '20px' }}>
                    <p>Comments by {username}:</p>
                    <ul>
                        {comments.map((comment, index) => (
                            <li key={index}>{comment}</li>
                        ))}
                    </ul>
                </div>
            )}

            <div style={{ margin: '20px' }}>
                <button onClick={handleFetchComments} disabled={loading}>
                    Show Comments
                </button>
            </div>
        </div>
    );
};

export default App;