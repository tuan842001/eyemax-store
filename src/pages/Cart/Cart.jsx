import React from "react";
import "./Cart.scss";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import { Link } from "react-router-dom";
import CartItem from "../../components/CartItem/CartItem";
import { useSelector } from "react-redux";

const item = [
  {
    name: "Trang chủ",
    link: "/",
  },
  {
    name: "Giỏ hàng",
    link: "/gio-hang",
  },
];
const Cart = () => {
  const products = useSelector((state) => state.cart.products);

  const totalPrice = () => {
    let total = 0;
    products.forEach((item) => {
      total += item.Gia * item.SoLuong;
    });
    return total;
  };

  return (
    <>
      <Breadcrumb item={item} />
      <div className="cart">
        <div className="cart-top">
          <h2>Giỏ hàng</h2>
        </div>
        <div className="cart-center">
          {products.length > 0
            ? products.map((item) => (
                <CartItem type="cart-item" item={item} key={item.MaSanPham} />
              ))
            : "Không có thông tin cho loại dữ liệu này"}
        </div>
        <div className="cart-bottom">
          <div className="cart-total">
            <p>Tổng tiền:</p>
            <span>
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(totalPrice())}
            </span>
          </div>
          <div className="cart-button">
            <Link className="links cart-more" to="/san-phams">
              Xem thêm sản phẩm
            </Link>
            {products.length > 0 ? (
              <Link className="links cart-pay" to="/thanh-toan">
                Thanh toán
              </Link>
            ) : (
              <div className="links cart-pay">Thanh toán</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
