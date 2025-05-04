from flask import Flask, jsonify
import pandas as pd

app = Flask(__name__)

# Load data
df = pd.read_csv('brent_prices.csv')
df['Date'] = pd.to_datetime(df['Date'], format='%d-%b-%y')

@app.route('/api/prices')
def get_prices():
    return jsonify({
        'dates': df['Date'].dt.strftime('%Y-%m-%d').tolist(),
        'prices': df['Price'].tolist()
    })

@app.route('/api/stats')
def get_stats():
    return jsonify({
        'mean': df['Price'].mean(),
        'median': df['Price'].median(),
        'min': df['Price'].min(),
        'max': df['Price'].max(),
        'std': df['Price'].std()
    })

if __name__ == '__main__':
    app.run(debug=True)