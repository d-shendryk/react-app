import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

import React from "react";
import { formatPrice } from "../utils/utils";
import CloseIcon from "@mui/icons-material/Close";

class Order extends React.Component {
  submitOrder = (event) => {
    event.preventDefault();
    this.props.submitOrder();
  };

  getImagePath = (image) => {
    return "images/" + image;
  };

  displayItem = (key) => {
    const item = this.props.items[key];
    if (!item) return null;

    const count = this.props.order[key];
    const isAvailable = item.status === "available";

    if (isAvailable) {
      return (
        <Box
          key={key}
          sx={{
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          <Paper elevation={10} component={ListItem} sx={{ mb: 3 }}>
            <ListItemAvatar>
              <Avatar
                style={{
                  height: 70,
                  width: 70,
                  marginRight: 20,
                  marginTop: 5,
                  marginBottom: 5,
                }}
                alt="Not available."
                src={this.getImagePath(item.image)}
              />
            </ListItemAvatar>
            <ListItemText
              primary={count + " kg " + item.name}
              secondary={formatPrice(item.price * count)}
            />
            <Button onClick={() => this.props.deleteFromOrder(key)}>
              <CloseIcon sx={{ m: 0 }}></CloseIcon>
            </Button>
          </Paper>
        </Box>
      );
    }
    return (
      <p>
        {item && item.name ? item.name : "Product"} is out of stock.
        <Button onClick={() => this.props.deleteFromOrder(key)}>
          <CloseIcon></CloseIcon>
        </Button>
      </p>
    );
  };

  render() {
    const orderIds = Object.keys(this.props.order);
    const total = orderIds.reduce((prevValue, key) => {
      const item = this.props.items[key];
      const count = this.props.order[key];
      const isAvailable = item && item.status === "available";

      if (isAvailable) {
        return prevValue + count * item.price;
      }
      return prevValue;
    }, 0);

    return (
      <Container>
        <h2>Your Order</h2>
        <List sx={{ width: "100%" }}>{orderIds.map(this.displayItem)}</List>
        <form onSubmit={this.submitOrder}>
          <h2>Total: {formatPrice(total)}</h2>
          <Button type="submit" color="primary" variant="contained">
            Submit order
          </Button>
        </form>
      </Container>
    );
  }
}

export default Order;
