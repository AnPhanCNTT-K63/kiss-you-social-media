import React, { useState } from "react";
import PostManagement from "../../components/post-management/PostManagement";
import UserManagement from "../../components/user-manager/UserManagement";
import { Box, Tabs, Tab, Typography } from "@mui/material";

export default function Admin() {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Box marginTop={"100px"}>
      {/* Tab Header */}
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="Quản Lý Người Dùng" />
        <Tab label="Quản Lý Bài Viết" />
      </Tabs>

      {/* Tab Content */}
      <Box marginTop={3}>
        {activeTab === 0 && (
          <Typography component="div">
            <UserManagement />
          </Typography>
        )}
        {activeTab === 1 && (
          <Typography component="div">
            <PostManagement />
          </Typography>
        )}
      </Box>
    </Box>
  );
}
