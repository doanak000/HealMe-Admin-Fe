import React from "react";
import { Card, Image } from "antd";
const { Meta } = Card;

const ProfileCard = () => {
  return (
    <Card
      hoverable
      style={{
        width: 240,
      }}
      className="bg-primary w-100"
      cover={
        <div className="text-center my-2">
          <p className="fs-4 fw-bold text-white mb-0">Khách Hàng</p>
          <Image src="https://picsum.photos/200" className="w-50" />
        </div>
      }
    >
      <Meta
        title={<span>1000 coin</span>}
        description={<span className="text-warning fw-bold">VIP</span>}
        className="text-center bg-light rounded py-2"
      />
    </Card>
  );
};

export default ProfileCard;
