"use client";
import React from "react";
import Button from "@mui/material/Button";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItem from "@mui/material/ListItem";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";

import { ShopItem } from "@/lib/features/items/itemsSlice";
import { useAppDispatch } from "@/lib/hooks";
import { deleteFromOrder, Order } from "@/lib/features/order/orderSlice";
import { formatPrice } from "@/utils/utils";

interface Props {
  item: ShopItem;
  order: Order;
  itemKey: number;
}

export default function OrderItem(props: Props) {
  const dispatch = useAppDispatch();
  const key = props.itemKey;
  const { name, price, image, status } = props.item;
  const count = props.order[key];
  const isAvailable = status === "available";

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
              src={image}
            />
          </ListItemAvatar>
          <ListItemText
            primary={count + " kg " + name}
            secondary={formatPrice(price * count)}
          />
          <Button onClick={() => dispatch(deleteFromOrder(key))}>
            <CloseIcon sx={{ m: 0 }} />
          </Button>
        </Paper>
      </Box>
    );
  }
  return (
    <p>
      {props.item?.name ? props.item.name : "Product"} is out of stock.
      <Button onClick={() => dispatch(deleteFromOrder(key))}>
        <CloseIcon />
      </Button>
    </p>
  );
}
