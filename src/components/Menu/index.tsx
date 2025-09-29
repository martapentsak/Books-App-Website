import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { routes, menuElemenets, websiteName } from "../../constants/textValues";

import { useWishlist } from "../../context/wishlist";

import logo from "../../assets/countryBooks.logo.png";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import MenuIcon from "@mui/icons-material/Menu";

type MenuElements = {
  value: string;
  label: string;
  link: string;
};

const menuElements: MenuElements[] = [
  {
    value: menuElemenets.home,
    label: menuElemenets.home,
    link: routes.home,
  },
  {
    value: menuElemenets.authors,
    label: menuElemenets.authors,
    link: routes.authors,
  },
  {
    value: menuElemenets.poets,
    label: menuElemenets.poets,
    link: routes.poets,
  },
  {
    value: menuElemenets.bookStore,
    label: menuElemenets.bookStore,
    link: routes.bookStore,
  },
  {
    value: menuElemenets.wishList,
    label: menuElemenets.wishList,
    link: routes.wishList,
  },
];

const getTabValueFromPath = (path: string): string => {
  if (path.startsWith("/poet")) return menuElemenets.poets;
  if (path.startsWith("/author")) return menuElemenets.authors;
  if (path.startsWith("/book")) return menuElemenets.bookStore;
  if (path.startsWith("/wishlist")) return menuElemenets.wishList;
  return menuElemenets.home;
};

export const Menu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { wishList } = useWishlist();
  const location = useLocation();
  const navigate = useNavigate();
  const currentMenuElement = getTabValueFromPath(location.pathname);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const [value, setValue] = useState<string>(currentMenuElement);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    const currentTabLink = menuElements.find((v) => v.value === newValue);
    const link = currentTabLink ? currentTabLink.link : "/";
    navigate(link);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="menu">
      <div className="menu-wrapper">
        <a className="menu-logo-section" href="/">
          <img src={logo} alt="country books logo" className="logo" />
          <h2 className="website-name">
            {websiteName.name}
            <span className="website-name-span">{websiteName.span}</span>
          </h2>
        </a>
        <Box>
          <Tabs value={value} onChange={handleTabChange}>
            {menuElements.map(({ link, ...others }, index) => (
              <Tab key={index} onClick={() => navigate(link)} {...others} />
            ))}
            {wishList.length > 0 && (
              <span className="wishlist-badge">{wishList.length}</span>
            )}
          </Tabs>
        </Box>
        <button
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="burger-menu"
        >
          <MenuIcon />
        </button>
        {isMenuOpen && (
          <nav className="burger-menu-section">
            {menuElements.map(({ link, value }) => (
              <a
                key={value}
                className="burger-menu-link"
                onClick={() => {
                  navigate(link);
                  setIsMenuOpen(false);
                }}
              >
                {value}
              </a>
            ))}
          </nav>
        )}
      </div>
    </div>
  );
};
