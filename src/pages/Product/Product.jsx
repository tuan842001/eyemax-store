import React, { useEffect, useState } from "react";
import "./Product.scss";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import { BsFillSuitHeartFill } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { makeRequest } from "../../axios";
import DOMPurify from "dompurify";

const Product = () => {
  const id = useParams().id;
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState([]);
  const [selectedImg, setSelectedImg] = useState("HinhAnh1");
  const PF = "http://localhost:8800/upload/";

  useEffect(() => {
    const fetchAllProduct = async () => {
      try {
        const res = await makeRequest.get(`/sanpham/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllProduct();
  }, [id]);

  const item = [
    {
      name: "Trang chủ",
      link: "/",
    },
    {
      name: "Sản phẩm",
      link: "/san-phams",
    },
    {
      name: `${product.TenSanPham}`,
      link: `/san-pham/${id}`,
    },
  ];

  return (
    <>
      <Breadcrumb item={item} />
      <div className="product">
        <>
          <div className="product-top">
            <div className="row">
              <div className="col">
                <div className="product-images">
                  <img src={PF + product[selectedImg]} alt="" />
                </div>
                <div className="select-img">
                  <div
                    className={
                      selectedImg === product?.HinhAnh1
                        ? "select-img-chilren select-img-active"
                        : "select-img-chilren"
                    }
                  >
                    <img
                      src={PF + product.HinhAnh1}
                      alt=""
                      onClick={(e) => setSelectedImg("HinhAnh1")}
                    />
                  </div>
                  <div
                    className={
                      selectedImg === product.HinhAnh2
                        ? "select-img-chilren select-img-active"
                        : "select-img-chilren"
                    }
                  >
                    <img
                      src={PF + product.HinhAnh2}
                      alt=""
                      onClick={(e) => setSelectedImg("HinhAnh2")}
                    />
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="product-content">
                  <div className="product-title">
                    <h2>{product.TenSanPham}</h2>
                  </div>
                  <div className="product-price">
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(product.Gia)}
                  </div>
                  <div className="product-info">
                    <ul>
                      <li>
                        <span>Mã sản phẩm:</span>
                        <span>{product.MaSanPham}</span>
                      </li>
                      <li>
                        <span>Chất liệu:</span>
                        <span>{product.ChatLieu}</span>
                      </li>
                      <li>
                        <span>Hình dáng:</span>
                        <span>{product.HinhDang}</span>
                      </li>
                    </ul>
                  </div>
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
                  <div className="product-button">
                    <button className="product-add-cart">Thêm giỏ hàng</button>
                    <button className="product-add-like">
                      <BsFillSuitHeartFill />
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-4">
                <div className="product-text">
                  <p>
                    Đổi Mới Miễn Phí Trong Vòng 7 Ngày.
                    <br />
                    Đổi Và Bảo Hành Cực Dễ, Chỉ Cần Số Điện Thoại.
                    <br />
                    Giao Hàng Toàn Quốc.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="product-center">
            <div className="product-center-title">
              <h2>Mô Tả Sản Phẩm</h2>
            </div>
            <div className="product-desc row">
              {/* <div className="col">{getText(product.MoTa)}</div> */}
              <div className="col">
                <p
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(product.MoTa),
                  }}
                ></p>
              </div>
              <div className="col">
                <div className="product-desc-imges">
                  <div className="product-desc-text">
                    <span>{product.ChatLieu}</span>
                  </div>
                  <img src="../../../img/info-product.png" alt="" />
                </div>
              </div>
            </div>
          </div>
          <div className="product-bottom"></div>
        </>
      </div>
    </>
  );
};

export default Product;
