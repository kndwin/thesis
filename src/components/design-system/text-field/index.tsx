import { styled } from "~/components/variants";

export const TextField = styled("input", "", {
  variants: {
    size: {
      xs: "text-xs",
      sm: "text-sm",
      md: "px-2 py-1",
      lg: "text-xl font-bold",
      xl: "text-2xl font-bold",
      "2xl": "text-3xl font-black",
    },
    color: {
      primary:
        "text-sand-12 bg-orange-2 border border-orange-4 rounded-lg focus:ring-1 focus:ring-orange-6",
    },
  },
  defaultVariants: {
    color: "primary",
    size: "md",
  },
});
