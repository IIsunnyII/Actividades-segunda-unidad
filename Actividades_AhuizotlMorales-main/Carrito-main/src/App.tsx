import { useState } from "react";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import About from "./pages/About";
import RopaSucursalMap from "./pages/Map";
import Pokedex from "./pages/Pokedex";
import Dashboard from "./pages/Dashboard"; 
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

interface Product {
    id: number;
    title: string;
    price: number;
    image: string;
}

function App() {
    const [cart, setCart] = useState<Product[]>([]);
    const [showCart, setShowCart] = useState(false);
    const [showAbout, setShowAbout] = useState(false);
    const [showRopaSucursalMap, setShowRopaSucursalMap] = useState(false);
    const [showPokedex, setShowPokedex] = useState(false);
    const [showDashboard, setShowDashboard] = useState(false); 
    const [searchTerm, setSearchTerm] = useState("");

    const addToCart = (product: Product) => {
        setCart((prevCart) => [...prevCart, product]);
    };

    const removeFromCart = (index: number) => {
        setCart((prevCart) => prevCart.filter((_, i) => i !== index));
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container">
                    <a className="navbar-brand" href="#">Market Foro</a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item">
                                <a
                                    className={`nav-link ${!showCart && !showAbout && !showRopaSucursalMap && !showPokedex && !showDashboard ? "active" : ""}`}
                                    href="#"
                                    onClick={() => {
                                        setShowCart(false);
                                        setShowAbout(false);
                                        setShowRopaSucursalMap(false);
                                        setShowPokedex(false);
                                        setShowDashboard(false);
                                    }}
                                >
                                    Inicio
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className={`nav-link ${showCart ? "active" : ""}`}
                                    href="#"
                                    onClick={() => {
                                        setShowCart(true);
                                        setShowAbout(false);
                                        setShowRopaSucursalMap(false);
                                        setShowPokedex(false);
                                        setShowDashboard(false);
                                    }}
                                >
                                    Carrito ({cart.length})
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className={`nav-link ${showAbout ? "active" : ""}`}
                                    href="#"
                                    onClick={() => {
                                        setShowCart(false);
                                        setShowAbout(true);
                                        setShowRopaSucursalMap(false);
                                        setShowPokedex(false);
                                        setShowDashboard(false);
                                    }}
                                >
                                    Sobre Nosotros
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className={`nav-link ${showRopaSucursalMap ? "active" : ""}`}
                                    href="#"
                                    onClick={() => {
                                        setShowCart(false);
                                        setShowAbout(false);
                                        setShowRopaSucursalMap(true);
                                        setShowPokedex(false);
                                        setShowDashboard(false);
                                    }}
                                >
                                    Mapa de Sucursales
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className={`nav-link ${showPokedex ? "active" : ""}`}
                                    href="#"
                                    onClick={() => {
                                        setShowCart(false);
                                        setShowAbout(false);
                                        setShowRopaSucursalMap(false);
                                        setShowPokedex(true);
                                        setShowDashboard(false);
                                    }}
                                >
                                    Pokédex
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className={`nav-link ${showDashboard ? "active" : ""}`}
                                    href="#"
                                    onClick={() => {
                                        setShowCart(false);
                                        setShowAbout(false);
                                        setShowRopaSucursalMap(false);
                                        setShowPokedex(false);
                                        setShowDashboard(true);
                                    }}
                                >
                                    Dashboard
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <div className="container mt-4" style={{ position: 'relative', height: '500px' }}>
                {showCart ? (
                    <Cart cart={cart} removeFromCart={removeFromCart} />
                ) : showAbout ? (
                    <About />
                ) : showRopaSucursalMap ? (
                    <RopaSucursalMap />
                ) : showPokedex ? (
                    <Pokedex />
                ) : showDashboard ? (
                    <Dashboard />
                ) : (
                    <Home addToCart={addToCart} searchTerm={searchTerm} />
                )}
            </div>
        </div>
    );
}

export default App;