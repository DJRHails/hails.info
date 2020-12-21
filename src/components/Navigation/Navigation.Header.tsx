import React, { useState } from "react";

import { useBoolean, useScrollPosition } from "@utils";
import classNames from "classnames";
import { Link } from "gatsby";

interface NavbarElem {
  text: string;
  to: string;
  active?: boolean;
}

interface NavbarProps {
  items?: NavbarElem[];
}

const NAVIGATION_ITEMS = [
  { to: "/projects", text: "Projects" },
  // { to: "/read", text: "Read" },
];

const ListLink: React.FC<NavbarElem> = ({ text, to, active }) => {
  return (
    <li className={classNames("nav-item", { active })}>
      <Link className="nav-link menu__link" to={to}>
        {text}
        {active && <span className="sr-only">(current)</span>}
      </Link>
    </li>
  );
};

const CollapsableNavbar: React.FC<NavbarProps & { hidden?: boolean }> = ({
  items,
  hidden,
}) => {
  const { value: expanded, toggle } = useBoolean(false);

  return (
    <nav
      className="navbar fixed-top navbar-expand-md navbar-light navbar--block"
      style={{ top: !expanded && hidden ? "-5.0rem" : "0rem" }}
    >
      <div className="container">
        <Link className="navbar-brand" to="/">
          HAILS
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarMenu"
          aria-controls="navbarMenu"
          aria-expanded={expanded}
          aria-label="Toggle navigation"
          onClick={toggle}
        >
          <span
            className={classNames(
              "navbar-toggler-hamburger",
              expanded && "show"
            )}
          />
        </button>

        <div
          className={classNames(
            "collapse",
            "navbar-collapse",
            expanded && "show"
          )}
          id="navbarMenu"
        >
          <ul className="nav navbar-nav">
            {items && items.map((item, i) => <ListLink key={i} {...item} />)}
          </ul>
        </div>
      </div>
    </nav>
  );
};

const Navbar: React.FC<NavbarProps> = ({ items = NAVIGATION_ITEMS }) => {
  const [hidden, setHidden] = useState<boolean>(false);

  useScrollPosition(
    ({ prev, curr, max }) => {
      // On a scroll we have:
      // 1) the default case where we scroll upwards
      // 2) The shrinking case where the window resizes
      // 3) The overflow case where you scroll above the window dimensions
      if (
        (max.height > 0 && prev.y > curr.y && prev.y <= max.height) ||
        (max.height <= 0 && prev.y > curr.y) ||
        (prev.y <= 0 && curr.y <= 0)
      ) {
        setHidden(false);
      } else {
        setHidden(true);
      }
    },
    [setHidden]
  );

  return <CollapsableNavbar items={items} hidden={hidden} />;
};

export default Navbar;
