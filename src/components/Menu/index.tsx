import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { routes, menuElemenets, websiteName } from "../../constants/textValues";

import { useWishlist } from "../../context/wishlist";

import logo from "../../assets/countryBooks.logo.png";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

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

export const Menu = () => {
  const { wishList } = useWishlist();
  const location = useLocation();
  const navigate = useNavigate();
  const currentMenuElement = menuElements.find(
    ({ link }) => link === location.pathname
  );

  const [value, setValue] = useState<string>(
    currentMenuElement ? currentMenuElement.value : menuElemenets.home
  );

  const handleTabChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    const currentTabLink = menuElements.find((v) => v.value === newValue);
    const link = currentTabLink ? currentTabLink.link : "/";
    navigate(link);
  };

  return (
    <div className="menu">
      <div className="menu-wrapper">
        <div className="menu-logo-section">
          <img src={logo} alt="country books logo" className="logo" />
          <h2 className="website-name">
            {websiteName.name}
            <span className="website-name-span">{websiteName.span}</span>
          </h2>
        </div>
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
      </div>
    </div>
  );
};
