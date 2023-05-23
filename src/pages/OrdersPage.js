import React, { useEffect, useState } from "react";
import { Badge, Container, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import axios from "../axios";
import Loading from "../components/Loading";
import "./OrdersPage.css";

function OrdersPage() {
  const user = useSelector((state) => state.user);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/users/${user._id}/orders`)
      .then(({ data }) => {
        setLoading(false);
        setOrders(data);
      })
      .catch((e) => {
        setLoading(false);
        console.log(e);
      });
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (orders.length === 0) {
    return <h1 className="text-center">No orders yet</h1>;
  }

  return (
    <Container>
      <h1 className="myorder">Your orders</h1>
      <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th>Order Number</th>
            <th>Buyer Name </th>
            <th>Status</th>
            <th>Order Date</th>
            <th>Total Amount </th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr>
              <td>{order._id}</td>
              <td>{order.buyername}</td>
              <td>
                <Badge
                  bg={`${order.status == "processing" ? "warning" : "success"}`}
                  text="white"
                >
                  {order.status}
                </Badge>
              </td>
              <td>{order.buyerpurchasedata}</td>

              <td>${order.amount}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default OrdersPage;
