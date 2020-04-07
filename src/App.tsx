import React, { useRef, useEffect } from "react";
import "./App.css";

function App() {
  const data = [25, 30, 45, 60, 20, 65, 75];
  const svgRef: React.RefObject<SVGSVGElement> = useRef(null);

  // will be called initially and on every data change
  useEffect(() => {}, [data]);

  return (
    <>
      <svg ref={svgRef} />
    </>
  );
}

export default App;
