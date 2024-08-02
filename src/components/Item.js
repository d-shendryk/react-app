import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

import React from "react";
import PropTypes from "prop-types";
import { formatPrice } from "../utils/utils";

class Item extends React.Component {
  static propTypes = {
    details: PropTypes.shape({
      name: PropTypes.string,
      description: PropTypes.string,
      image: PropTypes.string,
      status: PropTypes.string,
      price: PropTypes.number,
    }),
    addToOrder: PropTypes.func,
  };

  addToOrder = () => {
    this.props.addToOrder(this.props.itemKey);
  };

  getImagePath = (image) => {
    return "images/" + image;
  };

  render() {
    const { name, price, description, image, status } = this.props.item;
    const isAvailable = status === "available";

    return (
      <Paper elevation={3} style={{ margin: 32, padding: 12 }}>
        <Grid container spacing={2}>
          <Grid item>
            <Box
              component="img"
              sx={{
                height: 233,
                width: 350,
                maxHeight: { xs: 200, md: 350 },
                maxWidth: { xs: 300, md: 500 },
              }}
              alt="Not available."
              src={this.getImagePath(image)}
            />
          </Grid>
          <Grid item container direction="column" xs>
            <Grid item>
              <h3>
                {name}
                <span> {formatPrice(price)}</span>
              </h3>
            </Grid>
            <Grid item>
              <p>{description}</p>
            </Grid>
            <Grid item>
              <Button
                disabled={!isAvailable}
                onClick={this.addToOrder}
                color="primary"
                variant="contained"
              >
                {isAvailable ? "Add to order" : "Out of stock"}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

export default Item;
