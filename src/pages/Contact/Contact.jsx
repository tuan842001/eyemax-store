/* eslint-disable jsx-a11y/iframe-has-title */
import React, { useState } from "react";
import "./Contact.scss";
import {
  BsSendFill,
  BsGeoAltFill,
  BsTelephoneFill,
  BsEnvelopeFill,
} from "react-icons/bs";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import { makeRequest } from "../../axios";
import Swal from "sweetalert2";

const item = [
  {
    name: "Trang chủ",
    link: "/",
  },
  {
    name: "Liên hệ",
    link: "/lien-he",
  },
];

const Contact = () => {
  const [HoVaTen, setHoVaTen] = useState("");
  const [Email, setEmail] = useState("");
  const [SoDienThoai, setSoDienThoai] = useState("");
  const [DiaChi, setDiaChi] = useState("");
  const [NoiDung, setNoiDung] = useState("");

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await makeRequest.post(`/lienhe`, {
        HoVaTen,
        Email,
        SoDienThoai,
        DiaChi,
        NoiDung,
      });
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });

      Toast.fire({
        icon: "success",
        title: "Gửi thông tin thành công",
      });

      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="contact">
      <Breadcrumb item={item} />
      <div className="row contact-row">
        <div className="contact-left col">
          <span className="contact-title">GỬI THÔNG TIN CHO CHÚNG TÔI!</span>
          <form className="row g-3">
            <div className="col-md-6 contact-form">
              <input
                type="text"
                className="form-control"
                placeholder="Họ và tên"
                value={HoVaTen}
                onChange={(e) => setHoVaTen(e.target.value)}
              />
            </div>
            <div className="col-md-6 contact-form">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="col-md-6 contact-form">
              <input
                type="text"
                className="form-control"
                placeholder="Số điện thoại"
                value={SoDienThoai}
                onChange={(e) => setSoDienThoai(e.target.value)}
              />
            </div>
            <div className="col-md-6 contact-form">
              <input
                type="text"
                className="form-control"
                placeholder="Địa chỉ"
                value={DiaChi}
                onChange={(e) => setDiaChi(e.target.value)}
              />
            </div>

            <div className="mb-3 contact-form">
              <textarea
                className="form-control"
                placeholder="Nội dung"
                rows="6"
                value={NoiDung}
                onChange={(e) => setNoiDung(e.target.value)}
              ></textarea>
            </div>
            <div className="col-12">
              <button
                type="submit"
                className="contact-btn btn"
                onClick={handleClick}
              >
                <BsSendFill />
                Gửi đi
              </button>
            </div>
          </form>
        </div>
        <div className="contact-right col">
          <span className="contact-title">THÔNG TIN LIÊN HỆ</span>
          <ul>
            <li>
              <span>
                <BsGeoAltFill />
                <b>Địa chỉ:</b>
              </span>
              <p>Tân Thịnh, Thành phố Thái Nguyên, Thái Nguyên</p>
            </li>
            <li>
              <span>
                <BsTelephoneFill />
                <b>Điện thoại:</b>
              </span>
              <p>0966245700</p>
            </li>
            <li>
              <span>
                <BsEnvelopeFill />
                <b>Email:</b>
              </span>
              <p>eyemaxstore@gmail.com</p>
            </li>
          </ul>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d927.5165272314664!2d105.80920296955298!3d21.583342445834507!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313527391366af8d%3A0x7e0fe4b1b03bbeaa!2zMTE0IMSQxrDhu51uZyBaIDExNSwgVMOibiBUaOG7i25oLCBUaMOgbmggcGjhu5EgVGjDoWkgTmd1ecOqbiwgVGjDoWkgTmd1ecOqbiwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2sus!4v1691202224902!5m2!1svi!2sus"
            className="contact-maps"
            width="585"
            height="300"
            style={{ border: "0" }}
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;
