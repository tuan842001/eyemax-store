import React from "react";
import "./Error.scss";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="error">
      <img src="../../../img/404.png" alt="" className="error-img" />
      <div className="error-text">
        <h2 className="error-title">Không tìm thấy trang</h2>
        <span className="error-desc">
          Xin lỗi, chúng tôi không thể tìm thấy trang này!
        </span>
        <Link to="/" className="error-button links">
          Quay lại trang chủ
        </Link>
      </div>
    </div>
  );
};

export default Error;
