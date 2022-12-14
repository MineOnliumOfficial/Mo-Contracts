import React from "react";
import { Typography } from "antd";

const { Title, Text } = Typography;

// displays a page header

export default function Header({ link, title, subTitle, ...props }) {
  return (
    <div style={{  justifyContent: "space-between", padding: "1.2rem" }}>
      <div style={{   }}>
        <a href={link} target="_blank" rel="noopener noreferrer">
          <Title level={4} style={{ fontSize: "40px", margin: "1.5rem 0.5rem 0 0" }}>
            {title}
          </Title>
        </a>
        <Text type="secondary" style={{ fontSize: "2px", textAlign: "center" }}>
          {subTitle}
        </Text>
      </div>
      {props.children}
    </div>
  );
}

Header.defaultProps = {
  link: "https://github.com/MineOnliumOfficial",
  title: "",
  subTitle: "",
};
