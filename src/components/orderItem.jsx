import React from "react";
import Button from "@mui/material/Button";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItem from "@mui/material/ListItem";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import { deleteFromOrder } from "../stores/features/order/orderSlice";
import { formatPrice, checkAvailable } from "../utils/utils";

export default function OrderItem(props) {
  const dispatch = useDispatch();

  const key = props.itemKey;
  const { name, price, image, status } = props.item;
  const count = props.order[key];
  const isAvailable = checkAvailable(status);
  const totalPrice = formatPrice(price * count);

  return isAvailable ? (
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
        <ListItemText primary={`${count} kg ${name}`} secondary={totalPrice} />
        <Button onClick={() => dispatch(deleteFromOrder(key))}>
          <CloseIcon sx={{ m: 0 }} />
        </Button>
      </Paper>
    </Box>
  ) : (
    <p>
      {props.item?.name ? props.item.name : "Product"} is out of stock.
      <Button onClick={() => dispatch(deleteFromOrder(key))}>
        <CloseIcon />
      </Button>
    </p>
  );
}
