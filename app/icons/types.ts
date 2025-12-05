import React from "react";

export interface IconProps {
  className?: string;
  style?: React.CSSProperties;
}

export type IconComponent = React.ComponentType<IconProps>;
