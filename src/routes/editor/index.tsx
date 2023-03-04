import { Text, Section } from "~/components";
import { AlertCircle } from "lucide-react";

export const EditorSection = () => {
  return (
    <Section>
      <div className="flex flex-col gap-8 p-8">
        <div className="p-4 rounded border border-orange-4 flex gap-3">
          <AlertCircle className="text-orange-10" />
          <Text size="md">
            Opps! you caught us at an awkwards time. This is still being built!
            Feel free to poke around but know it's not ready yet!
          </Text>
        </div>
        <div className="rounded-xl bg-orange-3 h-80 w-full" />
      </div>
    </Section>
  );
};
