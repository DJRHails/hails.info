import { Link } from "gatsby";
import React from "react";

export interface DiagonalButtonProps {
  to: string;
  children: React.ReactNode;
}

const DiagonalButton: React.FC<DiagonalButtonProps> = ({
  to,
  children,
}: DiagonalButtonProps) => {
  return (
    <Link to={to}>
      <button type="button" className="btn btn--outline btn--diagonal">
        <span>{children}</span>
      </button>
    </Link>
  );
};

export default DiagonalButton;
