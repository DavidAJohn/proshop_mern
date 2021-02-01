import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import StarRatings from "react-star-ratings";

const Product = ({ product }) => {
    return (
        <Card className='my-3 p-3 rounded'>
            <Link to={`/product/${product._id}`}>
                <Card.Img src={product.image} variant='top' />
            </Link>
            <Card.Body>
                <Link to={`/product/${product._id}`}>
                    <Card.Title as='div'><strong>{product.name}</strong></Card.Title>
                </Link>
                <Card.Text as='div'>
                <StarRatings
                    rating={product.rating}
                    starDimension="1rem"
                    starSpacing=".05rem"
                    starRatedColor="rgb(255, 180, 3)"
                />
                <div className='my-1'>({product.numReviews} {product.numReviews === 1 ? 'review' : 'reviews'})</div>
                </Card.Text>
                <Card.Text as='h3' className='mt-3'>
                    £{product.price}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Product
