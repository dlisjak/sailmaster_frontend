import React from "react";

const LinkIf = ({ link, children }) => {
  if (!link) {
    return children;
  }
  return (
    <a rel="noopener noreferrer" target="_blank" href={link}>
      {children}
    </a>
  );
};

export default LinkIf;
