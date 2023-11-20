import { useState } from 'react';
import axios from 'axios';
import { Chart } from 'react-google-charts';

const InstagramPage = () => {
  const [username, setUsername] = useState('');
  const [score, setScore] = useState(null);
  const [pos_score, setPos_score] = useState(null);
  const [neg_score, setNeg_score] = useState(null);
  const [neu_score, setNeu_score] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [dataFetched, setDataFetched] = useState(false);

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
        setPos_score(response.data.pos_score);
        setNeg_score(response.data.neg_score);
        setNeu_score(response.data.neu_score);
        setDataFetched(true);
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
        fontFamily: 'Arial, sans-serif',
      }}>
      <h1 style={{ marginBottom: '5px' }}>Instagram Comments & Captions Sentiment Analyzer</h1>

      {dataFetched ? (
        <>
          {message !== '' && <p style={{ margin: '10px', color: '#333' }}>{message}</p>}
          {score !== null && (
            <p style={{ margin: '10px', color: '#333' }}>
              Score of {username} is: <b>{score}</b>
            </p>
          )}
          <div>
            <Chart
              chartType="PieChart"
              data={[
                ['Sentiment', 'Percentage'],
                ['Positive', pos_score],
                ['Negative', neg_score],
                ['Neutral', neu_score],
              ]}
              options={{
                title: 'Sentiment Analysis 3D Pie Chart',
                is3D: true,
                backgroundColor: 'transparent',
              }}
              width={'120%'}
              height={'500px'}
            />
          </div>
        </>
      ) : (
        <>
          <div style={{ margin: '20px' }}>
            <label htmlFor="username">Enter Instagram Username: </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="off"
              style={{ marginLeft: '10px', padding: '5px' }}
            />
          </div>

          {loading && <p style={{ margin: '10px', color: '#333' }}>Loading...</p>}

          <div style={{ margin: '10px' }}>
            <button
              onClick={handleFetchScore}
              disabled={loading}
              style={{
                padding: '10px',
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}>
              Show Profile Score
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default InstagramPage;
