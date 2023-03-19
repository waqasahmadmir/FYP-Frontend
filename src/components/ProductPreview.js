import React from "react";
import { Badge, Card } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

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
      style={{ cursor: "pointer", width: "13rem", margin: "10px" }}
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
            <Badge bg="warning" text="dark">
              {productcategory}
            </Badge>

            <Badge bg="warning" text="dark">
              {productprice}
            </Badge>
          </>
        </Card.Body>
      </Card>
    </LinkContainer>
  );
}

export default ProductPreview;
