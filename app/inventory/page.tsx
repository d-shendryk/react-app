"use client";
import Container from "@mui/material/Container";
import React from "react";
import AddItemForm from "../components/addItemForm";
import EditItemForm from "../components/editItemForm";
import { useAppSelector } from "@/lib/hooks";
import { ShopItems } from "@/lib/features/items/itemsSlice";

export default function Inventory() {
  const items: ShopItems = useAppSelector((state) => state.items.value);

  return (
    <Container>
      <ul>
        {Object.keys(items).map((key) => (
          <EditItemForm item={items[key]} key={key} itemKey={Number(key)} />
        ))}
        <AddItemForm />
      </ul>
    </Container>
  );
}
