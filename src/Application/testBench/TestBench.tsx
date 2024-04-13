import React, { useEffect } from "react";
import { ActivityConstructorProps } from "../../types/structureTypes";
import { useViewTitle } from "../../contexts/ViewTitleContexts";
import DisplayGrid from "../../components/structure/viewChildren/displayGrid/DisplayGrid";
import { spotifySearch } from "../../hooks/dataManagement/search";

const TestBench: React.FC<ActivityConstructorProps> = () => {
  const { setTitle } = useViewTitle();
  const search = spotifySearch("album", "DAMN.");
  useEffect(() => {
    setTitle("Test Bench");
  }, [setTitle]);

  return (
    <DisplayGrid
      title="Settings"
      viewFrames={[
        {
          content: <></>,
          viewWidth: 100,
        },
      ]}
    />
  );
};

export default TestBench;
