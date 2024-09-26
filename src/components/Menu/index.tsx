import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { menuElemenets, websiteName } from "../../constants/textValues";

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
    value: menuElemenets.values.home,
    label: menuElemenets.values.home,
    link: menuElemenets.links.home,
  },
  {
    value: menuElemenets.values.authors,
    label: menuElemenets.values.authors,
    link: menuElemenets.links.authors,
  },
  {
    value: menuElemenets.values.poets,
    label: menuElemenets.values.poets,
    link: menuElemenets.links.poets,
  },
  {
    value: menuElemenets.values.bookStore,
    label: menuElemenets.values.bookStore,
    link: menuElemenets.links.bookStore,
  },
  {
    value: menuElemenets.values.wishList,
    label: menuElemenets.values.wishList,
    link: menuElemenets.links.wishList,
  },
];

export const Menu = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentMenuElement = menuElements.find(
    ({ link }) => link === location.pathname
  );

  const [value, setValue] = useState<string>(
    currentMenuElement ? currentMenuElement.value : menuElemenets.values.home
  );

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    const currentTabLink = menuElements.find((v) => v.value === newValue);
    const link = currentTabLink ? currentTabLink.link : "/";
    navigate(link);
  };

  return (
    <div className="menu">
      <div className="menu-wrapper">
        <div className="menu-logo-section">
          <img src={logo} alt="conutry books logo" className="logo" />
          <h2 className="website-name">
            {websiteName.name}
            <span className="website-name-span">{websiteName.span}</span>
          </h2>
        </div>
        <Box sx={{ width: "100%" }}>
          <Tabs className="tabs" value={value} onChange={handleTabChange}>
            {menuElements.map(({ value, label }, index) => (
              <Tab key={index} value={value} label={label} />
            ))}
          </Tabs>
        </Box>
      </div>
    </div>
  );
};
