import React, { useContext, useState } from "react";
import "./Login.scss";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import Swal from "sweetalert2";

const item = [
  {
    name: "Trang chủ",
    link: "/",
  },
  {
    name: "Đăng nhập",
    link: "/dang-nhap",
  },
];

const Login = () => {
  const [inputs, setInputs] = useState({
    TenTruyCap: "",
    MatKhau: "",
  });
  const [err, setErr] = useState(null);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(inputs);
      const Toast = Swal.mixin({
        toast: true,
        position: "top",
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });

      Toast.fire({
        icon: "success",
        title: "Đăng nhập tài khoản thành công",
      });
      navigate("/");
    } catch (err) {
      setErr(err.response.data);
    }
  };
  return (
    <>
      <Breadcrumb item={item} />
      <div className="login">
        <div className="login-title">
          <h2>Đăng nhập</h2>
        </div>
        <div className="login-form">
          <div className="col-md-12 login-item">
            <input
              type="text"
              className="form-control"
              placeholder="Tên truy cập"
              onChange={handleChange}
            />
          </div>
          <div className="col-md-12 login-item">
            <input
              type="password"
              className="form-control"
              placeholder="Mật khẩu"
              onChange={handleChange}
            />
          </div>
          <div style={{ color: "#dd4b39", fontSize: "14px" }}>{err && err}</div>
        </div>
        <button className="login-button" onClick={handleLogin}>
          Đăng nhập
        </button>
        <div className="login-create">
          <span>Bạn chưa có tài khoản?</span>
          <Link to="/dang-ky" className="links">
            Đăng ký
          </Link>
        </div>
      </div>
    </>
  );
};

export default Login;
