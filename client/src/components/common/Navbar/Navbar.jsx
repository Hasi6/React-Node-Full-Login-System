import React, { useState } from "react";
import { Menu, Input } from "semantic-ui-react";

const Navbar = () => {
  const [activeItem, setActiveItem] = useState("home");

  const onClick = name => {
    setActiveItem(name);
  };

  return (
    <Menu style={{ background: "blue", height: 10 }}>
      <Menu.Item
        name="home"
        active={activeItem === "home"}
        onClick={() => onClick("home")}
      />
      <Menu.Item
        name="messages"
        active={activeItem === "messages"}
        onClick={() => onClick("messages")}
      />
      <Menu.Item
        name="friends"
        active={activeItem === "friends"}
        onClick={() => onClick("friends")}
      />
      <Menu.Menu position="right">
        <Menu.Item>
          <Input style={{ height: 25 }} icon="search" placeholder="Search..." />
        </Menu.Item>
        <Menu.Item
          name="logout"
          active={activeItem === "logout"}
          onClick={() => onClick("logout")}
        />
      </Menu.Menu>
    </Menu>
  );
};

export default Navbar;
