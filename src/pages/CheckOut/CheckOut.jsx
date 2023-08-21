import React, { useContext, useState } from "react";
import "./CheckOut.scss";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import { BsGeoAlt, BsCart3, BsFront } from "react-icons/bs";
import { useSelector } from "react-redux";
import { AuthContext } from "../../context/authContext";
import SelectAddress from "../../components/SelectAddress";

const item = [
  {
    name: "Trang chủ",
    link: "/",
  },
  {
    name: "Thanh toán",
    link: "/thanh-toan",
  },
];

const CheckOut = () => {
  const products = useSelector((state) => state.cart.products);
  const { currentUser } = useContext(AuthContext);
  const [HoVaTen, setHoVaTen] = useState(currentUser.HoVaTen);
  const [copiedText, setCopiedText] = useState("");
  const [Email, setEmail] = useState(currentUser.Email);
  const [SoDienThoai, setSoDienThoai] = useState(currentUser.SoDienThoai);

  const handleCopyClick = async () => {
    const textToCopy = [HoVaTen, SoDienThoai];
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopiedText(textToCopy);
      console.log("Đã sao chép văn bản vào khay nhớ tạm");
    } catch (error) {
      console.error("Lỗi sao chép vào khay nhớ tạm:", error);
    }
  };

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
      <div className="checkout">
        <div className="checkout-title">
          <h2>Thanh toán</h2>
        </div>
        <div className="row">
          <div className="col-7">
            <div className="checkout-title-chilren">
              <BsGeoAlt className="checkout-icon" />
              <h3>THÔNG TIN KHÁCH HÀNG</h3>
            </div>
            <div className="checkout-form">
              <div className="row">
                <div className="col">
                  <div className="checkout-item">
                    <div className="checkout-item-title">
                      <h3>NGƯỜI MUA HÀNG</h3>
                    </div>
                    <div className="col-md-12">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Họ và tên"
                        value={HoVaTen}
                        onChange={(e) => setHoVaTen(e.target.value)}
                      />
                    </div>
                    <div className="col-md-12">
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        value={Email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div className="col-md-12">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Điện thoại"
                        value={SoDienThoai}
                        onChange={(e) => setSoDienThoai(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="col">
                  <div className="checkout-item">
                    <div className="checkout-item-title">
                      <h3>NGƯỜI NHẬN HÀNG</h3>
                    </div>
                    <div className="col-md-12">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Họ và tên"
                        value={copiedText[0]}
                      />
                    </div>
                    <div className="col-md-12">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Điện thoại"
                        value={copiedText[1]}
                      />
                    </div>
                    <button onClick={handleCopyClick}>
                      <BsFront />
                      Sử dụng thông tin người mua hàng
                    </button>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <div className="checkout-item">
                    <div className="checkout-item-title">
                      <h3>ĐỊA CHỈ NHẬN HÀNG</h3>
                    </div>
                    <div className="col-md-12">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Địa chỉ"
                      />
                    </div>
                    <SelectAddress />
                  </div>
                </div>
                <div className="col">
                  <div className="checkout-item">
                    <div className="checkout-item-title">
                      <h3>HÌNH THỨC GIAO HÀNG</h3>
                    </div>
                    <div className="checkout-payment">
                      <input type="radio" id="cod" />
                      <label htmlFor="cod">
                        <img src="../../../img/method_bg_cod.png" alt="" />
                        Thanh toán khi nhận hàng
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-5">
            <div className="checkout-title-chilren">
              <BsCart3 className="checkout-icon" />
              <h3>THÔNG TIN ĐƠN HÀNG</h3>
            </div>
            <div className="checkout-form">
              <div className="payment-list">
                {products.map((item) => (
                  <PaymentItem item={item} key={item.MaSanPham} />
                ))}
              </div>
              <div className="box-price">
                <div className="box-price-item">
                  <span>Tạm tính</span>
                  <span>
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(totalPrice())}
                  </span>
                </div>
                <div className="box-price-item">
                  <span>Phí vận chuyển</span>
                  <span>
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(30000)}
                  </span>
                </div>
                <div className="box-price-item">
                  <span>Thành tiền</span>
                  <span>
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(totalPrice() + 30000)}
                  </span>
                </div>
              </div>
              <div className="mb-12">
                <textarea
                  className="form-control"
                  placeholder="Ghi chú"
                  rows="2"
                ></textarea>
              </div>
              <div className="mb-12">
                <button className="box-button">Thanh toán</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckOut;

const PaymentItem = ({ item }) => {
  const PF = "http://localhost:8800/upload/";
  return (
    <div className="payment-product-item">
      <div className="payment-product-image">
        <img src={PF + item?.HinhAnh1} alt="" />
      </div>
      <div className="payment-product-details">
        <div className="col-8 payment-product-name">
          <h3>{item.TenSanPham}</h3>
        </div>
        <div className="col">
          <div className="payment-product-quantity">
            <span>{item.SoLuong}</span>
            <p>x</p>
          </div>
          <div className="payment-product-price">
            <span>
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(item.Gia)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
