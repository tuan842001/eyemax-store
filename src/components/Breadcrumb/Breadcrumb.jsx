import React from "react";
import "./Breadcrumb.scss";
import { NavLink } from "react-router-dom";

const Breadcrumb = ({ item }) => {
  return (
    <div className="breadcrumb">
      <ul className="breadcrumb-list">
        {item.map((item, index) => (
          <li className="breadcrumb-item" key={index}>
            <NavLink className="nav-link" to={item.link}>
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Breadcrumb;
