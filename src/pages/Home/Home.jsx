import React, { useEffect, useState } from "react";
import "./Home.scss";
import Slider from "../../components/Slider/Slider";
import FeaturedProducts from "../../components/FeaturedProducts/FeaturedProducts";
import Card from "../../components/Card/Card";
import { makeRequest } from "../../axios";

const Home = () => {
  const [product, setProduct] = useState([]);
  useEffect(() => {
    const fetchAllProduct = async () => {
      try {
        const res = await makeRequest.get("/sanpham/hienthi");
        setProduct(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllProduct();
  }, []);
  return (
    <div className="home">
      <Slider />
      <div className="home-products">
        <div className="home-products-top">
          <h3 className="home-products-title">SẢN PHẨM MỚI TỪ CHÚNG TÔI</h3>
          <span className="home-products-desc">
            Kính mắt thời trang Eyemax Store là thương hiệu uy tín, chất lượng
            tại Việt Nam phục vụ nhu cầu mua sắm online và trực tuyến trên toàn
            quốc
          </span>
        </div>
        <div className="home-products-bottom">
          <div className="home-products-list">
            {product.slice(0, 8).map((data) => (
              <Card type="card" data={data} key={data.MaSanPham} />
            ))}
          </div>
        </div>
      </div>
      <div className="home-banner">
        <img src="../../../img/banner-supper-combo.jpg" alt="" />
      </div>
      <FeaturedProducts
        title="Kính Cận Thời Trang: Nâng Tầm Vẻ Đẹp Của Bạn"
        images="../../../img/banner-kinh-can.png"
        category="Gọng kính cận"
      />
      <FeaturedProducts
        title="Khám Phá Bộ Sưu Tập Kính Râm Đẳng Cấp!"
        images="../../../img/banner-kinh-ram.png"
        category="Gọng kính râm"
      />

      <div className="home-feedback">
        <img src="../../../img/feedback-1.jpeg" alt="" />
        <img src="../../../img/feedback-2.jpeg" alt="" />
        <img src="../../../img/feedback-3.jpeg" alt="" />
        <img src="../../../img/feedback-4.jpeg" alt="" />
        <img src="../../../img/feedback-5.jpeg" alt="" />
        <img src="../../../img/feedback-6.jpeg" alt="" />
      </div>
    </div>
  );
};

export default Home;
