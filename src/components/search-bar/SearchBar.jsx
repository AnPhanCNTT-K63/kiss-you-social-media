import React from "react";
import { Button, Box, TextField } from "@mui/material";

export default function SearchBar({
  searchQuery,
  setSearchQuery,
  handleSearch,
}) {
  return (
    <Box display="flex" justifyContent="center" marginBottom={2}>
      <TextField
        label="Tìm kiếm Người Dùng"
        variant="outlined"
        size="small"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ width: "300px" }}
      />
      <Button
        variant="contained"
        color="primary"
        style={{ marginLeft: "20px" }}
        onClick={handleSearch}
        sx={{ height: "40px" }}
      >
        Tìm
      </Button>
    </Box>
  );
}
