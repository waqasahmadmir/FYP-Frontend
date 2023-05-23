import axios from "../axios";
import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import {
  Container,
  Row,
  Col,
  Badge,
  ButtonGroup,
  Form,
  Button,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import SimilarProduct from "../components/SimilarProduct";
import "./ProductPage.css";
import { LinkContainer } from "react-router-bootstrap";
import { useAddToCartMutation } from "../services/appApi";
import ToastMessage from "../components/ToastMessage";

function ProductPage() {
  const { id } = useParams();
  // console.log(id);
  const user = useSelector((state) => state.user);
  const [product, setProduct] = useState(null);
  const [similar, setSimilar] = useState(null);
  const [addToCart, { isSuccess }] = useAddToCartMutation();

  const handleDragStart = (e) => e.preventDefault();

  useEffect(() => {
    console.log("sacnansckjn");
    const fetchRecommendedProducts = async () => {
      try {
        console.log("yha sy call hoi");
        const { data: recommendedIds } = await axios.get(
          "http://127.0.0.1:5000/hello"
        );

        console.log("yha tk aya ha");
        const response = await fetch("http://localhost:8084/mypro", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ids: recommendedIds }),
        });

        const recommendedProducts = await response.json();
        if (response.ok) {
          recommendedProducts = await response.json();
          // Use the recommendedProducts data
        } else {
          console.error(
            "Error fetching recommended products:",
            response.status
          );
        }

        console.log("these are recommended products " + recommendedProducts);
        setSimilar(recommendedProducts);
      } catch (error) {
        console.error("Error fetching recommended products:", error);
      }
    };

    axios.get(`/products/${id}`).then(({ data }) => {
      setProduct(data.product);
    });

    fetchRecommendedProducts();
  }, [id]);

  if (!product) {
    return <Loading />;
  }

  const responsive = {
    0: { items: 1 },
    568: { items: 2 },
    1024: { items: 3 },
  };

  const similarProducts =
    similar &&
    similar.map((product, idx) => (
      <div className="item" data-value={idx} key={product._id}>
        <SimilarProduct {...product} />
      </div>
    ));

  return (
    <Container className="thisone" style={{ position: "relative" }}>
      <Row>
        <Col lg={6}>
          <AliceCarousel
            mouseTracking
            items={product.image}
            controlsStrategy="alternate"
            className="alice-carousel__wrapper"
            dotsDisabled={true}
            buttonsDisabled={true}
          >
            <img
              src={product.image}
              alt={product.title}
              style={{ width: "75%", height: "auto" }}
            />
          </AliceCarousel>
        </Col>
        <Col lg={6} className="pt-4">
          <h1 className="product-heading">{product.productname}</h1>
          <p>
            <Badge bg="primary">{product.productcategory}</Badge>
          </p>
          <p className="product__price">${product.productprice}</p>
          <p style={{ textAlign: "justify" }} className="py-3">
            <strong>Description:</strong> {product.productdescription}
          </p>
          {user && !user.isAdmin && (
            <ButtonGroup style={{ width: "90%" }}>
              <Form.Select
                size="lg"
                style={{ width: "40%", borderRadius: "0" }}
              >
                {[...Array(product.productquantity)].map((_, index) => (
                  <option key={index + 1} value={index + 1}>
                    {index + 1}
                  </option>
                ))}
              </Form.Select>
              <Button
                size="lg"
                onClick={() =>
                  addToCart({
                    userId: user._id,
                    productId: id,
                    productprice: product.productprice,
                    image: product.image,
                    productid: product._id,
                    productname: product.productname,
                    creator: product.creator,
                    productprice: product.productprice,
                    productcategory: product.productcategory,
                  })
                }
              >
                Add to cart
              </Button>
            </ButtonGroup>
          )}
          {user && user.isAdmin && (
            <LinkContainer to={`/product/${product._id}/edit`}>
              <Button size="lg">Edit Product</Button>
            </LinkContainer>
          )}
          {isSuccess && (
            <ToastMessage
              bg="info"
              title="Added to cart"
              body={`${product.productname} is in your cart`}
            />
          )}
        </Col>
      </Row>
      <div className="my-4">
        <h2 className="h2">Similar Products</h2>
        <div className="d-flex justify-content-center align-items-center flex-wrap">
          {similarProducts ? (
            <AliceCarousel
              mouseTracking
              items={similarProducts}
              responsive={responsive}
              controlsStrategy="alternate"
            />
          ) : (
            <p>No similar products found.</p>
          )}
        </div>
      </div>
    </Container>
  );
}

export default ProductPage;
