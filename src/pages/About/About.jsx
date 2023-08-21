import React from "react";
import "./About.scss";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
const item = [
  {
    name: "Trang chủ",
    link: "/",
  },
  {
    name: "Giới thiệu",
    link: "/gioi-thieu",
  },
];

const About = () => {
  return (
    <div className="about">
      <Breadcrumb item={item} />
      <div className="about-top">
        <h2>VỀ CHÚNG TÔI</h2>
        <span className="about-desc">
          Tầm nhìn - Sứ mệnh - Giá trị cốt lõi của Eyemax Store
        </span>
        <div className="about-widget">
          <div className="row">
            <div className="col">
              <h3 className="widget-title">Tầm nhìn</h3>
              <span>
                Kính mắt thời trang Eyemax Store là thương hiệu uy tín, chất
                lượng tại Việt Nam phục vụ nhu cầu mua sắm online và trực tuyến
                trên toàn quốc. Quyền lợi của mọi khách hàng đều được tư vấn
                nhiệt tình, đưa sự gợi ý tốt nhất về dòng sản phẩm phù hợp.
              </span>
            </div>
            <div className="col">
              <h3 className="widget-title">Sứ mệnh</h3>
              <span>
                Sứ mệnh của Eyemax Store là đem đến tầm nhìn hoàn hảo và sức
                khỏe thị lực cho mọi người. Chúng tôi cam kết cung cấp sản phẩm
                kính mắt chất lượng và tư vấn chuyên nghiệp để mang lại sự tự
                tin và hài lòng cho khách hàng. Đồng thời, chúng tôi thúc đẩy
                nhận thức về quan trọng của việc bảo vệ thị lực để cùng nhau xây
                dựng cuộc sống tốt hơn cho mọi người.
              </span>
            </div>
            <div className="col">
              <h3 className="widget-title">Giá trị cốt lõi</h3>
              <span>
                Eyemax Store tự hào về ba giá trị cốt lõi: Hoàn hảo trong chất
                lượng sản phẩm, tận tâm trong dịch vụ khách hàng và sự sáng tạo
                đa dạng. Chúng tôi cũng cam kết tăng cường hiểu biết về thị lực
                và mang lại sự tự tin thông qua tầm nhìn hoàn hảo.
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="about-bottom">
        <div className="row">
          <div className="col">
            <img
              src="../../../img/gong-kinh-can.jpg"
              alt=""
              className="about-img"
            />
          </div>
          <div className="col">
            <span className="about-text">
              <p>
                Chào mừng bạn đến với trang web chính thức của Eyemax Store -
                nơi bạn có thể khám phá và trải nghiệm sự hoàn hảo và phong cách
                trong thế giới thị giác ngay trên màn hình của bạn.
              </p>
              <p>
                Tại trang web của Eyemax Store, chúng tôi tự hào giới thiệu một
                bộ sưu tập đa dạng và đẳng cấp về các sản phẩm kính mắt từ những
                thương hiệu hàng đầu trên thị trường. Từ những thiết kế đơn giản
                và tinh tế đến những phong cách độc đáo và sáng tạo, bạn sẽ dễ
                dàng tìm thấy chiếc kính mắt hoàn hảo thể hiện phong cách cá
                nhân của mình.
              </p>
              <p>
                Không chỉ dừng lại ở việc mua sắm, trang web của chúng tôi còn
                cung cấp những thông tin hữu ích về cách chăm sóc và bảo vệ sức
                khỏe mắt của bạn. Bạn có thể tìm hiểu thêm về các loại kính mắt,
                cách lựa chọn phù hợp, và những điều cần lưu ý để duy trì thị
                lực tốt nhất.
              </p>
              <p>
                Với giao diện trực quan và dễ sử dụng, trang web của Eyemax
                Store giúp bạn dễ dàng duyệt qua các danh mục sản phẩm, xem chi
                tiết và thậm chí thử kính mắt ảo để xem trước cách chúng sẽ
                trông trên khuôn mặt của bạn.
              </p>
              <p>
                Hãy tham gia cùng chúng tôi trên trang web để khám phá những
                trải nghiệm thú vị và đảm bảo rằng bạn luôn có tầm nhìn hoàn hảo
                và phong cách trong mọi tình huống.
              </p>
            </span>
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default About;
