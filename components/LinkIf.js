import Link from "next/link";

const LinkIf = ({ link, children }) => {
  if (!link) {
    return children;
  }

  return (
    <Link rel="noopener noreferrer" target="_blank" href={link}>
      {children}
    </Link>
  );
};

export default LinkIf;
