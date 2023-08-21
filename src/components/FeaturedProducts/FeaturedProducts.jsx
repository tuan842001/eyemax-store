import React, { useEffect, useState } from "react";
import "./FeaturedProducts.scss";
import Card from "../Card/Card";
import { makeRequest } from "../../axios";

const FeaturedProducts = ({ title, images, category }) => {
  const [product, setProduct] = useState([]);
  useEffect(() => {
    const fetchAllProduct = async () => {
      try {
        const res = await makeRequest.get(`/sanpham/danhmuc/${category}`);
        setProduct(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllProduct();
  }, [category]);
  return (
    <div className="featured-products">
      <div className="featured-products-top">
        <h3 className="featured-products-title">{title}</h3>
        <span className="featured-products-desc">
          Kính mắt thời trang Eyemax Store là thương hiệu uy tín, chất lượng tại
          Việt Nam phục vụ nhu cầu mua sắm online và trực tuyến trên toàn quốc
        </span>
      </div>
      <div className="featured-products-bottom">
        <div className="row featured-products-row">
          <div className="col featured-products-images">
            <img src={images} alt="" />
          </div>
          <div className="col featured-products-list">
            {product.slice(0, 4).map((data) => (
              <Card type="card-small" data={data} key={data.MaSanPham} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;
