import React from "react";
import "./Footer.scss";
import { NavLink } from "react-router-dom";
import { menu } from "../../data";

const Footer = () => {
  return (
    <div className="footer">
      <div className="container text-right">
        <div className="row">
          <div className="col footer-left">
            <div className="footer-title">THÔNG TIN LIÊN HỆ</div>
            <div className="footer-text">
              <p>
                Kính mắt thời trang Eyemax Store là thương hiệu uy tín, chất
                lượng tại Việt Nam phục vụ nhu cầu mua sắm online và trực tuyến
                trên toàn quốc
              </p>
              <span>
                <h5>Địa chỉ: </h5>
                <p>Tân Thịnh, Thành phố Thái Nguyên, Thái Nguyên</p>
              </span>
              <span>
                <h5>Số điện thoại: </h5>
                <p>0966245700</p>
              </span>
              <span>
                <h5>Email: </h5>
                <p>eyemaxstore@gmail.com</p>
              </span>
            </div>
          </div>
          <div className="col footer-center">
            <div className="footer-title">NHẬN TIN KHUYẾN MÃI</div>
            <div className="footer-text">
              <p>
                Đăng ký nhận bản tin của chúng tôi để nhận tin tức sự kiện mới
                từ chúng tôi qua địa chỉ email của bạn
              </p>
            </div>
            <form className="d-flex">
              <input
                className="form-control me-2"
                placeholder="Địa chỉ email....."
              />
              <button className="btn footer-btn" type="submit">
                ĐĂNG KÝ
              </button>
            </form>
          </div>
          <div className="col footer-right">
            <div className="footer-title">HỖ TRỢ KHÁCH HÀNG</div>
            <ul className="footer-list">
              {menu.map((item, index) => (
                <li className="nav-item" key={index}>
                  <NavLink className="nav-link" to={item.link}>
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
