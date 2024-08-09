"use client";
import React from "react";
import Box from "@mui/material/Box";
import Item from "./components/item";
import { useAppSelector } from "@/lib/hooks";
import { ShopItems } from "@/lib/features/items/itemsSlice";

export default function Shop() {
  const items: ShopItems = useAppSelector((state) => state.items.value);

  const renderedItems = Object.keys(items).map((key: string) => (
    <Item item={items[key]} key={key} itemKey={Number(key)} />
  ));

  return (
    <Box
      component="ul"
      sx={{
        margin: 0,
        padding: 0,
      }}
    >
      {renderedItems}
    </Box>
  );
}
