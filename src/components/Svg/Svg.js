import React from "react";

export const Svg = ({ style, SVG, alt }) => {
  //   return <img src={SVG} alt={alt} className={style} />;
  return <SVG width={style.width} height={style.height} fill={style.fill} />;
};
