import { type HTMLAttributes } from "react";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {}

export function Card({ className = "", children, ...props }: CardProps) {
  return (
    <div
      className={[
        "rounded-xl border border-neutral-200 bg-white shadow-sm",
        "dark:border-neutral-800 dark:bg-neutral-950",
        className,
      ].join(" ")}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  className = "",
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={["px-6 py-4 border-b border-neutral-200 dark:border-neutral-800", className].join(
        " "
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardBody({
  className = "",
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={["px-6 py-4", className].join(" ")} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({
  className = "",
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={["px-6 py-4 border-t border-neutral-200 dark:border-neutral-800", className].join(
        " "
      )}
      {...props}
    >
      {children}
    </div>
  );
}
