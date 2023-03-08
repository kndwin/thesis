import { styled } from "~/components/variants";

export const Button = styled("button", "inline-flex items-center w-fit", {
  variants: {
    size: {
      xs: "px-2 h-8 rounded gap-2 text-xs",
      sm: "px-2 h-8 rounded gap-2 text-sm",
      md: "px-4 h-10 rounded gap-2 font-bold",
      icon: "aspect-square h-8 w-8 p-1.5 rounded",
    },
    color: {
      primary: ["text-orange-12 bg-orange-3", "hover:bg-orange-4"],
      sand: ["text-sand-12 bg-sand-3", "hover:bg-sand-4"],
      error: ["text-red-12 bg-red-3", "hover:bg-red-4"],
    },
    variant: {
      fill: "",
      soft: "",
      text: "bg-transparent",
    },
  },
  compoundVariants: [
    {
      color: "primary",
      variant: "fill",
      className: [
        "text-orange-1 dark:text-orange-12 bg-orange-9 dark:bg-orange-9",
        "hover:bg-orange-8",
      ],
    },
  ],
  defaultVariants: {
    variant: "soft",
    color: "primary",
    size: "md",
  },
});
