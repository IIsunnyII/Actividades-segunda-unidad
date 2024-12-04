import React, { useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
    ArcElement,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, ArcElement, ChartDataLabels);

const Dashboard = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (event: React.FormEvent) => {
        event.preventDefault();
        // Aquí puedes agregar lógica de autenticación real (como verificar contra una API)
        if (email === 'user@example.com' && password === 'password') { // Ejemplo de credenciales
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

    // Datos de ejemplo para las gráficas
    const mostPurchasedData = {
        labels: ['Camisetas', 'Pantalones', 'Chaquetas', 'Zapatos', 'Accesorios'],
        datasets: [
            {
                label: 'Cantidad Vendida',
                data: [12, 19, 3, 5, 2],
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const leastPurchasedData = {
        labels: ['Camisetas', 'Pantalones', 'Chaquetas', 'Zapatos', 'Accesorios'],
        datasets: [
            {
                label: 'Cantidad Vendida',
                data: [1, 2, 3, 0, 0], // Ejemplo de datos para menos comprados
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
            },
        ],
    };

    const priceData = {
        labels: ['Camisetas', 'Pantalones', 'Chaquetas', 'Zapatos', 'Accesorios'],
        datasets: [
            {
                label: 'Precio',
                data: [15, 30, 45, 50, 10], // Precios de ejemplo
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
            },
        ],
    };

    // Datos para gráficos de pastel
    const productionData = {
        labels: ['Lote A', 'Lote B', 'Lote C', 'Lote D'],
        datasets: [
            {
                label: 'Producción de Lotes',
                data: [20, 30, 25, 15], // Ejemplo de datos de producción
                backgroundColor: [
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 99, 132, 0.6)',
                ],
                borderColor: [
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 99, 132, 1)',
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
                data: [1500, 2500, 2000, 1200], // Ejemplo de datos de ganancias
                backgroundColor: [
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 99, 132, 0.6)',
                ],
                borderColor: [
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 99, 132, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    // Función para calcular el porcentaje
    const getPercentage = (value: number, total: number) => {
        return ((value / total) * 100).toFixed(2) + '%'; // Calcular porcentaje
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Análisis de Ropa',
            },
            datalabels: {
                color: '#fff', // Color de las etiquetas
                formatter: (value: number, context: any) => {
                    const total = context.chart.data.datasets[context.datasetIndex].data.reduce((acc: number, val: number) => acc + val, 0);
                    return getPercentage(value, total); // Mostrar solo el porcentaje
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
                    <Bar data={mostPurchasedData} options={options} />
                </div>
                <div>
                    <h2>Ropa Menos Comprada</h2>
                    <Bar data={leastPurchasedData} options={options} />
                </div>
                <div>
                    <h2>Precios de Ropa</h2>
                    <Bar data={priceData} options={options} />
                </div>
            </div>
            <div style={{
                display: 'flex',
                justifyContent: 'center', // Centra los gráficos de pastel
                marginTop: '20px',
                gap: '20px', // Espacio entre gráficos
            }}>
                <div style={{ width: '300px', height: '300px' }}>
                    <h2>Producción de Lotes</h2>
                    <Pie data={productionData} options={{
                        responsive: true,
                        plugins: {
                            datalabels: {
                                color: '#fff',
                                formatter: (value: number, context: any) => {
                                    const total = context.chart.data.datasets[context.datasetIndex].data.reduce((acc: number, val: number) => acc + val, 0);
                                    return getPercentage(value, total); // Mostrar solo el porcentaje
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
                                formatter: (value: number, context: any) => {
                                    const total = context.chart.data.datasets[context.datasetIndex].data.reduce((acc: number, val: number) => acc + val, 0);
                                    return getPercentage(value, total); // Mostrar solo el porcentaje
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