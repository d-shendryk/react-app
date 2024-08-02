import Container from "@mui/material/Container";
import React from "react";
import PropTypes from "prop-types";
import AddItemForm from "./AddItemForm";
import EditItemForm from "./EditItemForm";

class Inventory extends React.Component {
  static propTypes = {
    items: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    addItem: PropTypes.func,
    updateItem: PropTypes.func,
    deleteItem: PropTypes.func,
    addSampleItems: PropTypes.func,
  };

  render() {
    return (
      <Container>
        <h2>Inventory</h2>
        <ul>
          {Object.keys(this.props.items).map((key) => (
            <EditItemForm
              item={this.props.items[key]}
              key={key}
              itemKey={key}
              updateItem={this.props.updateItem}
              deleteItem={this.props.deleteItem}
            />
          ))}
          <AddItemForm
            addItem={this.props.addItem}
            addSampleItems={this.props.addSampleItems}
          />
        </ul>
      </Container>
    );
  }
}

export default Inventory;
