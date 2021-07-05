import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Row, Col, Image, ListGroup, Button, Card, Form } from 'react-bootstrap'
import Rating from '../../components/Rating'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
// import { listProductDetails } from '../../actions/productActions';

const ProductPage = ({ product }) => {
  // const [products, setProducts] = useState(data)

  const router = useRouter()
  const { id } = router.query
  // const product = data.filter((p) => p._id === router.query.id)[0]

  // const [product, setProduct] = useState([])

  // const [qty, setQty] = useState(1);
  // const dispatch = useDispatch();
  // const productDetails = useSelector(state => state.productDetails);
  // const { loading, error, product } = productDetails;

  // useEffect(() => {
  //   dispatch(listProductDetails(id));
  // }, [dispatch, match]);

  // const addToCartHandler = e => {
  //   e.preventDefault();
  //   router.push(`/cart/${id}?qty=${qty}`);
  // };
  return (
    <>
      <Link href='/'>
        <a className='btn btn-light my-3'>Go Back</a>
      </Link>
      <h1>{product.name}</h1>
      <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={3}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
                color='#f8e825'
              />
            </ListGroup.Item>
            <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
            <ListGroup.Item>Description: {product.description}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <Row>
                  <Col>Price</Col>
                  <Col>
                    <strong>${product.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status</Col>
                  <Col>
                    {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Button
                  className='btn'
                  disabled={product.countInStock === 0}
                  type='button'
                >
                  Add to cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
      )
    </>
  )
}

export default ProductPage

export async function getStaticProps({ params: { id } }) {
  const res = await fetch(`http://localhost:3000/api/products/${id}`)
  const product = await res.json()
  return {
    props: {
      product,
    },
  }
}

export async function getStaticPaths() {
  const res = await fetch(`http://localhost:3000/api/products`)
  const data = await res.json()
  const paths = data.map((p) => ({
    params: {
      id: p._id,
    },
  }))

  return {
    paths,
    fallback: false,
  }
}
