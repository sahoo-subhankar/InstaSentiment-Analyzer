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
  const [email, setEmail] = useState('');
  const [email_message, setEmail_message] = useState('');
  const [scoreHistory, setScoreHistory] = useState([]);

  const handleFetchScore = async () => {
    if (username === '' | email === '') {
      alert('Please fill up all the inputs');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(`http://127.0.0.1:8000/api/get_user_score_instagram/${username}/${email}`);

      if (response.status === 200) {
        setScore(response.data.score);
        setMessage(response.data.message);
        setEmail_message(response.data.email_message);
        setPos_score(response.data.pos_score);
        setNeg_score(response.data.neg_score);
        setNeu_score(response.data.neu_score);
        setScoreHistory(response.data.score_history);
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
          {message !== '' && email_message !== '' && <p style={{ margin: '10px', color: '#333' }}>{message} & {email_message}</p>}
          {score !== null && (
            <p style={{ margin: '10px', color: '#333' }}>
              Score of {username} is: <b>{score}</b>
            </p>
          )}
          <div style={{
            display: 'flex',
            flexDirection: 'row',
          }}>
            <div>
              <Chart
                chartType="PieChart"
                data={[
                  ['Sentiment', 'Percentage'],
                  ['Positive Words', pos_score],
                  ['Negative Words', neg_score],
                  ['Neutral Words', neu_score],
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

            <div style={{ flex: 1 }}>
              <Chart
                chartType="LineChart"
                data={[
                  ["Timestamp", "Score"],
                  ...scoreHistory.map(entry => [new Date(entry.timestamp).toLocaleString(), entry.score])
                ]}
                options={{
                  title: 'Profile Score Update Line Chart',
                  hAxis: {
                    title: "Timestamp",
                  },
                  vAxis: {
                    title: "Score",
                  },
                  series: {
                    1: { curveType: "function" },
                  },
                  is3D: true,
                  backgroundColor: 'transparent',
                }}
                width="100%"
                height="400px"
              />
            </div>
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

          <div style={{ margin: '20px' }}>
            <label htmlFor="email">Enter Your Email Address: </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
