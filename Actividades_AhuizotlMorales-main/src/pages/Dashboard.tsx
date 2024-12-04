import React, { useState } from 'react';
import { Line, Radar, Scatter, Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    ArcElement,
    RadialLinearScale,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale, ArcElement, RadialLinearScale, ChartDataLabels);

const Dashboard = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (event) => {
        event.preventDefault();
        if (email === 'ahui@gmail.com' && password === '123') {
            setIsLoggedIn(true);
        } else {
            alert('Credenciales incorrectas');
        }
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setEmail('');
        setPassword('');
    };

    const mostPurchasedData = {
        labels: ['Camisetas', 'Pantalones', 'Chaquetas', 'Zapatos', 'Accesorios'],
        datasets: [
            {
                label: 'Cantidad Vendida',
                data: [12, 19, 3, 5, 2],
                borderColor: 'rgba(54, 162, 235, 0.8)',
                backgroundColor: 'rgba(54, 162, 235, 0.3)',
                fill: true,
            },
        ],
    };

    const leastPurchasedData = {
        labels: ['Camisetas', 'Pantalones', 'Chaquetas', 'Zapatos', 'Accesorios'],
        datasets: [
            {
                label: 'Cantidad Vendida',
                data: [1, 2, 3, 0, 0],
                backgroundColor: 'rgba(255, 159, 64, 0.3)',
                borderColor: 'rgba(255, 159, 64, 1)',
            },
        ],
    };

    const priceData = {
        datasets: [
            {
                label: 'Precio',
                data: [
                    { x: 15, y: 10 },
                    { x: 30, y: 15 },
                    { x: 45, y: 20 },
                    { x: 50, y: 30 },
                    { x: 10, y: 5 },
                ],
                backgroundColor: 'rgba(75, 192, 192, 0.8)',
            },
        ],
    };

    const productionData = {
        labels: ['Lote A', 'Lote B', 'Lote C', 'Lote D'],
        datasets: [
            {
                label: 'Producción de Lotes',
                data: [20, 30, 25, 15],
                backgroundColor: [
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 159, 64, 0.6)',
                    'rgba(255, 205, 86, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 205, 86, 1)',
                    'rgba(153, 102, 255, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const salesData = {
        labels: ['Ganancias de Lote A', 'Ganancias de Lote B', 'Ganancias de Lote C', 'Ganancias de Lote D'],
        datasets: [
            {
                label: 'Ganancias por Ventas',
                data: [1500, 2500, 2000, 1200],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(201, 203, 207, 0.6)',
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(201, 203, 207, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const getPercentage = (value, total) => {
        return ((value / total) * 100).toFixed(2) + '%';
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Análisis de Ropa',
            },
            datalabels: {
                color: '#fff',
                formatter: (value, context) => {
                    const total = context.chart.data.datasets[context.datasetIndex].data.reduce((acc, val) => acc + val, 0);
                    return getPercentage(value, total);
                },
            },
        },
    };

    if (!isLoggedIn) {
        return (
            <div className="login-container">
                <div className="login-box">
                    <h2>Iniciar Sesión</h2>
                    <form onSubmit={handleLogin}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Correo Electrónico</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Contraseña</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Iniciar Sesión</button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="dashboard">
            <h1>Dashboard</h1>
            <button onClick={handleLogout} className="btn btn-secondary">Cerrar Sesión</button>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '20px',
                marginTop: '20px'
            }}>
                <div>
                    <h2>Ropa Más Comprada</h2>
                    <Line data={mostPurchasedData} options={options} />
                </div>
                <div>
                    <h2>Ropa Menos Comprada</h2>
                    <Radar data={leastPurchasedData} options={options} />
                </div>
                <div>
                    <h2>Precios de Ropa</h2>
                    <Scatter data={priceData} options={options} />
                </div>
            </div>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '20px',
                gap: '20px',
            }}>
                <div style={{ width: '300px', height: '300px' }}>
                    <h2>Producción de Lotes</h2>
                    <Pie data={productionData} options={{
                        responsive: true,
                        plugins: {
                            datalabels: {
                                color: '#fff',
                                formatter: (value, context) => {
                                    const total = context.chart.data.datasets[context.datasetIndex].data.reduce((acc, val) => acc + val, 0);
                                    return getPercentage(value, total);
                                },
                            },
                        },
                    }} />
                </div>
                <div style={{ width: '300px', height: '300px' }}>
                    <h2>Ganancias por Ventas</h2>
                    <Pie data={salesData} options={{
                        responsive: true,
                        plugins: {
                            datalabels: {
                                color: '#fff',
                                formatter: (value, context) => {
                                    const total = context.chart.data.datasets[context.datasetIndex].data.reduce((acc, val) => acc + val, 0);
                                    return getPercentage(value, total);
                                },
                            },
                        },
                    }} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;