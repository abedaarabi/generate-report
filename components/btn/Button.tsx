import Link from "next/link";
import classes from "./button.module.css";
export const Button = ({
  children,
  href,
  onClick,
  disabled,
  style,
  ...props
}: any) => {
  if (href) {
    return (
      <button className={classes.btn} style={{ ...style }}>
        <Link href={href}>{children}</Link>
      </button>
    );
  }
  return (
    <button
      className={classes.btn}
      style={{ ...style }}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
