// import { useEffect, useState } from 'react';
// import { FaMoon, FaSun } from 'react-icons/fa';

// // ThemeToggle component allows users to switch between light and dark themes
// const ThemeToggle = () => {
//   // Initialize theme state from localStorage or default to 'light'
//   const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

//   // Update the HTML attribute and localStorage whenever theme changes
//   useEffect(() => {
//     document.documentElement.setAttribute("data-theme", theme); // Apply theme to root element
//     localStorage.setItem("theme", theme); // Save current theme in localStorage to remember user preference
//   }, [theme]);

//   // Toggle theme between 'light' and 'dark'
//   const toggleTheme = () => {
//     setTheme(prev => (prev === "light" ? "dark" : "light"));
//   };

//   return (
//     <button onClick={toggleTheme} className="btn btn-ghost btn-circle text-xl">
//       {/* Show moon icon in light mode (to switch to dark), sun icon in dark mode (to switch to light) */}
//       {theme === "light" ? <FaMoon /> : <FaSun />}
//     </button>
//   );
// };

// export default ThemeToggle;
import { useEffect, useState } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';

const ThemeToggle = () => {
  // Initialize theme state from localStorage or default to 'light'
  const [theme, setTheme] = useState(() => {
    // Check localStorage or system preference
    const saved = localStorage.getItem("theme");
    if (saved) return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });

  useEffect(() => {
    const root = document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <button onClick={toggleTheme} className="btn btn-ghost btn-circle text-xl">
      {theme === "light" ? <FaMoon /> : <FaSun />}
    </button>
  );
};

export default ThemeToggle;
