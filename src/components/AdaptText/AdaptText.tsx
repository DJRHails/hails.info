import { useInterval } from "@utils";
import _ from "lodash";
import React, { useState } from "react";

const getRandomChar = () =>
  String.fromCharCode(Math.random() * (127 - 33) + 33);

const AdaptText: React.FC = ({
  list,
  prefix = "",
  tail = 5,
  defaultDelay = 10,
  defaultStep = 1,
  processingDelay = 50,
}) => {
  const [text, setText] = useState<string>("");
  const [prefixP, setPrefixP] = useState<number>(-5);
  const [index, setIndex] = useState<number>(0);
  const [skillIndex, setSkillIndex] = useState<number>(0);
  const [step, setStep] = useState<number>(defaultStep);
  const [delay, setDelay] = useState<number>(defaultDelay);
  const [direction, setDirection] = useState<string>("forward");
  const [finished, setFinished] = useState<boolean>(false);

  const elem = list[index];

  useInterval(() => {
    if (step) {
      setStep(step - 1);
      return;
    }
    setStep(defaultStep);

    // Add to the prefix
    if (prefixP < prefix.length) {
      if (prefixP >= 0) {
        setText(text + prefix[prefixP]);
      }
      setPrefixP(prefixP + 1);
      return;
    }

    // Add to the list as going forward
    if (direction === "forward") {
      if (skillIndex < elem.length) {
        setText(text + elem[skillIndex]);
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
        setText(text.slice(0, -1));
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
    <div className="adapt-text">
      <h3><span className="m-line">I work with</span></h3>
      <h2 className="adapt-text__skills">
        <span>{text.slice(prefix.length, text.length)}</span>
        <span className="text-primary">
          {_.range(sizeOfTail).reduce((acc, i) => acc + getRandomChar(), "")}
        </span>
      </h2>
    </div>
  );
};

export default AdaptText;
