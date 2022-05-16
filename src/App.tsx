
import React from 'react'
import Pagination from 'react-responsive-pagination';
import { Product } from './components/Product'
import { ProductDetails } from './components/ProductDetails'
import { ProductType } from './types'


export const App: React.FC<{}> = () => {
    const [products, setProducts] = React.useState<Array<ProductType>>([])
    const [selectedProduct, setSelectedProduct] = React.useState<ProductType>()
    const dialogRef = React.useRef(null)
    const [currentPage, setCurrentPage] = React.useState(1)

    const itemPerPage = 20
    React.useEffect(() => {
        fetch('/public/data/products.json')
        .then(res => res.json())
        .then((data: Array<ProductType>) => setProducts(data))
    }, [])

    const onItemSelectionChange = (product: ProductType) => {
        // console.log(product)
        setSelectedProduct(product)
        if(dialogRef && dialogRef.current) {
            console.log(dialogRef.current);
            (dialogRef.current as any).showModal()
        }
    }

    return (
        <>
            <div className="app-header">
                <img src="https://static.ateasesystems.net/images/facilis-logo.png" />
            </div>
            <div className="app-body">
                
                <div className="products-container">
                    <Pagination
                        current={currentPage}
                        total={products.length / itemPerPage}
                        onPageChange={setCurrentPage}
                    />
                    <div id="products" className="products">
                        {
                            products.slice(itemPerPage*currentPage - itemPerPage, Math.min(itemPerPage*currentPage, products.length)).map(x => <Product key={x.id} {...x} onClick={onItemSelectionChange} />)
                        }
                    </div>
                    <Pagination
                        current={currentPage}
                        total={products.length / itemPerPage}
                        onPageChange={setCurrentPage}
                    />
                </div>
            </div>
            <dialog ref={dialogRef} style={{border: 'none', padding: '0', boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)', borderRadius: '8px'}}>
                <header style={{borderBottom: '1px solid whitesmoke', padding: '.5rem'}}>
                    <form method="dialog">
                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                            <span style={{fontSize: 'large'}}>Product Details</span>
                            <button style={{ borderRadius: '50%', border: 'none', color: 'white', backgroundColor: '#e55233', width: '1.5rem', height: '1.5rem', cursor: 'pointer'}} value="cancel">X</button>
                        </div>
                    </form>
                </header>
                <section style={{padding: '.5rem'}}>
                    {selectedProduct ? <ProductDetails {...selectedProduct} /> : null}
                </section>
                <footer></footer>
            </dialog>
        </>
                        
    )
}
