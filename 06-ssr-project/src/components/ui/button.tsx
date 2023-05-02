import Link from "next/link";
import classes from "./button.module.css";

const Button: React.FC<{
  children?: React.ReactNode;
  link?: string;
  onClick?: () => void;
}> = ({ children, link, onClick }) => {
  if (!link) {
    return (
      <button className={classes.btn} onClick={onClick}>
        {children}
      </button>
    );
  }

  return (
    <Link href={link} className={classes.btn}>
      {children}
    </Link>
  );
};

export default Button;
