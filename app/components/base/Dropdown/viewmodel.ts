import { useEffect, useState } from "react";

export const useViewModel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClickOutside = (e: any) => {
    const dropdown = document.querySelector(".dropdown-content");
    if (dropdown && !dropdown.contains(e.target)) {
      dropdown.classList.remove("open");
      setIsOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return {
    isOpen,
    setIsOpen,
  };
};
