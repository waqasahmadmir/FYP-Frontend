import React from "react";
import { Badge, Card } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./ProductPreview.css";

function ProductPreview({
  _id,
  productcategory,
  productname,
  image,
  productprice,
}) {
  return (
    <LinkContainer
      to={`/product/${_id}`}
      style={{ cursor: "pointer", width: "200px", margin: "30px" }}
    >
      <Card style={{ width: "20rem", margin: "10px" }}>
        <Card.Img
          variant="top"
          className="product-preview-img"
          src={image}
          style={{ height: "150px", objectFit: "cover", marginRight: "100px" }}
        />

        <Card.Body>
          <Card.Title>{productname}</Card.Title>
          <>
            <div className="mydiv">
              {"$" + productprice + "  "}
              {productcategory}
            </div>
          </>
        </Card.Body>
      </Card>
    </LinkContainer>
  );
}

export default ProductPreview;
