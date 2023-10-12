// react
import React, { useContext, useEffect } from "react";

// context
import { ThemeContext } from "../context/ThemeContext";

// MUI
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";

const LightDarkMode = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  useEffect(() => {
    if (
      //   window.matchMedia("(prefers-color-scheme: dark)").matches ||
      theme === "dark"
    ) {
      document.documentElement.classList.add("dark");
      setTheme("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  return (
    <>
      <div className="absolute top-0 right-0 m-4 hover:cursor-pointer transition-all">
        {theme === "light" ? (
          <WbSunnyOutlinedIcon
            style={{ color: "hsl(222, 40%, 13%)" }}
            onClick={toggleTheme}
          />
        ) : (
          <DarkModeOutlinedIcon onClick={toggleTheme} />
        )}
      </div>
    </>
  );
};

export default LightDarkMode;
