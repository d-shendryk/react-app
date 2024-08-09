"use client";
import React from "react";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { ShopItem, ShopItems } from "@/lib/features/items/itemsSlice";
import { useAppDispatch } from "@/lib/hooks";
import { useForm, SubmitHandler } from "react-hook-form";
import { TextField } from "@mui/material";
import { updateItem } from "@/utils/client";

interface Props {
  item: ShopItem;
  itemKey: number;
}

export default function AddItemForm() {
  const dispatch = useAppDispatch();
  const { register, handleSubmit, reset } = useForm<ShopItem>();
  const onSubmit: SubmitHandler<ShopItem> = (item) => {
    var data: ShopItems = {};
    data[Date.now()] = item;
    dispatch(updateItem(data));
    reset();
  };

  return (
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
                placeholder="Image"
                variant="outlined"
                {...register("image")}
              />
            </Grid>
            <Grid item xs={4}>
              <Select
                fullWidth
                placeholder="Status"
                {...register("status")}
                defaultValue={"available"}
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
              <Button color="primary" variant="contained" type="submit">
                Save
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
}
