import React from "react";

const FormatMoney = ({ number }) => {
  const formatNumber = (num) => {
    return num
      ? num.toLocaleString("en-US", {
          minimumFractionDigits: 3,
          maximumFractionDigits: 3,
        })
      : "0";
  };

  return <span>{formatNumber(number)}</span>;
};

export default FormatMoney;
