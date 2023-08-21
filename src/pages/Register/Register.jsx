import React, { useState } from "react";
import "./Register.scss";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import { makeRequest } from "../../axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const item = [
  {
    name: "Trang chủ",
    link: "/",
  },
  {
    name: "Đăng ký",
    link: "/dang-ky",
  },
];

const Register = () => {
  const navigate = useNavigate();
  const [err, setErr] = useState(null);
  const [inputs, setInputs] = useState({
    HoVaTen: "",
    SoDienThoai: "",
    DiaChi: "",
    Email: "",
    TenTruyCap: "",
    MatKhau: "",
  });
  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  console.log(inputs);

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await makeRequest.post("/auth/register", inputs);
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
        title: "Đăng ký tài khoản thành công",
      });

      navigate("/dang-nhap");
    } catch (err) {
      const Toast = Swal.mixin({
        toast: true,
        position: "top",
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });

      Toast.fire({
        icon: "error",
        title: "Đăng ký tài khoản thất bại",
      });

      setErr(err.response.data);
    }
  };
  return (
    <>
      <Breadcrumb item={item} />
      <div className="register">
        <div className="register-title">
          <h2>Đăng ký</h2>
        </div>
        <div className="register-form">
          <div className="row">
            <div className="col">
              <div className="col-md-12 register-item">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Họ và tên"
                  name="HoVaTen"
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-12 register-item">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Điện thoại"
                  name="SoDienThoai"
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-12 register-item register-address">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Địa chỉ"
                  name="DiaChi"
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-12 register-item">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  name="Email"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="col">
              <div className="col-md-12 register-item">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Tên truy cập"
                  name="TenTruyCap"
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-12 register-item">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Mật khẩu"
                  name="MatKhau"
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-12 register-item">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Xác nhận mật khẩu"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div style={{ color: "#000" }}>{err && err}</div>
          </div>
        </div>
        <button className="register-button" onClick={handleClick}>
          Đăng ký
        </button>
      </div>
    </>
  );
};

export default Register;
