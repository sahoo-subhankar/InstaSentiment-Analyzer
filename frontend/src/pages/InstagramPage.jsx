import { useState } from 'react';
import axios from 'axios';
import { Chart } from 'react-google-charts';
import './style.css'; 

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

      <h1 style={{ marginBottom: '16px' }}><b>Instagram Comments & Captions Sentiment Analyzer</b></h1>

      {dataFetched ? (
        <>
          {message !== '' && email_message !== '' && <p style={{ margin: '10px', color: '#333' }}><b>{message}</b> & <b>{email_message}</b></p>}
          {score !== null && (
            <p style={{ margin: '10px', color: '#333' }}>
              calculated score of {username}: <b>{score}</b>
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
          <div style={{ margin: '10px' }}>
              <label htmlFor="username"><b>Enter Instagram Username: </b></label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="off"
              style={{ marginLeft: '10px', padding: '5px' }}
            />
          </div>

          <div style={{ margin: '10px' }}>
              <label htmlFor="email"><b>Enter Your Email Address: </b></label>
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
              <button className="btn_x" onClick={handleFetchScore} disabled={loading}>
              <svg height="24" width="24" fill="#FFFFFF" viewBox="0 0 24 24" data-name="Layer 1" id="Layer_1" className="sparkle">
                <path d="M10,21.236,6.755,14.745.264,11.5,6.755,8.255,10,1.764l3.245,6.491L19.736,11.5l-6.491,3.245ZM18,21l1.5,3L21,21l3-1.5L21,18l-1.5-3L18,18l-3,1.5ZM19.333,4.667,20.5,7l1.167-2.333L24,3.5,21.667,2.333,20.5,0,19.333,2.333,17,3.5Z"></path>
              </svg>
              <span className="text">Show Profile Score</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default InstagramPage;
