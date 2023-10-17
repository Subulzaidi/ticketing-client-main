import { Descriptions } from "antd";
import DescriptionsItem from "antd/es/descriptions/Item";
import React from "react";
const resCol = {
  xs: 1,
  sm: 2,
  md: 3,
  lg: 3,
  xl: 4,
  xxl: 4,
};
const SingleDescription = ({ single, from }) => {
  let movedto = single?.movements?.find((x) => x.status === "handover");
  return (
    <Descriptions className="desc mt-2" bordered column={resCol}>
      <Descriptions.Item label={`Created By `}>
        {single.title}
      </Descriptions.Item>
      <Descriptions.Item label="CreatedAt">
        {single.createdAt?.slice(0, 10)}
      </Descriptions.Item>
      <Descriptions.Item label="Priority">{single.priority}</Descriptions.Item>
      <Descriptions.Item label="Category">
        {single.category?.name}
      </Descriptions.Item>
      {from !== "manager" && (
        <Descriptions.Item label="Handover by">
          {single?.pickedBy?.name}
        </Descriptions.Item>
      )}
      {from === "manager" && (
        <>
          <Descriptions.Item label="Picked by">
            {single?.pickedBy?.name}
          </Descriptions.Item>
          <Descriptions.Item label="Reason of escalation">
            {
              single?.pickedBy?.find(
                (x) => x.status === "escalated" && x.movedto === null
              ).why
            }
          </Descriptions.Item>
        </>
      )}
    </Descriptions>
  );
};

export default SingleDescription;
