import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const PriceChart = () => {
    const [data, setData] = useState([]);
    const [startDate, setStartDate] = useState(new Date('1987-05-20'));
    const [endDate, setEndDate] = useState(new Date('2022-09-30'));
    
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/prices');
            const rawData = response.data.dates.map((date, i) => ({
                date,
                price: response.data.prices[i]
            }));
            setData(rawData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const filteredData = data.filter(item => {
        const itemDate = new Date(item.date);
        return itemDate >= startDate && itemDate <= endDate;
    });

    return (
        <div style={{ width: '100%', height: 500 }}>
            <h2>Brent Oil Price History</h2>
            <div style={{ marginBottom: 20 }}>
                <DatePicker
                    selected={startDate}
                    onChange={date => setStartDate(date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                />
                <DatePicker
                    selected={endDate}
                    onChange={date => setEndDate(date)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                />
            </div>
            <ResponsiveContainer width="100%" height="80%">
                <LineChart data={filteredData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                        dataKey="date"
                        tickFormatter={(date) => new Date(date).toLocaleDateString()}
                    />
                    <YAxis />
                    <Tooltip 
                        labelFormatter={(date) => new Date(date).toLocaleDateString()}
                        formatter={(value) => [`$${value}`, 'Price']}
                    />
                    <Legend />
                    <Line 
                        type="monotone" 
                        dataKey="price" 
                        stroke="#8884d8" 
                        activeDot={{ r: 8 }}
                        name="Price (USD)"
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default PriceChart;