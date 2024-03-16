/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import { OptionListProps } from "../../../types/foundationTypes";
import Button from "../button/Button";
import styles from "./OptionList.module.css";

const OptionList: React.FC<OptionListProps> = ({ options, dataType }) => {
  const [visibleOptions, setVisibleOptions] = useState(options);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateVisibleOptions = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        let totalWidth = 0;
        let visibleCount = 0;

        options.forEach((option, index) => {
          const optionWidth = 150;
          if (totalWidth + optionWidth <= containerWidth) {
            totalWidth += optionWidth;
            visibleCount++;
          } else {
            return;
          }
        });

        setVisibleOptions(options.slice(0, visibleCount));
      }
    };

    updateVisibleOptions();

    const resizeObserver = new ResizeObserver(updateVisibleOptions);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [options]);

  if (!Array.isArray(options) && process.env.REACT_APP_IS_DEBUG) {
    console.error(
      'OptionList component expects "options" prop to be an array.',
    );
    return null;
  }

  if (options.length) {
    return (
        <div ref={containerRef} className={styles.optionList}>
        {visibleOptions.map((option, index) => (
          <Button
                key={index}
                onClick={(e) => {
                    const input = document.querySelector(`input#${dataType}`) as HTMLInputElement;

                    if (input) {
                        input.value = option.key;
                    }
                }}
          >
            {option.key}
          </Button>
        ))}
      </div>
    );
  }
  return null;
};

export default OptionList;
