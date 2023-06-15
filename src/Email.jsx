import { useState, useEffect } from "react";
import Notify from "./Notify";
import axios from "axios";

const Email = ({ className, showHello}) => {
    const [fadeIn, setFadeIn] = useState(false);
    
  
    useEffect(() => {
      if (showHello) {
        const timeoutId = setTimeout(() => {
          setFadeIn(true);
        }, 250);
  
        return () => clearTimeout(timeoutId);
      }
    }, [showHello]);
    
    return (
      <div className={className}>
        <Notify />
        {showHello && (
          <div className={fadeIn ? "fade-in" : "hidden"}>
            <h1>Hello</h1>
          </div>
        )}
      </div>
    );
  };

  export default Email;