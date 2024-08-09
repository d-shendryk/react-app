"use client";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { useAppDispatch } from "@/lib/hooks";
import { useEffect } from "react";
import { getItems } from "@/utils/client";
import { setOrder } from "@/lib/features/order/orderSlice";

export default function Navbar() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getItems());

    const jsonOrder = localStorage.getItem("order") || "{}";
    const order = JSON.parse(jsonOrder);
    dispatch(setOrder(order));
  }, [dispatch]);

  return (
    <AppBar position="static">
      <Toolbar className="flex gap-3">
        <Typography variant="h5" component="div" sx={{ mr: 4 }}>
          Food Shop
        </Typography>
        <Box>
          <Button component={Link} color="inherit" sx={{ my: 2 }} href="/">
            Store
          </Button>
          <Button component={Link} color="inherit" sx={{ my: 2 }} href="/order">
            Order
          </Button>
          <Button
            component={Link}
            color="inherit"
            sx={{ my: 2 }}
            href="/inventory"
          >
            Inventory
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
