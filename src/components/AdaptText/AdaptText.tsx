import { useInterval } from "@utils";
import _ from "lodash";
import React, { useState } from "react";
import { useTrackVisibility } from "react-intersection-observer-hook";

const getRandomChar = () =>
  String.fromCharCode(Math.random() * (127 - 33) + 33);

interface AdaptTextProps {
  list: [string];
  prefix?: string;
  tail?: number;
  defaultDelay?: number;
  processingDelay?: number;
}

// TODO(DJRHails): Needs some optimisation as straight import from js.
const AdaptText: React.FC<AdaptTextProps> = ({
  list,
  prefix = "",
  tail = 5,
  defaultDelay = 10,
  processingDelay = 100,
}) => {
  const [prefixP, setPrefixP] = useState<number>(-5);
  const [index, setIndex] = useState<number>(0);
  const [skillIndex, setSkillIndex] = useState<number>(0);
  const [delay, setDelay] = useState<number>(defaultDelay);
  const [direction, setDirection] = useState<string>("forward");

  const [ref, { isVisible }] = useTrackVisibility();

  const elem = list[index];

  useInterval(() => {
    if (!isVisible) {
      return;
    }
    // Add to the prefix
    if (prefixP < prefix.length) {
      setPrefixP(prefixP + 1);
      return;
    }

    // Add to the list as going forward
    if (direction === "forward") {
      if (skillIndex < elem.length) {
        setSkillIndex(skillIndex + 1);
        return;
      }

      if (delay) {
        setDelay(delay - 1);
        return;
      }

      if (index < list.length - 1) {
        setDirection("backward");
        setDelay(defaultDelay);
        return;
      }

      setDirection("finished");
    }

    // Remove from the end as going backward
    if (direction === "backward") {
      if (skillIndex > 0) {
        setSkillIndex(skillIndex - 1);
      } else {
        setIndex(index + 1);
        setDirection("forward");
      }
    }
  }, processingDelay);

  const sizeOfTail =
    prefixP < prefix.length
      ? Math.min(tail, tail + prefixP)
      : Math.min(tail, elem.length - skillIndex);
  return (
    <div ref={ref} className="adapt-text">
      <h3>
        <span className="m-line">I work with</span>
      </h3>
      <h2 className="adapt-text__skills">
        <span>
          {prefix.slice(0, prefixP)}
          {elem.slice(0, skillIndex)}
        </span>
        <span className="text-primary">
          {_.range(sizeOfTail).reduce((acc) => acc + getRandomChar(), "")}
        </span>
      </h2>
    </div>
  );
};

export default AdaptText;
