import React, { useContext, useEffect } from "react";
import "./InfoPersonal.scss";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import {
  BsFileEarmarkFill,
  BsPencilSquare,
  BsKeyFill,
  BsFileEarmarkText,
  BsClock,
  BsFillPersonFill,
  BsPhone,
  BsEyeFill,
} from "react-icons/bs";
import { useState } from "react";
import { Link } from "react-router-dom";
import { makeRequest } from "../../axios";
import { AuthContext } from "../../context/authContext";
import moment from "moment";

const item = [
  {
    name: "Trang chủ",
    link: "/",
  },
  {
    name: "Thông tin cá nhân",
    link: "/thong-tin-ca-nhan",
  },
];

const InfoPersonal = () => {
  const [toggle, setToggle] = useState(1);
  const [data, setData] = useState([]);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const res = await makeRequest.get(
          `/nguoidung/${currentUser.MaNguoiDung}`
        );
        setData(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllData();
  }, [currentUser.MaNguoiDung]);

  function updateToggle(id) {
    setToggle(id);
  }
  return (
    <>
      <Breadcrumb item={item} />
      <div className="info-personal">
        <div className="row">
          <div className="col-3">
            <div className="info-personal-list">
              <div className="info-personal-item disabled">
                QUẢN LÝ GIAO DỊCH
              </div>
              <div
                className={
                  toggle === 1
                    ? "info-personal-item active"
                    : "info-personal-item"
                }
                onClick={() => updateToggle(1)}
              >
                <BsFileEarmarkFill />
                Đơn hàng của bạn
              </div>
              <div className="info-personal-item disabled">
                QUẢN LÝ TÀI KHOẢN
              </div>
              <div
                className={
                  toggle === 2
                    ? "info-personal-item active"
                    : "info-personal-item"
                }
                onClick={() => updateToggle(2)}
              >
                <BsPencilSquare />
                Thông tin tài khoản
              </div>
              <div
                className={
                  toggle === 3
                    ? "info-personal-item active"
                    : "info-personal-item"
                }
                onClick={() => updateToggle(3)}
              >
                <BsKeyFill />
                Đổi mật khẩu
              </div>
            </div>
          </div>
          <div className="col-9">
            <div className={toggle === 1 ? "show-order-tab" : "order-tab"}>
              <OrderTab />
            </div>
            <div className={toggle === 2 ? "show-order-tab" : "order-tab"}>
              <PersonalTab data={data} />
            </div>
            <div className={toggle === 3 ? "show-order-tab" : "order-tab"}>
              <ChangePasswordTab />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InfoPersonal;

const OrderTab = () => {
  const [data, setData] = useState([]);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const res = await makeRequest.get(`/donhang/nguoidung/2}`);
        setData(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllData();
  }, [currentUser.MaNguoiDung]);

  return (
    <>
      <div className="order-tab-title">
        <h4>Quản lý giao dịch</h4>
      </div>

      {data.length > 0
        ? data.map((data) => (
            <div className="order-tab-item">
              <div className="order-tab-item-top row">
                <div className="col-8">
                  <div className="code-order">
                    <BsFileEarmarkText />
                    <span>{data.MaDonHang}</span>
                  </div>
                  <div className="time-order">
                    <BsClock />
                    <span>
                      {" "}
                      {moment(data.NgayTao).format("HH:mm DD/MM/YYYY")}
                    </span>
                  </div>
                </div>
                <div className="col-3">
                  <div className="total-amount">
                    <span>Tổng tiền:</span>
                    <span>
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(data.TongTien)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="order-tab-item-bottom row">
                <div className="col-8">
                  <div className="personal-item">
                    <BsFillPersonFill />
                    <span>{data.TenNguoiNhan}</span>
                  </div>

                  <div className="phone-item">
                    <BsPhone />
                    <span>{data.SDTNguoiNhan}</span>
                  </div>
                </div>
                <div className="col-3">
                  <Link
                    to={`/chi-tiet-don-hang/${data.MaDonHang}`}
                    className="order-button links"
                  >
                    <BsEyeFill />
                    Xem chi tiết
                  </Link>
                </div>
              </div>
            </div>
          ))
        : "Không có thông tin cho loại dữ liệu này"}
    </>
  );
};

const PersonalTab = ({ data }) => {
  return (
    <>
      <div className="order-tab-title">
        <h4>Thông tin tài khoản</h4>
      </div>
      <div className="row">
        <div className="col-3">Tên truy cập:</div>
        <div className="col-md-9 contact-form">
          <input
            type="text"
            className="form-control"
            placeholder="Tên truy cập"
            value={data.TenTruyCap}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-3">Email:</div>
        <div className="col-md-9 contact-form">
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            value={data.Email}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-3">Họ và tên:</div>
        <div className="col-md-9 contact-form">
          <input
            type="text"
            className="form-control"
            placeholder="Họ và tên"
            value={data.HoVaTen}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-3">Điện thoại:</div>
        <div className="col-md-9 contact-form">
          <input
            type="text"
            className="form-control"
            placeholder="Điện thoại"
            value={data.SoDienThoai}
          />
        </div>
      </div>

      <div className="row">
        <div className="col-3">Địa chỉ:</div>
        <div className="col-md-9 contact-form">
          <input
            type="text"
            className="form-control"
            placeholder="Địa chỉ"
            value={data.DiaChi}
          />
        </div>
      </div>

      <button className="tab-button">Lưu thông tin</button>
    </>
  );
};

const ChangePasswordTab = () => {
  return (
    <>
      <div className="order-tab-title">
        <h4>Đổi mật khẩu</h4>
      </div>
      <div className="row">
        <div className="col-3">Mật khẩu cũ:</div>
        <div className="col-md-9 contact-form">
          <input
            type="password"
            className="form-control"
            placeholder="******"
          />
        </div>
      </div>

      <div className="row">
        <div className="col-3">Mật khẩu mới:</div>
        <div className="col-md-9 contact-form">
          <input
            type="password"
            className="form-control"
            placeholder="******"
          />
        </div>
      </div>

      <div className="row">
        <div className="col-3">Nhập lại mật khẩu:</div>
        <div className="col-md-9 contact-form">
          <input
            type="password"
            className="form-control"
            placeholder="******"
          />
        </div>
      </div>

      <button className="tab-button">Đổi mật khẩu</button>
    </>
  );
};
