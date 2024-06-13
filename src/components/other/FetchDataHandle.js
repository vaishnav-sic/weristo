import React from "react";
import { Skeleton, Empty } from "antd";

export default function FetchDataHandle({
  data,
  errorMessage = "Get products fail, please try again",
  emptyDescription = "No product in this category",
  renderData,
}) {
  if (data.loading) {
    return <Skeleton active />;
  } else if (data.error) {
    return <h3>{errorMessage}</h3>;
  } else if (Array.isArray(data) && data.length > 0) {
    return renderData && renderData(data);
  } else if (data.data && data.data.length > 0) {
    return renderData && renderData(data.data);
  } else {
    return (
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description={emptyDescription}
      />
    );
  }
}
