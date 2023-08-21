import React, { useEffect, useState } from "react";
import "./Products.scss";
import Card from "../../components/Card/Card";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import { makeRequest } from "../../axios";

const item = [
  {
    name: "Trang chủ",
    link: "/",
  },
  {
    name: "Sản phẩm",
    link: "/san-phams",
  },
];

const Products = () => {
  const [material, setMaterial] = useState([]);
  const [shape, setShape] = useState([]);
  const [category, setCategory] = useState([]);
  const [product, setProduct] = useState([]);
  const [sort, setSort] = useState("asc");

  // const [query, setQuery] = useState("");
  useEffect(() => {
    const fetchAllProduct = async () => {
      try {
        const res = await makeRequest.get(`/sanpham`);
        setProduct(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllProduct();

    const fetchAllSuppliers = async () => {
      try {
        const res = await makeRequest.get("/chatlieu");
        setMaterial(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllSuppliers();

    const fetchAllShape = async () => {
      try {
        const res = await makeRequest.get("/hinhdang");
        setShape(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllShape();

    const fetchAllCategory = async () => {
      try {
        const res = await makeRequest.get("/danhmuc");
        setCategory(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllCategory();
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 9;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = product.slice(firstIndex, lastIndex);
  const npage = Math.ceil(product.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  return (
    <>
      <Breadcrumb item={item} />
      <div className="products">
        <div className="products-left col-9">
          <div className="products-header">
            <div className="products-sort">
              <label>Sắp xếp</label>
              <select value={sort} onChange={(e) => setSort(e.target.value)}>
                <option id="asc" value="asc" name="asc">
                  Mặc định
                </option>
                <option id="asc" value="asc" name="asc">
                  Sắp xếp theo tên (A-Z)
                </option>
                <option id="desc" value="desc" name="desc">
                  Sắp xếp theo tên (Z-A)
                </option>
                <option value="3">{"Sắp xếp theo giá (Nhỏ -> Lớn)"}</option>
                <option value="4">{"Sắp xếp theo giá (Lớn -> Nhỏ)"}</option>
              </select>
            </div>
          </div>
          <div className="products-box">
            {records.map((data) => (
              <Card data={data} key={data.MaSanPham} type="card" />
            ))}
          </div>

          <div className="products-pagging">
            <nav aria-label="Page navigation example">
              <ul className="pagination">
                {numbers.map((n, i) => (
                  <li
                    className={`page-item ${currentPage === n ? "active" : ""}`}
                    key={i}
                  >
                    <div className="page-link" onClick={() => changePage(n)}>
                      {n}
                    </div>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
        <div className="products-right col-3">
          <div className="products-filter">
            <h2>TÌM KIẾM</h2>
            <div className="products-form">
              <input
                type="text"
                placeholder="Nhập từ khoá..."
                // onChange={(e) => setQuery(e.target.value.toLowerCase())}
              />
            </div>
          </div>

          <div className="products-filter">
            <h2>Chất liệu</h2>
            {material.map((data) => (
              <div className="products-input" key={data.MaChatLieu}>
                <input
                  type="checkbox"
                  value={data.TenChatLieu}
                  id={data.TenChatLieu}
                />
                <label htmlFor={data.TenChatLieu}>{data.TenChatLieu}</label>
              </div>
            ))}
          </div>

          <div className="products-filter">
            <h2>Hình dáng</h2>
            {shape.map((data) => (
              <div className="products-input" key={data.MaHinhDang}>
                <input
                  type="checkbox"
                  value={data.TenHinhDang}
                  id={data.TenHinhDang}
                />
                <label htmlFor={data.TenHinhDang}>{data.TenHinhDang}</label>
              </div>
            ))}
          </div>

          <div className="products-filter">
            <h2>Danh mục</h2>
            {category.map((data) => (
              <div className="products-input" key={data.MaDanhMuc}>
                <input
                  type="checkbox"
                  value={data.TenDanhMuc}
                  id={data.TenDanhMuc}
                />
                <label htmlFor={data.TenDanhMuc}>{data.TenDanhMuc}</label>
              </div>
            ))}
          </div>

          <div className="products-filter">
            <h2>Khoảng giá</h2>
            <div className="products-input">
              <input type="checkbox" value="100-200" id="100-200" />
              <label htmlFor="100-200">100.000đ — 200.000đ</label>
            </div>
            <div className="products-input">
              <input type="checkbox" value="200-300" id="200-300" />
              <label value="200-300" htmlFor="200-300">
                200.000đ — 300.000đ
              </label>
            </div>
            <div className="products-input">
              <input type="checkbox" value="300-500" id="300-500" />
              <label htmlFor="300-500">300.000đ — 500.000đ</label>
            </div>
            <div className="products-input">
              <input type="checkbox" value="500-1000" id="500-1000" />
              <label htmlFor="500-1000">500.000đ — 10.000.000đ</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  function changePage(id) {
    setCurrentPage(id);
  }
};

export default Products;
