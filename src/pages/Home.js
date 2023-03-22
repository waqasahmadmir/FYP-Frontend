import axios from "../axios";
import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import categories from "../categories";
import "./Home.css";
import { useDispatch, useSelector } from "react-redux";
import { updateProducts } from "../features/productSlice";
import ProductPreview from "../components/ProductPreview";
import "./footer.css";

function Home() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const lastProducts = products.slice(0, 8);
  useEffect(() => {
    axios.get("/products").then(({ data }) => dispatch(updateProducts(data)));
  }, []);
  return (
    <div>
      <img
        src=" https://res.cloudinary.com/dcmlraewz/image/upload/v1678205650/Home_2_khp0sk.png"
        className="home-banner"
      />
      <div className="featured-products-container container mt-4">
        <h1 className="h1">Latest Products</h1>
        {/* last products here */}
        <div className="d-flex justify-content-center flex-wrap">
          {lastProducts.map((product) => (
            <ProductPreview {...product} />
          ))}
        </div>
        <div>
          <Link
            to="/category/all"
            style={{
              textAlign: "right",
              display: "block",
              textDecoration: "none",
            }}
          >
            See more {">>"}
          </Link>
        </div>
      </div>
      {/* sale banner */}
      <div className="sale__banner--container mt-4">
        <img src="https://res.cloudinary.com/learn-code-10/image/upload/v1654093280/xkia6f13xxlk5xvvb5ed.png" />
      </div>
      <div className="recent-products-container container mt-4">
        <h2 className="h2">Famous Categories</h2>
        <Row>
          {categories.map((category) => (
            <LinkContainer
              to={`/category/${category.name.toLocaleLowerCase()}`}
            >
              <Col md={4}>
                <div
                  style={{
                    backgroundImage: `url(${category.img})`,
                  }}
                  className="category-tile"
                >
                  <div>
                    <h3>{category.name}</h3>
                    <p>{category.description}</p>
                  </div>
                </div>
              </Col>
            </LinkContainer>
          ))}
        </Row>
      </div>
      <footer>
        <div className="footer_container">
          <div className="footr_details_one">
            <h3>Get To Know Us</h3>
            <p>About Us</p>
            <p>Contact us</p>
            <p>Careers</p>
          </div>

          <div className="footr_details_one">
            <h3>Contact With Us</h3>
            <p>Twitter</p>
            <p>Instagram</p>
            <p>Facebook</p>
          </div>

          <div className="footr_details_one forres">
            <h3>Make Money With Us</h3>
            <p>Twitter</p>
            <p>Instagram</p>
            <p>Facebook</p>
          </div>

          <div className="footr_details_one forres">
            <h3>Make Money With Us</h3>
            <p>Twitter</p>
            <p>Instagram</p>
            <p>Facebook</p>
          </div>
        </div>

        <div className="lastdetails">
          <p>© Stock Logistics. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
