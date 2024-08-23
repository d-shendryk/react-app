import { Box } from "@mui/material";
import { GridToolbarQuickFilter } from "@mui/x-data-grid";

const QuickSearchToolbar = () => {
  return (
    <Box
      sx={{
        display: "flex",
        p: 0.5,
        pb: 0,
      }}
    >
      <GridToolbarQuickFilter debounceMs={500} />
    </Box>
  );
};

export default QuickSearchToolbar;
