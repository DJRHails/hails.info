import _ from "lodash";
import React from "react";

import Arweave from "./Icons.Arweave";
import Award from "./Icons.Award";
import BackChevron from "./Icons.BackChevron";
import External from "./Icons.External";
import Github from "./Icons.Github";
import Microchip from "./Icons.Microchip";
import Palantir from "./Icons.Palantir";

export const factory = (name: string) =>
  _.get(
    {
      external: <External />,
      github: <Github />,
      palantir: <Palantir />,
      arweave: <Arweave />,
      award: <Award />,
      microchip: <Microchip />,
      back: <BackChevron />,
    },
    name
  );

export { External, Github, BackChevron, Palantir, Arweave, Microchip, Award };
