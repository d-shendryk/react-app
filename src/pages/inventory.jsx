import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import React from "react";
import { useSelector } from "react-redux";
import {
  DataGrid,
  GridToolbar,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { formatPrice } from "../utils/utils";
import QuickSearchToolbar from "../components/searchToolbar";

export default function Inventory() {
  let rows = [];
  const items = useSelector((state) => state.items);

  const renderNameCell = ({ value, id }) => {
    return <Link to={`/inventory/${id}`}>{value}</Link>;
  };
  const columns = [
    { field: "name", headerName: "Name", flex: 2, renderCell: renderNameCell },
    { field: "price", headerName: "Price", flex: 1 },
    { field: "description", headerName: "Description", flex: 5 },
    { field: "status", headerName: "Status", flex: 2 },
  ];

  Object.keys(items).map((key) => {
    rows.push({ ...items[key], id: key, price: formatPrice(items[key].price) });
  });

  return (
    <Container>
      <Box
        sx={{
          justifyContent: "space-between",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Box>
          <h2>Inventory</h2>
        </Box>
        <Link to="/inventory/add">Add item</Link>
      </Box>
      <DataGrid
        disableRowSelectionOnClick
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[2, 5, 10, 20]}
        slots={{ toolbar: QuickSearchToolbar }}
      />
    </Container>
  );
}
