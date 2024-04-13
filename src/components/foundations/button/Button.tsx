import React, { forwardRef } from "react";
import { ButtonProps } from "../../../types/foundationTypes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      onClick,
      children,
      type = "button",
      className,
      disabled = false,
      dataType,
      icon,
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        type={type}
            className={`${className} ${disabled ? disabled : ""}`}
        onClick={onClick}
        disabled={disabled}
        datatype={dataType}
      >
        {icon && (<FontAwesomeIcon className="btnIcon" icon={icon as IconProp} />
        )}
        {children && <span>{children}</span>}
      </button>
    );
  },
);

export default Button;
