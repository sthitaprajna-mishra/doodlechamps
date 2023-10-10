// react
import React, { useEffect } from "react";

// MUI
// MUI
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";

const LightDarkMode = ({ theme, setTheme }) => {
  useEffect(() => {
    if (
      theme === "dark" ||
      (theme !== "light" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
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
        {theme === "dark" ? (
          <DarkModeOutlinedIcon onClick={toggleTheme} />
        ) : (
          <WbSunnyOutlinedIcon
            style={{ color: "hsl(222, 40%, 13%)" }}
            onClick={toggleTheme}
          />
        )}
      </div>
    </>
  );
};

export default LightDarkMode;
