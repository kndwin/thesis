import { styled } from "~/components/variants";

export const Button = styled("button", "inline-flex items-center", {
  variants: {
    size: {
      md: "px-2 h-10 rounded w-full gap-2",
    },
    color: {
      primary: ["text-sand-12 bg-sand-3", "hover:bg-sand-4"],
      error: ["text-red-12 bg-red-3", "hover:bg-red-4"],
    },
    variant: {
      fill: "",
      text: "bg-transparent",
    },
  },
  defaultVariants: {
    variant: "fill",
    color: "primary",
    size: "md",
  },
});
