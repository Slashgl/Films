import React from "react";
import "./Header.css";
import {Tabs} from "antd";

const Header = ({changeTab}) => {
    const { TabPane } = Tabs
  return (
    <>
      <div className="header">
        <Tabs defaultActiveKey="1" onChange={changeTab}>
          <TabPane tab="Search" key="1"/>
          <TabPane tab="Rated" key="2"/>
        </Tabs>
      </div>
    </>
  );
};

export default Header;
