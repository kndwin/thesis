import { styled } from "~/components/variants";

export const Text = styled("p", "", {
  variants: {
    color: {
      primary: "text-sand-12",
      error: "text-red-12",
    },
  },
  defaultVariants: {
    color: "primary",
  },
});
