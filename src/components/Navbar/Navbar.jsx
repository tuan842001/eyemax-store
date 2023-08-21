import React, { useContext, useEffect, useState } from "react";
import "./Navbar.scss";
import { Link, NavLink } from "react-router-dom";
import {
  BsBasket2Fill,
  // BsFillSuitHeartFill,
  BsPerson,
  BsSearch,
  BsLockFill,
  BsPencilSquare,
  BsPersonFillGear,
  BsBoxArrowRight,
  BsList,
} from "react-icons/bs";
import CartItem from "../CartItem/CartItem";
import { menu } from "../../data";
import { useSelector } from "react-redux";
import { AuthContext } from "../../context/authContext";

const Navbar = () => {
  const products = useSelector((state) => state.cart.products);
  const [open, setOpen] = useState(true);
  const [price, setPrice] = useState(0);

  const handlePrice = () => {
    let total = 0;
    products.map((item) => (total += item.Gia * item.SoLuong));
    setPrice(total);
  };

  useEffect(() => {
    handlePrice();
  });

  const { currentUser, logout } = useContext(AuthContext);
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="navbar-wrapper">
        <div className="navbar-left">
          <Link to="/">
            <img
              src="../../../eyemax-store-black.png"
              alt="EYEMAX STORE"
              className="navbar-logo"
            />
          </Link>
          <button className="navbar-button" onClick={() => setOpen(!open)}>
            <BsList className="bslist" />
          </button>
          <div className={open ? "navbar-list" : "navbar-list-show"}>
            <ul className="navbar-nav">
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
        <div className="navbar-right">
          <ul className="navbar-nav">
            <li className="nav-item nav-item-cart">
              <Link className="links" to="/gio-hang">
                <BsBasket2Fill className="nav-icon" />
                <span className="navbar-cart-chilren">{products.length}</span>
              </Link>
              <div className="nav-cart">
                {products.length > 0 ? (
                  products.map((item) => (
                    <CartItem
                      type="cart-item-small"
                      item={item}
                      key={item.MaSanPham}
                      price={price}
                    />
                  ))
                ) : (
                  <p style={{ padding: "10px" }}>
                    Không có thông tin cho loại dữ liệu này
                  </p>
                )}

                <div className="nav-cart-container">
                  <div className="nav-cart-total">
                    <p>Tổng tiền:</p>
                    <span>
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(price)}
                    </span>
                  </div>
                  <div className="nav-cart-button">
                    <Link className="links cart-more" to="/gio-hang">
                      Giỏ hàng
                    </Link>
                    {products.length > 0 ? (
                      <Link className="links cart-pay" to="/thanh-toan">
                        Thanh toán
                      </Link>
                    ) : (
                      <Link className="links cart-pay" to="/">
                        Thanh toán
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </li>

            <li className="nav-item">
              <BsPerson className="nav-icon" />
              <div className="navbar-account">
                {!currentUser ? (
                  <>
                    <Link className="links" to="/dang-nhap">
                      <BsLockFill />
                      Đăng nhập
                    </Link>
                    <Link className="links" to="/dang-ky">
                      <BsPencilSquare />
                      Đăng ký
                    </Link>
                  </>
                ) : (
                  <>
                    <Link className="links" to="/thong-tin-ca-nhan">
                      <BsPersonFillGear />
                      Quản lý tài khoản
                    </Link>
                    <span className="links" onClick={logout}>
                      <BsBoxArrowRight />
                      Đăng xuất
                    </span>
                  </>
                )}
              </div>
            </li>
            <li className="nav-item">
              <BsSearch className="nav-icon" />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
