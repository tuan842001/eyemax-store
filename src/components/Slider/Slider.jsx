import React from "react";
import "./Slider.scss";
import { Link } from "react-router-dom";

const Slider = () => {
  const data = ["https://firebasestorage.googleapis.com/v0/b/eyemax-store.appspot.com/o/images%2Fslider-1.png?alt=media&token=2b17e4e7-d567-4beb-9774-4a0e40c25ee5", "https://firebasestorage.googleapis.com/v0/b/eyemax-store.appspot.com/o/images%2Fslider-2.png?alt=media&token=1f315239-5aca-46b7-8220-8e0269e24eef"];

  return (
    <div
      id="carouselExampleAutoplaying"
      className="carousel"
      data-bs-ride="carousel"
    >
      <div className="carousel-inner">
        <div className="carousel-item active slider">
          <img src={data[0]} className="d-block w-100" alt="..." />
          <Content />
          <div className="gf"></div>
        </div>
        <div className="carousel-item slider">
          <img src={data[1]} className="d-block w-100" alt="..." />
          <Content />
          <div className="gf"></div>
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleAutoplaying"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleAutoplaying"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Slider;

const Content = () => {
  return (
    <div className="slider-content">
      <Link className="links" to="/san-pham">
        <h2 className="slider-title">Kính mắt thời trang chính hãng</h2>
      </Link>

      <span className="slider-desc">
        Chất lượng và uy tín đặt hàng đầu, luôn nâng cao dịch vụ sau bán hàng,
        tiếp thu ý kiến đóng góp tích cực của mọi người nhằm phục vụ khách hàng
        tốt hơn
      </span>
      <Link className="slider-button links" to="/san-pham">
        Mua sắm ngay
      </Link>
    </div>
  );
};
