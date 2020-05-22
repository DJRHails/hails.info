import React, { useRef, useState } from "react";

import * as Icons from "@components/Icons";
import classNames from "classnames";
import { usePopper } from "react-popper";

const TYPE_HEADERS = {
  award: "Prize winning",
};

interface FlagProps extends AwardFrontmatter {
  alternate?: true;
}

const Flag: React.FC<AwardFrontmatter> = ({
  title,
  external,
  date,
  type,
  ribbon,
  alternate,
}) => {
  const [tooltipVisible, setTooltipVisibility] = useState(false);
  const referenceRef = useRef(null);
  const popperRef = useRef(null);
  const arrowRef = useRef(null);

  const { styles, attributes } = usePopper(
    referenceRef.current,
    popperRef.current,
    {
      placement: alternate ? "bottom-start" : "bottom-end",
      modifiers: [
        {
          name: "offset",
          options: {
            offset: [0, 30],
          },
        },
        {
          name: "arrow",
          options: {
            element: arrowRef.current,
            padding: 5,
          },
        },
      ],
    }
  );
  const ribbonClasses = classNames("ribbon", `ribbon--${ribbon.theme}`, {
    hovered: tooltipVisible,
  });

  const tooltipClasses = classNames("flag-tooltip", {
    fadein: tooltipVisible,
    fadeout: !tooltipVisible,
  });

  const hideTooltip = () => setTooltipVisibility(false);
  const showTooltip = () => setTooltipVisibility(true);

  return (
    <>
      <div
        className={ribbonClasses}
        ref={referenceRef}
        onClick={showTooltip}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
      >
        {Icons.factory(ribbon.icon)}
      </div>
      <div className="buffer" />
      <div
        className={tooltipClasses}
        ref={popperRef}
        style={styles.popper}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        {...attributes.popper}
      >
        <div>
          <div className="flag-tooltip__header">{TYPE_HEADERS[type]}</div>
          <div className="flag-tooltip__info">
            {external ? <a href={external}>{title}</a> : title}
            <span>
              {" "}
              — <time dateTime="07/05/2020">{date}</time>
            </span>
          </div>
        </div>
        <div
          ref={arrowRef}
          style={styles.arrow}
          className="flag-tooltip__arrow"
        >
          <div className="flag-tooltip__arrow__triangle" />
          <div className="flag-tooltip__arrow__mask" />
        </div>
      </div>
    </>
  );
};

//

const Flags: React.FC<{
  recognition: AwardFrontmatter[];
  alternate?: true;
}> = ({ recognition, alternate }) => {
  return (
    <div className="flag-container">
      {recognition &&
        recognition.map((r, i) => (
          <Flag key={i} alternate={alternate} {...r} />
        ))}
    </div>
  );
};

export default Flags;