"use client";

import React, { useEffect, useRef } from "react";

// It's generally better to avoid global state like this for fullpageInstance
// and instead rely on the component's lifecycle.
// let fullpageInstance: any = null; // Removed

const FullPageWrapper = () => {
  const containerRef = useRef(null);
  // Use a ref to store the fullpage.js instance
  const fullpageInstanceRef = useRef(null); 

  useEffect(() => {
    async function initFullpage() {
      if (!containerRef.current) return;

      // Only initialize if an instance doesn't already exist for this component
      if (!fullpageInstanceRef.current) {
        const fullpage = (await import("fullpage.js")).default;

        fullpageInstanceRef.current = new fullpage(containerRef.current, {
          autoScrolling: true,
          navigation: true,
          scrollHorizontally: true,
          // Add other fullpage.js options here
          // For example:
          // sectionsColor: ['#f2f2f2', '#4BBFC3', '#7BAABE', 'whitesmoke', '#000'],
          // controlArrows: false,
          // verticalCentered: true,
          // responsiveWidth: 768,
        });
      }
    }

    initFullpage();

    // Cleanup function: This runs when the component unmounts
    return () => {
      if (fullpageInstanceRef.current) {
        fullpageInstanceRef.current.destroy("all");
        fullpageInstanceRef.current = null;
      }
    };
  }, []); // Empty dependency array ensures this runs once on mount and cleans up on unmount

  return (
    <div id="fullpage" ref={containerRef}>
      {/* Your fullpage sections will be rendered as children here */}
      {/* Example sections: */}
      {/* <div className="section">Section 1</div> */}
      {/* <div className="section">Section 2</div> */}
      {/* <div className="section">Section 3</div> */}
    </div>
  );
};

export default FullPageWrapper;