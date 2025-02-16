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
import { signup } from "../../apis/services/AuthService";
import styles from "../../styles/signup.module.css";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    username: "",
    password: "",
  });

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

    if (!formData.username) {
      formErrors.username = "Vui lòng nhập tên người dùng.";
      isValid = false;
    }

    if (!formData.password) {
      formErrors.password = "Vui lòng nhập mật khẩu.";
      isValid = false;
    } else if (formData.password.length < 6) {
      formErrors.password = "Mật khẩu phải có ít nhất 6 ký tự.";
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const res = await signup(formData);
        Swal.fire({
          icon: "success",
          title: "Đăng ký thành công!",
          text: "Tài khoản của bạn đã được tạo. Hãy đăng nhập để bắt đầu khám phá!",
          confirmButtonText: "OK",
        }).then(() => {
          navigate("/signin");
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
    <div className={styles.signupPage}>
      <Container maxWidth="sm" className={styles.container}>
        <Box className={styles.box}>
          <Typography variant="h4" className={styles.title}>
            Tham gia vào cộng đồng
          </Typography>
          <Typography variant="body2" className={styles.subtitle}>
            Tạo tài khoản và bắt đầu khám phá
          </Typography>
          <form onSubmit={handleSubmit} noValidate>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  variant="outlined"
                  error={!!errors.email}
                  helperText={errors.email}
                  className={styles.input}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Tên người dùng"
                  name="username"
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                  variant="outlined"
                  error={!!errors.username}
                  helperText={errors.username}
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
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  variant="outlined"
                  error={!!errors.password}
                  helperText={errors.password}
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
                  Đăng Ký
                </Button>
                <Typography
                  style={{ marginTop: "10px" }}
                  variant="body2"
                  className={styles.subtitle}
                >
                  Đã có tài khoản?{" "}
                  <Link style={{ color: "red" }} to={`/signin`}>
                    Đăng Nhập
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

export default SignUp;
