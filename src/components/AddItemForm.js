import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import PropTypes from "prop-types";
import React from "react";

class AddItemForm extends React.Component {
  static propTypes = {
    addItem: PropTypes.func,
    addSampleItems: PropTypes.func,
  };

  nameRef = React.createRef();
  priceRef = React.createRef();
  imageRef = React.createRef();
  statusRef = React.createRef();
  descRef = React.createRef();

  createItem = async (e) => {
    e.preventDefault();

    const item = {
      name: this.nameRef.current.value,
      price: this.priceRef.current.value,
      status: this.statusRef.current.value,
      image: this.imageRef.current.value,
      description: this.descRef.current.value,
    };

    this.props.addItem(item);
  };

  render() {
    return (
      <Box sx={{ margin: 4 }}>
        <Paper elevation={10} component={Container} maxWidth="sm">
          <form onSubmit={this.createItem}>
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
                  inputRef={this.nameRef}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  inputProps={{ type: "number", min: 1 }}
                  name="price"
                  label="Price"
                  variant="outlined"
                  required
                  inputRef={this.priceRef}
                />
              </Grid>
              <Grid item xs={8}>
                <TextField
                  fullWidth
                  name="image"
                  label="Image"
                  variant="outlined"
                  inputRef={this.imageRef}
                />
              </Grid>
              <Grid item xs={4}>
                <Select
                  name="status"
                  defaultValue="available"
                  label="Status"
                  fullWidth
                  inputRef={this.statusRef}
                >
                  <MenuItem value="available">In stock</MenuItem>
                  <MenuItem value="unavailable">Out of stock</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="description"
                  label="Description"
                  variant="outlined"
                  multiline
                  rows={4}
                  inputRef={this.descRef}
                />
              </Grid>
              <Grid item xs={6} sm={4}>
                <Button type="submit" variant="contained" color="primary">
                  Create item
                </Button>
              </Grid>
              <Grid item xs={6} sm={4}>
                <Button
                  color="primary"
                  onClick={this.props.addSampleItems}
                  variant="contained"
                >
                  Add samples
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Box>
    );
  }
}

export default AddItemForm;
