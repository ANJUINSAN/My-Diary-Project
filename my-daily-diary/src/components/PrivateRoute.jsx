import React from 'react';
import { Navigate } from 'react-router-dom';

const withPrivateRoute = (Component) => {
  return (props) => {
    const token = localStorage.getItem('token');
    if (!token) {
      return <Navigate to="/login" />;
    }
    return <Component {...props} />;
  };
};

export default withPrivateRoute;



// import React, { useState, useEffect, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import '../styles/entryList.css';

// export default function EntryList() {
//   const [entries, setEntries] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1); // Start with the first page
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();
//   const entriesListRef = useRef(null);

//   useEffect(() => {
//     const fetchEntries = async () => {
//       try {
//         const response = await axios.get('/api/diary');
//         setEntries(response.data);
//         setCurrentPage(1); // Reset to first page whenever entries are fetched
//       } catch (error) {
//         console.error('Error fetching diary entries:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchEntries();
//   }, []);

//   useEffect(() => {
//     if (entriesListRef.current) {
//       entriesListRef.current.style.height = entries.length > 5 ? 'auto' : '70vh';
//     }
//   }, [entries]);

//   // Group entries by month and year
//   const groupEntriesByMonth = (entries) => {
//     const grouped = {};
//     entries.forEach(entry => {
//       const date = new Date(entry.date);
//       const key = ${date.getFullYear()}-${date.getMonth() + 1};
//       if (!grouped[key]) grouped[key] = [];
//       grouped[key].push(entry);
//     });
//     return grouped;
//   };

//   const groupedEntries = groupEntriesByMonth(entries);
//   const sortedMonths = Object.keys(groupedEntries).sort((a, b) => new Date(b) - new Date(a));

//   // Get current month's key
//   const currentMonthKey = ${new Date().getFullYear()}-${new Date().getMonth() + 1};

//   // Get entries for the current page
//   const getCurrentMonthEntries = () => {
//     return groupedEntries[sortedMonths[currentPage - 1]] || [];
//   };

//   const currentEntries = getCurrentMonthEntries();

//   const handleEntryClick = (id) => {
//     navigate(/diary/${id});
//   };

//   const handleAddEntry = () => {
//     navigate('/diary');
//   };

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   return (
//     <div className="entries-list" ref={entriesListRef}>
//       <h1>Diary Entries</h1>
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <div className="entries-container">
//           {currentEntries.length === 0 ? (
//             <p>No entries found.</p>
//           ) : (
//             currentEntries.map(entry => (
//               <div key={entry._id} className="entry-card" onClick={() => handleEntryClick(entry._id)}>
//                 <h3>{new Date(entry.date).toLocaleDateString()}</h3>
//                 <p>{entry.content.length > 50 ? ${entry.content.slice(0, 50)}... : entry.content}</p>
//               </div>
//             ))
//           )}
//         </div>
//       )}
//       {!loading && sortedMonths.length > 1 && (
//         <div className="pagination">
//           {sortedMonths.map((month, index) => (
//             <button
//               key={index + 1}
//               onClick={() => paginate(index + 1)}
//               className="page-button"
//               style={{ fontWeight: currentPage === index + 1 ? 'bold' : 'normal' }}
//             >
//               {index + 1}
//             </button>
//           ))}
//         </div>
//       )}
//       <button onClick={handleAddEntry} className="add-entry-button">
//         Add New Entry
//       </button>
//     </div>
//   );
