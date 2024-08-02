import Box from "@mui/material/Box";
import React from "react";
import Item from "./Item";

class Store extends React.Component {
  render() {
    return (
      <Box
        component="ul"
        sx={{
          margin: 0,
          padding: 0,
        }}
      >
        {Object.keys(this.props.items).map((key) => (
          <Item
            item={this.props.items[key]}
            key={key}
            itemKey={key}
            addToOrder={this.props.addToOrder}
          />
        ))}
      </Box>
    );
  }
}

export default Store;
