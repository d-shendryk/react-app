import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import Store from "./Store";
import NotFound from "./NotFound";
import Inventory from "./Inventory";
import Order from "./Order";
import sampleItems from "../utils/samples";
import { saveItems, getItems, updateItem, submitOrder } from "../client";

class App extends React.Component {
  state = {
    items: [],
    order: {},
  };

  async componentDidMount() {
    const jsonOrder = localStorage.getItem("order") || "{}";
    const order = JSON.parse(jsonOrder);
    this.setState({ order });

    const items = await getItems();
    this.setState({ items });
  }

  componentDidUpdate() {
    localStorage.setItem("order", JSON.stringify(this.state.order));
  }

  addItem = (item) => {
    var items = { ...this.state.items };
    items[Date.now()] = item;

    this.setState({ items });
    saveItems(items);
  };

  updateItem = (key, item) => {
    var items = { ...this.state.items };
    items[key] = item;

    this.setState({ items });

    var itemToUpdate = {};
    itemToUpdate[key] = item;
    updateItem(itemToUpdate);
  };

  deleteItem = (key) => {
    var items = { ...this.state.items };
    delete items[key];

    saveItems(items);
    this.deleteFromOrder(key);
    this.setState({ items });
  };

  addSampleItems = () => {
    const samples = { ...sampleItems };

    this.setState({ items: samples });
    saveItems(samples);
  };

  addToOrder = (key) => {
    const order = { ...this.state.order };
    order[key] = order[key] + 1 || 1;
    this.setState({ order });
  };

  deleteFromOrder = (key) => {
    const order = { ...this.state.order };
    delete order[key];
    this.setState({ order });
  };

  submitOrder = () => {
    const order = this.state.order;
    var orderData = [];

    Object.keys(order).forEach((key, index) => {
      orderData.push({
        ...this.state.items[key],
        quantity: order[key],
      });
    });

    submitOrder(orderData);
    this.setState({ order: {} });
  };

  render() {
    return (
      <BrowserRouter>
        <AppBar position="static">
          <Toolbar className="flex gap-3">
            <Box>
              <Typography variant="h5" component="div">
                Food Shop
              </Typography>
            </Box>
            <Box>
              <Button variant="text" component={Link} color="inherit" to="/">
                Store
              </Button>
              <Button
                variant="text"
                component={Link}
                color="inherit"
                to="/order"
              >
                Order
              </Button>
              <Button
                variant="text"
                component={Link}
                color="inherit"
                to="/inventory"
              >
                Inventory
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
        <Routes>
          <Route
            path="/"
            exact
            element={
              <Store items={this.state.items} addToOrder={this.addToOrder} />
            }
          />
          <Route
            path="/order"
            element={
              <Order
                items={this.state.items}
                order={this.state.order}
                deleteFromOrder={this.deleteFromOrder}
                submitOrder={this.submitOrder}
              />
            }
          />
          <Route
            path="/inventory"
            element={
              <Inventory
                items={this.state.items}
                addItem={this.addItem}
                updateItem={this.updateItem}
                deleteItem={this.deleteItem}
                addSampleItems={this.addSampleItems}
              />
            }
          />
          <Route component={NotFound} />
        </Routes>
        <Box sx={{ flex: 1 }} />
      </BrowserRouter>
    );
  }
}

export default App;
