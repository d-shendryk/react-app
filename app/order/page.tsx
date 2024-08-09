"use client";
import React from "react";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import List from "@mui/material/List";
import { Order } from "@/lib/features/order/orderSlice";
import { formatPrice } from "@/utils/utils";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { ShopItems } from "@/lib/features/items/itemsSlice";
import OrderItem from "@/app/components/orderItem";
import { submitOrder } from "@/utils/client";

export default function Page() {
  const dispatch = useAppDispatch();
  const items: ShopItems = useAppSelector((state) => state.items.value);
  const order: Order = useAppSelector((state) => state.order.value);
  const orderIds = Object.keys(order);

  const total = orderIds.reduce((prevValue: number, key: string) => {
    const item = items[key];
    const count = order[Number(key)];
    const isAvailable = item?.status === "available";

    if (isAvailable) {
      return prevValue + count * item.price;
    }
    return prevValue;
  }, 0);

  return (
    <Container>
      <List sx={{ width: "100%" }}>
        {orderIds.map(
          (key) =>
            items[key] && (
              <OrderItem
                item={items[key]}
                order={order}
                key={key}
                itemKey={Number(key)}
              ></OrderItem>
            )
        )}
      </List>
      <h2>Total: {formatPrice(total)}</h2>
      <Button
        onClick={() => dispatch(submitOrder(order))}
        color="primary"
        variant="contained"
      >
        Submit order
      </Button>
    </Container>
  );
}
