import axios from "axios";
import React, { useEffect, useState } from "react";

const SelectAddress = () => {
  const [provinces, setProvinces] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [wards, setWards] = useState([]);

  useEffect(() => {
    // Gọi API để lấy danh sách các tỉnh thành
    axios
      .get("https://provinces.open-api.vn/api/p")
      .then((response) => {
        setProvinces(response.data);
      })
      .catch((error) => {
        console.error("Lỗi khi tìm nạp tỉnh:", error);
      });

    if (selectedProvince !== "") {
      // Gọi API để lấy danh sách các quận huyện của tỉnh đã chọn
      axios
        .get(`https://provinces.open-api.vn/api/p/${selectedProvince}?depth=2`)
        .then((response) => {
          setDistricts(response.data.districts);
        })
        .catch((error) => {
          console.error("Lỗi khi tìm nạp quận:", error);
        });
    }

    if (selectedDistrict !== "") {
      // Gọi API để lấy danh sách các xã phường của quận huyện đã chọn
      axios
        .get(`https://provinces.open-api.vn/api/d/${selectedDistrict}?depth=2`)
        .then((response) => {
          setWards(response.data.wards);
        })
        .catch((error) => {
          console.error("Lỗi khi tìm nạp phường:", error);
        });
    }
  }, [selectedProvince, selectedDistrict]);

  const handleProvinceChange = (event) => {
    setSelectedProvince(event.target.value);
    setSelectedDistrict("");
  };

  const handleDistrictChange = (event) => {
    setSelectedDistrict(event.target.value);
  };

  return (
    <>
      <div className="col-md-12">
        <select
          value={selectedProvince}
          onChange={handleProvinceChange}
          className="form-control"
        >
          <option value="">Tỉnh/Thành</option>
          {provinces.map((province) => (
            <option key={province.code} value={province.code}>
              {province.name}
            </option>
          ))}
        </select>
      </div>
      <div className="col-md-12">
        <select
          value={selectedDistrict}
          onChange={handleDistrictChange}
          className="form-control"
        >
          <option value="">Chọn Quận/Huyện</option>
          {districts.map((district) => (
            <option key={district.code} value={district.code}>
              {district.name}
            </option>
          ))}
        </select>
      </div>
      <div className="col-md-12">
        <select className="form-control">
          <option value="">Chọn Phường/Xã</option>
          {wards.map((ward) => (
            <option key={ward.code} value={ward.code}>
              {ward.name}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default SelectAddress;
