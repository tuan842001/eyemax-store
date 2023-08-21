import React from "react";
import "./Card.scss";
import { BsHandbagFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartReducer";
const PF = "http://localhost:8800/upload/";

const Card = ({ data, type }) => {
  const dispatch = useDispatch();
  return (
    <div className={"card " + type}>
      <Link className="links" to={`/san-pham/${data.MaSanPham}`}>
        <div className="card-title">
          <h3>{data.TenSanPham}</h3>
        </div>
        <div className="card-images">
          <img src={PF + data?.HinhAnh1} alt="" className="main-img" />
          <img src={PF + data?.HinhAnh2} alt="" className="second-img" />
        </div>

        <div className="card-price">
          <span>
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(data.Gia)}
          </span>
        </div>
      </Link>
      <div className="card-widget">
        <span
          className="card-widget-button"
          onClick={() =>
            dispatch(
              addToCart({
                MaSanPham: data.MaSanPham,
                TenSanPham: data.TenSanPham,
                HinhAnh1: data.HinhAnh1,
                HinhAnh2: data.HinhAnh2,
                Gia: data.Gia,
                ChatLieu: data.ChatLieu,
                HinhDang: data.HinhDang,
                DanhMuc: data.DanhMuc,
                SoLuong: 1,
              })
            )
          }
        >
          <BsHandbagFill />
        </span>
      </div>
    </div>
  );
};

export default Card;
