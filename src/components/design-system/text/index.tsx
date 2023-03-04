import { styled } from "~/components/variants";

export const Text = styled("p", "", {
  variants: {
    size: {
      xs: "text-xs",
      sm: "text-sm",
      md: "",
      lg: "text-xl font-bold",
      xl: "text-2xl font-bold",
      "2xl": "text-3xl font-black",
    },
    color: {
      primary: "text-sand-12",
      error: "text-red-12",
    },
  },
  defaultVariants: {
    color: "primary",
    size: "md",
  },
});
