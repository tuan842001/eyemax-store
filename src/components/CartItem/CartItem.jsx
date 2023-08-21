import React, { useState } from "react";
import "./CartItem.scss";
import { Link } from "react-router-dom";
import { BsTrash } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { removeItem } from "../../redux/cartReducer";
const PF = "http://localhost:8800/upload/";

const CartItem = ({ type, item }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(item.SoLuong);

  return (
    <div className={"cart-item " + type}>
      <div className="cart-image">
        <img src={PF + item?.HinhAnh1} alt="" className="main-img" />
      </div>
      <div className="cart-details">
        <div className="col cart-name">
          <Link className="links" to={`/san-pham/${item.MaSanPham}`}>
            <h3>{item.TenSanPham}</h3>
          </Link>
        </div>
        <div className="col">
          <div className="cart-unit-price">
            <p>Đơn giá:</p>
            <span>
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(item.Gia)}
            </span>
          </div>
          <div className="cart-quantity">
            <p>Số lượng:</p>

            {type === "cart-item-small" ? (
              <span>{item.SoLuong}</span>
            ) : (
              <div className="product-quantity">
                <button
                  onClick={() =>
                    setQuantity((prev) => (prev === 1 ? 1 : prev - 1))
                  }
                >
                  -
                </button>
                <input
                  type="text"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
                <button onClick={() => setQuantity((prev) => prev + 1)}>
                  +
                </button>
              </div>
            )}
          </div>

          <div className="cart-price">
            <p>Thành tiền:</p>
            <span>
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(item.Gia * item.SoLuong)}
            </span>
          </div>
        </div>
      </div>
      <div
        className="cart-delete"
        onClick={() => dispatch(removeItem(item.MaSanPham))}
      >
        <BsTrash />
      </div>
    </div>
  );
};

export default CartItem;
