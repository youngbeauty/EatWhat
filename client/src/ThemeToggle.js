import React, { useState } from "react";

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    const rootElement = document.documentElement;
    if (isDarkMode) {
      rootElement.classList.remove("dark-mode");
      rootElement.classList.add("light-mode");
    } else {
      rootElement.classList.remove("light-mode");
      rootElement.classList.add("dark-mode");
    }
    setIsDarkMode(!isDarkMode);
  };

  return (
    <button onClick={toggleTheme} style={{ padding: "10px", margin: "10px" }}>
      {isDarkMode ? "切换到白天模式" : "切换到夜间模式"}
    </button>
  );
};

export default ThemeToggle;
