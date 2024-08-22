import React from "react";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { deleteItem, updateItem } from "../api/items";
import { useNavigate } from "react-router-dom";

export default function EditItemForm({ item, itemId }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = useSelector((state) => state.items);

  const { register, handleSubmit, watch } = useForm({
    defaultValues: item,
  });
  const selectValue = watch("status");

  const _onSubmit = (item) => {
    let data = {};
    data[itemId] = item;
    dispatch(updateItem(data));
    navigate("/inventory");
  };

  const onSubmit = (item) => {
    const reader = new FileReader();

    reader.onloadend = (event) => {
      item.image = event.target.result;
      _onSubmit(item);
    };
    if (item.image instanceof FileList) {
      item.image = item.image[0];
      reader.readAsDataURL(item.image);
    } else _onSubmit(item);
  };

  const onDelete = () => {
    const { [itemId]: _, ...newItems } = items;
    dispatch(deleteItem(newItems));
    navigate("/inventory");
  };
  return item ? (
    <Box sx={{ margin: 4 }}>
      <Paper elevation={10} component={Container} maxWidth="sm">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid
            container
            spacing={2}
            justifyContent="center"
            sx={{ padding: 2 }}
          >
            <Grid item xs={8}>
              <TextField
                fullWidth
                placeholder="Name"
                variant="outlined"
                required
                {...register("name")}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                inputProps={{ type: "number", min: 1 }}
                fullWidth
                placeholder="Price"
                variant="outlined"
                required
                {...register("price")}
              />
            </Grid>
            <Grid item xs={8}>
              <TextField
                fullWidth
                type="file"
                placeholder="Image"
                variant="outlined"
                {...register("image")}
              />
            </Grid>
            <Grid item xs={4}>
              <Select
                fullWidth
                placeholder="Status"
                value={selectValue}
                {...register("status")}
              >
                <MenuItem value="available">In stock</MenuItem>
                <MenuItem value="unavailable">Out of stock</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                placeholder="Description"
                variant="outlined"
                {...register("description")}
              />
            </Grid>
            <Grid item>
              <Button
                color="primary"
                variant="contained"
                type="submit"
                sx={{ mr: 2 }}
              >
                Save
              </Button>
              <Button color="secondary" variant="contained" onClick={onDelete}>
                Delete Item
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  ) : (
    navigate("/inventory")
  );
}
