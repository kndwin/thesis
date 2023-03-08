import * as React from "react";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import { styled } from "~/components/variants";

const Root = styled(ScrollAreaPrimitive.Root, "relative overflow-hidden");
const Viewport = styled(
  ScrollAreaPrimitive.Viewport,
  "h-full w-full rounded-[inherit]"
);
const ScrollAreaScrollBar = styled(
  ScrollAreaPrimitive.ScrollAreaScrollbar,
  "flex touch-none select-none transition-colors",
  {
    variants: {
      orientation: {
        vertical: "h-full w-2.5 border-l border-l-transparent p-[1px]",
        horizational: "h-2.5 border-t border-t-transparent p-[1px]",
      },
    },
    defaultVariants: {
      orientation: "vertical",
    },
  }
);

const ScrollAreaControlled = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root> & {
    viewportProps?: React.ComponentPropsWithoutRef<
      typeof ScrollAreaPrimitive.Viewport
    >;
  }
>(({ children, ...props }, ref) => (
  <Root ref={ref} {...props}>
    <Viewport>{children}</Viewport>
    <ScrollBar />
    <ScrollAreaPrimitive.Corner />
  </Root>
));
ScrollAreaControlled.displayName = ScrollAreaPrimitive.Root.displayName;

const ScrollBar = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>
>(({ className, orientation = "vertical", ...props }, ref) => (
  <ScrollAreaScrollBar orientation={orientation} ref={ref} {...props}>
    <ScrollAreaPrimitive.ScrollAreaThumb className="relative flex-1 rounded-full bg-orange-5" />
  </ScrollAreaScrollBar>
));

ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName;

export const ScrollArea = Object.assign(ScrollAreaControlled, {
  Bar: ScrollBar,
  Root,
  Viewport,
  Corner: ScrollAreaPrimitive.Corner,
});
