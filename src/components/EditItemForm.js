import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import PropTypes from "prop-types";
import React from "react";

class EditItemForm extends React.Component {
  static propTypes = {
    updateItem: PropTypes.func,
    deleteItem: PropTypes.func,
    itemKey: PropTypes.string,
    item: PropTypes.shape({
      name: PropTypes.string,
      description: PropTypes.string,
      image: PropTypes.string,
      status: PropTypes.string,
      price: PropTypes.string,
    }),
  };

  handleChange = (event) => {
    const updatedItem = {
      ...this.props.item,
      [event.target.name]: event.target.value,
    };
    this.props.updateItem(this.props.itemKey, updatedItem);
  };

  render() {
    return (
      <Box sx={{ margin: 4 }}>
        <Paper elevation={10} component={Container} maxWidth="sm">
          <Grid
            container
            spacing={2}
            justifyContent="center"
            sx={{ padding: 2 }}
          >
            <Grid item xs={8}>
              <TextField
                fullWidth
                name="name"
                label="Name"
                variant="outlined"
                required
                value={this.props.item.name}
                onChange={this.handleChange}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                inputProps={{ type: "number", min: 1 }}
                fullWidth
                name="price"
                label="Price"
                variant="outlined"
                required
                value={this.props.item.price}
                onChange={this.handleChange}
              />
            </Grid>
            <Grid item xs={8}>
              <TextField
                fullWidth
                name="image"
                label="Image"
                variant="outlined"
                value={this.props.item.image}
                onChange={this.handleChange}
              />
            </Grid>
            <Grid item xs={4}>
              <Select
                fullWidth
                name="status"
                label="Status"
                value={this.props.item.status}
                onChange={this.handleChange}
              >
                <MenuItem value="available">In stock</MenuItem>
                <MenuItem value="unavailable">Out of stock</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                name="description"
                label="Description"
                variant="outlined"
                value={this.props.item.description}
                onChange={this.handleChange}
              />
            </Grid>
            <Grid item xs={6} sm={4}>
              <Button
                color="secondary"
                variant="contained"
                onClick={() => this.props.deleteItem(this.props.itemKey)}
              >
                Delete Item
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    );
  }
}

export default EditItemForm;
