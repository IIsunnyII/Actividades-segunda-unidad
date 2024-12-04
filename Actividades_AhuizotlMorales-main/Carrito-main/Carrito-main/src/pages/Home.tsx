import { useEffect, useState } from "react"

function Home() {
    const [data, setData] = useState([])  /// Este almacena los datos de la API

    // Función asíncrona que realiza una petición a una API y me devuelve un JSON
    const getProducts = async () => {
        const response = await fetch("https://fakestoreapi.com/products/")
        const json = await response.json()
        setData(json)
        console.log(json)
    }

    // detecta cuando algo cambia en la app e invoca a getProducts
    useEffect(() => {
        getProducts()
        console.log(data)
    }, [])

    return (
        <>
            <div className="container">
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                    {data.map((product)=>(
                    <div class="card mb-3" style={{ 'max-width': '540px;' }}>
                        <div className="row g-0">
                            <div className="col-md-4">
                                <img src={product.image} className="img-fluid rounded-start" alt="..." />
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                    <h5 className="card-title">{product.title}</h5>
                                    <p className="card-text">Descripción</p>
                                    <p className="card-text"><small className="text-body-secondary">$ {product.price}</small></p>
                                    <button className="btn btn-primary">Agregar a Carrito</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        </>

    )
}
export default Home