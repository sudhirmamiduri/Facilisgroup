import React from 'react'
import { ProductType } from '../../types'


export const ProductDetails: React.FC<ProductType> = (props) => {
    return (
        <div className='item-detail-container' style={{display: 'flex', maxWidth: '45rem', gap: '1rem', fontFamily: "'Muli', sans-serif"}}>
            <div>
                <img src={props.image} alt={props.name} />
            </div>
            <div style={{display: 'flex', flexDirection: 'column', gap: '.5rem'}}>
                <div><span><b>{props.name}</b></span></div>
                <div><p>{props.desc}</p></div>
                <div><span style={{fontSize: '18px', fontWeight: 'bold'}}>$ {props.price}</span></div>
                <div><code>Supplier: {props.supplierName}</code></div>
            </div>
        </div>
    )
}
