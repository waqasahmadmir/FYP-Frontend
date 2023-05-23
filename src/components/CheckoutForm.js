import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCreateOrderMutation } from "../services/appApi";
import "./CheckoutForm.css";

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const user = useSelector((state) => state.user);
  const products = useSelector((state) => state.products);
  const navigate = useNavigate();
  const [alertMessage, setAlertMessage] = useState("");
  const [createOrder, { isLoading, isError, isSuccess }] =
    useCreateOrderMutation();

  const [buyershippingaddress, setAddress] = useState("");
  const [paying, setPaying] = useState(false);
  const [buyername, setbuyername] = useState("");
  const [buyeremail, setbuyeremail] = useState(false);

  async function handlePay(e) {
    e.preventDefault();

    if (!stripe || !elements || user.cart.count <= 0) return;
    setPaying(true);
    const { client_secret } = await fetch(
      "http://localhost:8084/create-payment",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer ",
        },
        body: JSON.stringify({ amount: user.cart.total }),
      }
    ).then((res) => res.json());
    const { paymentIntent } = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });
    setPaying(false);

    if (paymentIntent) {
      console.log("eher: " + buyeremail);
      console.log(buyername);
      setAlertMessage("Payment Sucessfull");
      createOrder({
        userId: user._id,
        cart: user.cart,
        buyeremail: buyeremail,
        buyername: buyername,
        buyershippingaddress: buyershippingaddress,
        productcategory: products.productcategory,
      }).then((res) => {
        if (!isLoading && !isError) {
          setTimeout(() => {
            navigate("/orders");
          }, 3000);
        }
      });
    }
  }

  return (
    <Col className="cart-payment-container">
      <Form onSubmit={handlePay}>
        <Row>
          {alertMessage && <Alert>{alertMessage}</Alert>}
          <Col md={6}>
            <Form.Group className="form-group-custom">
              <Form.Label className="form-label-custom">Name</Form.Label>
              <Form.Control
                className="form-control-custom"
                type="text"
                placeholder="User Name"
                value={user.name}
                onChange={(e) => setbuyername(e.target.value)}
                required
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="form-group-custom">
              <Form.Label className="form-label-custom">Email</Form.Label>
              <Form.Control
                className="form-control-custom"
                type="text"
                placeholder="Email"
                value={user.email}
                onChange={(e) => setbuyeremail(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={7}>
            <Form.Group className="shipping">
              <Form.Label className="form-label-custom">
                Shipping Address
              </Form.Label>
              <Form.Control
                className="form-control-custom"
                type="text"
                placeholder="Address"
                value={buyershippingaddress}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <label htmlFor="card-element">Card Details</label>
        <div className="stripe-element-wrapper">
          <CardElement className="StripeElement" id="card-element" />
        </div>
        <Button
          className="mt-3"
          type="submit"
          disabled={user.cart.count <= 0 || paying || isSuccess}
        >
          {paying ? "Processing..." : "Place Order"}
        </Button>
      </Form>
    </Col>
  );
}

export default CheckoutForm;
