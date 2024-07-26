'use client';

import { useState } from 'react';

export default function CompareLists() {
  const [listA, setListA] = useState([]);
  const [listB, setListB] = useState([]);
  const [differences, setDifferences] = useState({ onlyInListA: [], onlyInListB: [] });

  const handleCompare = async () => {
    try {
      const response = await fetch('/api/compare', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ listA, listB }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('API Response:', data);
      if (data && Array.isArray(data.onlyInListA) && Array.isArray(data.onlyInListB)) {
        setDifferences(data);
      } else {
        throw new Error('Invalid data format');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleReset = () => {
    setListA([]);
    setListB([]);
    setDifferences({ onlyInListA: [], onlyInListB: [] });
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '2rem',
    maxWidth: '800px',
    margin: '2rem auto',
    borderRadius: '10px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#f9f9f9',
    border: '1px solid #ddd',
    boxSizing: 'border-box',
  };

  const headerStyle = {
    textAlign: 'center',
    marginBottom: '1rem',
  };

  const textareaStyle = {
    width: '100%',
    padding: '1rem',
    border: '1px solid #ddd',
    borderRadius: '8px',
    marginBottom: '1rem',
    resize: 'vertical',
    fontFamily: 'Arial, sans-serif',
    fontSize: '1rem',
    lineHeight: '1.5',
    backgroundColor: '#fff',
    color: '#333',
    boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.1)',
    boxSizing: 'border-box',
  };

  const buttonStyle = {
    padding: '0.75rem 2rem',
    border: 'none',
    borderRadius: '8px',
    backgroundColor: '#0070f3',
    color: '#ffffff',
    fontSize: '1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background-color 0.3s, transform 0.2s',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    marginRight: '1rem', // Add margin to separate from reset button
  };

  const buttonHoverStyle = {
    backgroundColor: '#005bb5',
    transform: 'scale(1.05)',
  };

  const resetButtonStyle = {
    padding: '0.75rem 2rem',
    border: 'none',
    borderRadius: '8px',
    backgroundColor: '#e0e0e0',
    color: '#333',
    fontSize: '1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background-color 0.3s, transform 0.2s',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    marginTop: '1rem', // Add margin-top to ensure spacing
  };

  const resetButtonHoverStyle = {
    backgroundColor: '#c0c0c0',
    transform: 'scale(1.05)',
  };

  const h2Style = {
    fontSize: '1.5rem',
    margin: '0.5rem 0',
    color: '#333',
    fontWeight: '600',
  };

  const ulStyle = {
    listStyle: 'none',
    padding: '0',
    margin: '0',
    width: '100%',
    maxHeight: '300px',
    overflowY: 'auto',
  };

  const liStyle = {
    padding: '1rem',
    borderBottom: '1px solid #ddd',
    backgroundColor: '#fff',
    color: '#333',
    borderRadius: '8px',
    marginBottom: '0.5rem',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
    transition: 'background-color 0.3s',
  };

  const liHoverStyle = {
    backgroundColor: '#f1f1f1',
  };

  return (
    <div style={containerStyle}>
      <header style={headerStyle}>
        <h2 style={h2Style}>Masukkan Daftar A</h2>
        <textarea
          style={textareaStyle}
          value={listA.join('\n')}
          onChange={(e) => setListA(e.target.value.split('\n'))}
          rows="5"
        />
        <h2 style={h2Style}>Masukkan Daftar B</h2>
        <textarea
          style={textareaStyle}
          value={listB.join('\n')}
          onChange={(e) => setListB(e.target.value.split('\n'))}
          rows="5"
        />
      </header>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <button
          style={buttonStyle}
          onMouseEnter={(e) => e.target.style.backgroundColor = buttonHoverStyle.backgroundColor}
          onMouseLeave={(e) => e.target.style.backgroundColor = buttonStyle.backgroundColor}
          onClick={handleCompare}
        >
          Bandingkan Daftar
        </button>
        <button
          style={resetButtonStyle}
          onMouseEnter={(e) => e.target.style.backgroundColor = resetButtonHoverStyle.backgroundColor}
          onMouseLeave={(e) => e.target.style.backgroundColor = resetButtonStyle.backgroundColor}
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
      <div style={{ marginTop: '2rem' }}>
        <h2 style={h2Style}>Hanya di Daftar A</h2>
        <ul style={ulStyle}>
          {(differences.onlyInListA || []).map((item, index) => (
            <li key={index} style={liStyle} onMouseEnter={(e) => e.target.style.backgroundColor = liHoverStyle.backgroundColor} onMouseLeave={(e) => e.target.style.backgroundColor = '#fff'}>
              {item}
            </li>
          ))}
        </ul>
        <h2 style={h2Style}>Hanya di Daftar B</h2>
        <ul style={ulStyle}>
          {(differences.onlyInListB || []).map((item, index) => (
            <li key={index} style={liStyle} onMouseEnter={(e) => e.target.style.backgroundColor = liHoverStyle.backgroundColor} onMouseLeave={(e) => e.target.style.backgroundColor = '#fff'}>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
