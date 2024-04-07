import React, { useEffect } from "react";
import { ActivityConstructorProps } from "../../types/structureTypes";
import { useViewTitle } from "../../contexts/ViewTitleContexts";

const TestBench: React.FC<ActivityConstructorProps> = () => {
    const { setTitle } = useViewTitle();
    useEffect(() => {
        setTitle("Test Bench3");
    }, [setTitle]);
  return <></>;
};

export default TestBench;
