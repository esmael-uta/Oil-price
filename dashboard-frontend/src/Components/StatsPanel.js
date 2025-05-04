import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

const StatsPanel = () => {
    const [stats, setStats] = useState(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/stats');
                setStats(response.data);
            } catch (error) {
                console.error('Error fetching stats:', error);
            }
        };
        fetchStats();
    }, []);

    if (!stats) return <div>Loading statistics...</div>;

    return (
        <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '20px',
            padding: '20px',
            backgroundColor: '#f5f5f5',
            borderRadius: '8px',
            margin: '20px 0'
        }}>
            <div>
                <h3>Mean Price</h3>
                <p>${stats.mean.toFixed(2)}</p>
            </div>
            <div>
                <h3>Median Price</h3>
                <p>${stats.median.toFixed(2)}</p>
            </div>
            <div>
                <h3>Minimum Price</h3>
                <p>${stats.min.toFixed(2)}</p>
            </div>
            <div>
                <h3>Maximum Price</h3>
                <p>${stats.max.toFixed(2)}</p>
            </div>
            <div>
                <h3>Standard Deviation</h3>
                <p>${stats.std.toFixed(2)}</p>
            </div>
        </div>
    );
};

export default StatsPanel;