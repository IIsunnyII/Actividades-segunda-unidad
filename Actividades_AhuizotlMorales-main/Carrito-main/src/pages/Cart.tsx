interface Product {
    id: number;
    title: string;
    price: number;
    image: string;
}

interface CartItem extends Product {
    quantity: number; 
}

interface CartProps {
    cart: Product[];
    removeFromCart: (index: number) => void; 
}

function Cart({ cart, removeFromCart }: CartProps) {
   
    const groupedCart: CartItem[] = Object.values(
        cart.reduce((acc: { [key: number]: CartItem }, product) => {
            if (!acc[product.id]) {
                acc[product.id] = { ...product, quantity: 1 };
            } else {
                acc[product.id].quantity += 1;
            }
            return acc;
        }, {})
    );

    const handleRemoveFromCart = (index: number) => {
        removeFromCart(index); 
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4 text-center">Carrito de Compras</h2>
            {groupedCart.length === 0 ? (
                <p className="text-center">No hay productos en el carrito.</p>
            ) : (
                <div className="row g-4 justify-content-center"> {/* Alineación central */}
                    {groupedCart.map((product, index) => (
                        <div key={product.id} className="col-12 col-md-6 col-lg-4"> {/* Responsive design */}
                            <div className="card h-100 shadow-sm">
                                <img
                                    src={product.image}
                                    className="card-img-top"
                                    alt={product.title}
                                    style={{ height: "150px", objectFit: "cover" }}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{product.title}</h5>
                                    <p className="card-text fw-bold">
                                        $ {product.price} x {product.quantity} = ${product.price * product.quantity}
                                    </p>
                                    <button
                                        className="btn btn-danger w-100"
                                        onClick={() => handleRemoveFromCart(index)} 
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Pie de página */}
            <footer className="footer bg-dark text-light py-3 mt-4">
                <div className="container text-center">
                    <p>&copy; 2024 Market Foro. Todos los derechos reservados.</p>
                </div>
            </footer>
        </div>
    );
}

export default Cart;