import React, { useEffect, useState } from "react";
import "./OrderDetails.scss";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import { Link, useParams } from "react-router-dom";
import {
  BsFileEarmarkText,
  BsFillPersonFill,
  BsPhone,
  BsFillEnvelopeFill,
  BsFillGeoAltFill,
  BsFillReplyFill,
} from "react-icons/bs";
import { makeRequest } from "../../axios";
import moment from "moment";
// import { makeRequest } from "../../axios";

const item = [
  {
    name: "Trang chủ",
    link: "/",
  },
  {
    name: "Chi tiết đơn hàng",
    link: "/chi-tiet-don-hang",
  },
];
const OrderDetails = () => {
  const id = useParams().id;
  const [data, setData] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const res = await makeRequest.get(`/donhang/${id}`);
        setData(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllData();

    const fetchAllOrders = async () => {
      try {
        const res = await makeRequest.get(
          `/chitietdonhang/madonhang/${data.MaDonHang}`
        );
        setOrders(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllOrders();
  }, [id, data.MaDonHang]);

  return (
    <>
      <Breadcrumb item={item} />
      <div className="order-details">
        <div className="order-details-title">
          <h2>Chi tiết đơn hàng</h2>
          <Link to="/thong-tin-ca-nhan" className="links">
            <BsFillReplyFill className="order-details-icon-back" />
            Quay lại
          </Link>
        </div>
        <div className="order-details-info">
          <div className="order-details-info-title">
            <div className="order-details-info-code">
              <BsFileEarmarkText />
              <span>{data.MaDonHang}</span>
              <span>{data.TrangThai}</span>
            </div>
            <div className="order-details-info-time">
              <span> {moment(data.NgayTao).format("HH:mm DD/MM/YYYY")}</span>
            </div>
          </div>
          <div className="row">
            <div className="col order-details-info-box">
              <h4>Thông tin mua hàng</h4>

              <div className="order-details-info-content-items">
                <BsFillPersonFill />
                <span>{data.TenNguoiMua}</span>
              </div>
              <div className="order-details-info-content-items">
                <BsPhone />
                <span>{data.SDTNguoiMua}</span>
              </div>
              <div className="order-details-info-content-items">
                <BsFillEnvelopeFill />
                <span>{data.Email}</span>
              </div>
            </div>
            <div className="col order-details-info-box">
              <h4>Thông tin nhận hàng</h4>

              <div className="order-details-info-content-items">
                <BsFillPersonFill />
                <span>{data.TenNguoiNhan}</span>
              </div>
              <div className="order-details-info-content-items">
                <BsPhone />
                <span>{data.SDTNguoiNhan}</span>
              </div>

              <div className="order-details-info-content-items">
                <BsFillGeoAltFill />
                <span>{data.DiaChi}</span>-<span>{data.Xa}</span>-
                <span>{data.Huyen}</span>-<span>{data.Tinh}</span>
              </div>
            </div>
            <div className="col-12 order-details-note">
              <h4>Ghi chú đơn hàng:</h4>
              <span>{data.GhiChu}</span>
            </div>
            <div className="col-12 order-details-pay">
              <span>Hình thức thanh toán:</span>
              <span>{data.PhuongThucThanhToan}</span>
            </div>
          </div>
          <div className="row">
            <div className="col-2 order-details-text-images">Hình ảnh</div>
            <div className="col-8 order-details-text-details">Chi tiết</div>
          </div>
          <div className="row">
            {orders.map((item) => (
              <div className="col-12 order-details-box">
                <ProductImage item={item} />

                <div className="col8">
                  <ProductName item={item} />
                  <div className="order-details-quantity">
                    <span>Đơn giá:</span>
                    <span>{item.SoLuong}</span>
                  </div>
                  <div className="order-details-price">
                    <span>Thành tiền:</span>
                    <span>
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(item.ThanhTien)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="order-details-total-amount">
            <span>Tổng tiền cần thanh toán:</span>
            <span>
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(data.TongTien)}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetails;

const ProductImage = ({ item }) => {
  const [product, setProduct] = useState([]);
  const PF = "http://localhost:8800/upload/";

  useEffect(() => {
    const fetchAllProduct = async () => {
      try {
        const res = await makeRequest.get(`/sanpham/${item.MaSanPham}`);
        setProduct(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllProduct();
  }, [item.MaSanPham]);

  return (
    <div className="order-details-images col-2">
      <img src={PF + product?.HinhAnh1} alt="" className="main-img" />
      <img src={PF + product?.HinhAnh2} alt="" className="second-img" />
    </div>
  );
};

const ProductName = ({ item }) => {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    const fetchAllProduct = async () => {
      try {
        const res = await makeRequest.get(`/sanpham/${item.MaSanPham}`);
        setProduct(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllProduct();
  }, [item.MaSanPham]);

  return (
    <div className="order-details-name">
      <h4>{product.TenSanPham}</h4>
    </div>
  );
};
