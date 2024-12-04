import { useEffect, useState } from "react";

interface Product {
    id: number;
    title: string;
    price: number;
    image: string;
}

interface HomeProps {
    addToCart: (product: Product) => void;
    searchTerm: string; 
}

function Home({ addToCart, searchTerm }: HomeProps) {
    const [data, setData] = useState<Product[]>([]);

    const getProducts = async () => {
        const response = await fetch("https://fakestoreapi.com/products/");
        const json: Product[] = await response.json();
        setData(json);
    };

    useEffect(() => {
        getProducts();
    }, []);

    const filteredData = data.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container mt-4">
            <h2 className="mb-4 text-center">Productos Destacados</h2>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
                {filteredData.length > 0 ? (
                    filteredData.map((product) => (
                        <div key={product.id} className="col">
                            <div className="card h-100 shadow-sm">
                                <img
                                    src={product.image}
                                    className="card-img-top"
                                    alt={product.title}
                                    style={{ height: "250px", objectFit: "cover" }}
                                />
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title">{product.title}</h5>
                                    <p className="card-text" style={{ color: "black" }}>
                                        Producto en venta
                                    </p>
                                    <div className="mt-auto">
                                        <p className="card-text fw-bold" style={{ color: "green" }}>
                                            $ {product.price}
                                        </p>
                                        <button
                                            className="btn"
                                            style={{ backgroundColor: "#28a745", color: "#fff" }}
                                            onClick={() => addToCart(product)}
                                        >
                                            Agregar al Carrito
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col">
                        <p className="text-center">No se encontraron productos.</p>
                    </div>
                )}
            </div>

            {/* Pie de página */}
            <footer className="footer bg-dark text-light py-3 mt-3">
                <div className="container text-center">
                    <p>&copy; 2024 Sunny store. Todos los derechos reservados.</p>
                </div>
            </footer>
        </div>
    );
}

export default Home;
