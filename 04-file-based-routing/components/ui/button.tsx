import Link from "next/link";
import classes from "./button.module.css";

const Button: React.FC<{ children?: React.ReactNode; link: string }> = ({
  children,
  link,
}) => {
  return (
    <Link href={link} className={classes.btn}>
      {children}
    </Link>
  );
};

export default Button;
