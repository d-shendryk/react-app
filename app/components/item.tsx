"use client";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

import React from "react";
import { formatPrice } from "@/utils/utils";
import { useAppDispatch } from "@/lib/hooks";
import { ShopItem } from "../../lib/features/items/itemsSlice";
import { addToOrder } from "@/lib/features/order/orderSlice";

interface Props {
  item: ShopItem;
  itemKey: number;
}

export default function Item(props: Props) {
  const dispatch = useAppDispatch();
  const { name, price, description, image, status } = props.item;
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
            src={image}
          />
        </Grid>
        <Grid item container direction="column" xs spacing={2}>
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
              onClick={() => dispatch(addToOrder(props.itemKey))}
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
