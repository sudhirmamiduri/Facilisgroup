import React from 'react'
import { ProductType } from '../../types'


export const Product: React.FC<ProductType & {onClick: (item: ProductType) => unknown}> = (props) => {
    return (
        <div className="product">
            <div className="product-image" onClick={() => props.onClick(props)}><img alt={props.name} src={props.image} /></div>
            <div className="product-name">{props.name}</div>
            <div className="product-price">{props.price}</div>
        </div>
    )
}
