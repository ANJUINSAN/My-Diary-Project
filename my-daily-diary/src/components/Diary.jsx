import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/diary.css';
import profileImage from '../images/hide.png';
import DatePicker from 'react-datepicker';

export default function Diary() {
  const { id } = useParams();
  const [entry, setEntry] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [existingEntry, setExistingEntry] = useState(null);
  const navigate = useNavigate();
  const username = localStorage.getItem('username') || 'Username';
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchEntry = async () => {
      if (id && id !== 'new') {
        try {
          const response = await axios.get(`/api/diary/${id}`, {
            headers: {
              'Cache-Control': 'no-cache',
              'Authorization': `Bearer ${token}`
            }
          });
          setEntry(response.data.content);
          setSelectedDate(new Date(response.data.date));
        } catch (error) {
          setError('Error fetching diary entry.');
          console.error('Error fetching entry:', error);
        }
      } else if (id === 'new') {
        // Handle new entry case
        setSelectedDate(new Date());
      }
      setLoading(false);
    };

    fetchEntry();
  }, [id, token]);

  useEffect(() => {
    const checkExistingEntry = async () => {
      try {
        const formattedDate = selectedDate.toISOString().split('T')[0]; // Format as YYYY-MM-DD
        const response = await axios.get(`/api/diary/date/${formattedDate}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setExistingEntry(response.data);
      } catch (error) {
        if (error.response && error.response.status !== 404) {
          setError('Error checking for existing entry.');
          console.error('Error checking for entry:', error);
        }
      }
    };

    if (!id || id === 'new') {
      checkExistingEntry();
    }
  }, [selectedDate, id, token]);

  const handleEntryChange = (e) => setEntry(e.target.value);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      if (id === 'new') {
        if (existingEntry) {
          if (window.confirm('An entry already exists for this date. Do you want to view it instead?')) {
            navigate(`/diary/${existingEntry._id}`);
            return;
          }
        }
        await axios.post('/api/diary', {
          date: selectedDate.toISOString(),
          content: entry,
        }, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
      } else {
        await axios.put(`/api/diary/${id}`, {
          date: selectedDate.toISOString(),
          content: entry,
        }, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
      }
      navigate('/entries');
    } catch (error) {
      if (error.response) {
        setError(`Error saving diary entry: ${error.response.data.message || error.message}`);
      } else {
        setError('Error saving diary entry.');
      }
      console.error('Error saving entry:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="diary">
      <div className="header">
        <img src={profileImage} alt="Profile" className="profile-pic" />
        <div className="username">{username}</div>
      </div>
      <div className="content">
        <div className="diary-entry">
          <div className="dateseter">
            <h3>{id === 'new' ? 'New Diary Entry' : 'Edit Diary Entry'}</h3>
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              className="date-picker"
              dateFormat="MMMM d, yyyy"
            />
          </div>
          <textarea
            value={entry}
            onChange={handleEntryChange}
            className="entry-textarea"
            placeholder="Write your diary entry here..."
          />
        </div>
        <button type="submit" className="save-button" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
}
