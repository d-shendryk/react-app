"use client";
import React from "react";
import Box from "@mui/material/Box";
import Item from "../components/item";
import { useSelector } from "react-redux";

export default function Shop() {
  const items = useSelector((state) => state.items);

  return (
    <Box
      component="ul"
      sx={{
        margin: 0,
        padding: 0,
      }}
    >
      {Object.keys(items).map((key) => (
        <Item item={items[key]} key={key} itemKey={key} />
      ))}
    </Box>
  );
}
