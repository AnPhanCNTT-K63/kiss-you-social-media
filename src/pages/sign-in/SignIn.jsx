import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Grid,
} from "@mui/material";
import Swal from "sweetalert2";
import { signin } from "../../apis/services/AuthService";
import styles from "../../styles/signin.module.css";
import { Link, useNavigate } from "react-router-dom";

const SignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    let formErrors = {};
    let isValid = true;

    if (!formData.email) {
      formErrors.email = "Vui lòng nhập email.";
      isValid = false;
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      formErrors.email = "Địa chỉ email không hợp lệ.";
      isValid = false;
    }

    if (!formData.password) {
      formErrors.password = "Vui lòng nhập mật khẩu.";
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const res = await signin(formData);
        Swal.fire({
          icon: "success",
          title: "Đăng nhập thành công!",
          text: res.message,
          confirmButtonText: "OK",
        }).then(() => {
          localStorage.setItem("token", res.data.accessToken);
          navigate("/");
          window.location.reload();
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Lỗi!",
          text: error.message || "Có lỗi xảy ra. Vui lòng thử lại.",
          confirmButtonText: "OK",
        });
      }
    } else {
      Swal.fire({
        icon: "warning",
        title: "Thông tin chưa chính xác",
        text: "Vui lòng kiểm tra lại các trường dữ liệu.",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className={styles.signinPage}>
      <Container maxWidth="sm" className={styles.container}>
        <Box className={styles.box}>
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            className={styles.title}
          >
            Xin Chào
          </Typography>
          <Typography
            variant="body2"
            align="center"
            gutterBottom
            className={styles.subtitle}
          >
            Đăng nhập để kết nối với bạn bè của bạn
          </Typography>
          <form onSubmit={handleSubmit} noValidate>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={!!errors.email}
                  helperText={errors.email}
                  variant="outlined"
                  className={styles.input}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Mật khẩu"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  error={!!errors.password}
                  helperText={errors.password}
                  variant="outlined"
                  className={styles.input}
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  className={styles.submitButton}
                >
                  Đăng Nhập
                </Button>
                <Typography
                  variant="body2"
                  align="center"
                  gutterBottom
                  style={{ marginTop: "10px" }}
                  className={styles.subtitle}
                >
                  Chưa có tài khoản?{" "}
                  <Link to={`/signup`} style={{ color: "red" }}>
                    Đăng Ký
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Container>
    </div>
  );
};

export default SignIn;
