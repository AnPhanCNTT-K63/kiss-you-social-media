import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import BarChartIcon from "@mui/icons-material/BarChart";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Statistics = () => {
  const navigate = useNavigate();
  const [selectedYear, setSelectedYear] = useState(null);

  const handleTotalRevenueClick = () => {
    navigate(`/statistics/revenue/year`);
  };

  const handleYearClick = (year) => {
    setSelectedYear(year);
  };

  const handleOptionClick = (type, year) => {
    navigate(`/statistics/${type.toLowerCase()}/${year}`);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4,
        padding: 4,
        bgcolor: "#f0f2f5",
        minHeight: "100vh",
        marginTop: "100px",
      }}
    >
      {/* Header Section */}
      <Box
        sx={{
          textAlign: "center",
          padding: 2,
          maxWidth: 800,
          bgcolor: "#ffffff",
          boxShadow: 3,
          borderRadius: 2,
        }}
      >
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Thống kê
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Khám phá số liệu thống kê và thông tin chi tiết. Chọn một năm hoặc xem
          dữ liệu.
        </Typography>
      </Box>

      {/* Main Content */}
      <Grid container spacing={4} justifyContent="center">
        {/* Year Selection Area */}
        <Grid item xs={12} md={6}>
          {!selectedYear ? (
            <Card
              sx={{
                bgcolor: "#e3f2fd",
                borderRadius: 3,
                boxShadow: 3,
              }}
            >
              <CardContent>
                <Typography variant="h5" textAlign="center" gutterBottom>
                  Chọn một năm
                </Typography>
                <Grid container spacing={2} justifyContent="center">
                  {["2024", "2025", "2026"].map((year) => (
                    <Grid item key={year}>
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<CalendarMonthIcon />}
                        onClick={() => handleYearClick(year)}
                        sx={{
                          minWidth: 150,
                          fontWeight: "bold",
                          fontSize: "1rem",
                        }}
                      >
                        Year {year}
                      </Button>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          ) : (
            <Card
              sx={{
                bgcolor: "#ede7f6",
                borderRadius: 3,
                boxShadow: 3,
              }}
            >
              <CardContent>
                <Typography variant="h5" textAlign="center" gutterBottom>
                  Thống kê cho năm {selectedYear}
                </Typography>
                <Grid container spacing={2} justifyContent="center">
                  {["Post", "User"].map((type) => (
                    <Grid item key={type}>
                      <Button
                        variant="contained"
                        color="secondary"
                        startIcon={<BarChartIcon />}
                        onClick={() => handleOptionClick(type, selectedYear)}
                        sx={{
                          minWidth: 200,
                          fontWeight: "bold",
                          fontSize: "1rem",
                        }}
                      >
                        {type}
                      </Button>
                    </Grid>
                  ))}
                </Grid>
                <Box textAlign="center" mt={2}>
                  <Button
                    variant="outlined"
                    color="error"
                    startIcon={<ArrowBackIcon />}
                    onClick={() => setSelectedYear(null)}
                    sx={{
                      fontWeight: "bold",
                    }}
                  >
                    Back to Year Selection
                  </Button>
                </Box>
              </CardContent>
            </Card>
          )}
        </Grid>

        {/* Total Revenue Area */}
      </Grid>

      {/* Footer Section */}
      <Box sx={{ textAlign: "center", marginTop: 4 }}>
        <Typography variant="body2" color="text.secondary">
          Need help? Contact support or check the documentation for more
          details.
        </Typography>
      </Box>
    </Box>
  );
};

export default Statistics;
