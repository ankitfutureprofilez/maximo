import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MaximoDataFetcher = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDataFromMaximo = async () => {
      try {
        const response = await axios.get('/maxrest/rest/mbo/workorder', {
          headers: {
            Authorization: `Bearer 1c773e5f-100e-4891-8c3f-5e32431d90ab`,
            'Content-Type': 'application/json',
          },
        });
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data from Maximo');
      }
    };

    fetchDataFromMaximo();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Maximo Data Fetcher</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {data.length > 0 ? (
        <ul>
          {data.map((item, index) => (
            <li key={index}>{item.description}</li> // Adjust according to your data structure
          ))}
        </ul>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default MaximoDataFetcher;
