import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Box,
  Divider,
  Grid,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import { updateProfile } from "../../apis/services/UserService";

const formatDate = (date) => {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
};

const ProfileAbout = ({ userInfo, id }) => {
  const [editableField, setEditableField] = useState(null);
  const [updatedInfo, setUpdatedInfo] = useState(userInfo.profile || {});

  const handleEditClick = (field) => {
    setEditableField(field);
  };

  const handleInputChange = (field, value) => {
    setUpdatedInfo((prevInfo) => ({
      ...prevInfo,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const res = await updateProfile(id, updatedInfo);

      if (res.message === "OK") {
        alert("Profile updated successfully!");
      } else {
        alert("Failed to update profile!");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("An error occurred while updating the profile.");
    } finally {
      setEditableField(null);
    }
  };

  const handleCancel = () => {
    setUpdatedInfo((prevInfo) => ({
      ...prevInfo,
      [editableField]: userInfo.profile[editableField],
    }));
    setEditableField(null);
  };

  const renderField = (field, label, type = "text") => (
    <Grid container alignItems="center" spacing={2} sx={{ mb: 2 }}>
      <Grid item xs={4}>
        <Typography variant="subtitle1" fontWeight="bold">
          {label}:
        </Typography>
      </Grid>
      <Grid item xs={6}>
        {editableField === field ? (
          <TextField
            fullWidth
            variant="outlined"
            type={type}
            value={updatedInfo[field] || ""}
            onChange={(e) => handleInputChange(field, e.target.value)}
          />
        ) : (
          <Typography variant="body1">
            {field === "birthday" && updatedInfo[field]
              ? formatDate(updatedInfo[field])
              : updatedInfo[field] || "Not provided"}
          </Typography>
        )}
      </Grid>
      <Grid item xs={2}>
        {editableField === field ? (
          <>
            <IconButton onClick={handleSave} color="primary">
              <SaveIcon />
            </IconButton>
            <IconButton onClick={handleCancel} color="error">
              <CancelIcon />
            </IconButton>
          </>
        ) : (
          <IconButton onClick={() => handleEditClick(field)}>
            <EditIcon />
          </IconButton>
        )}
      </Grid>
    </Grid>
  );

  if (!userInfo) {
    return (
      <Box textAlign="center" mt={4}>
        <Typography variant="h6" color="textSecondary">
          Loading user information...
        </Typography>
      </Box>
    );
  }

  return (
    <Box display="flex" justifyContent="center" mt={4}>
      <Card sx={{ width: "80%", maxWidth: 900, padding: 3 }}>
        <CardContent>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            About
          </Typography>
          <Divider sx={{ mb: 3 }} />
          {renderField("firstName", "First Name")}
          {renderField("lastName", "Last Name")}
          {renderField("address", "Address")}
          {renderField("postalCode", "Postal Code")}
          {renderField("phone", "Phone")}
          {renderField("birthday", "Birthday", "date")}
          {renderField("country", "Country")}
          {renderField("aboutMe", "About Me")}
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProfileAbout;
