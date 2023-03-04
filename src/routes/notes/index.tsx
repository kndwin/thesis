import { AlertCircle } from "lucide-react";
import { Text, Section } from "~/components";

export const NotesSection = () => {
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
        <div className="grid grid-cols-4 gap-4">
          {[...Array(60).keys()].map((i) => (
            <div key={i} className="w-full h-16 rounded-lg bg-orange-3" />
          ))}
        </div>
      </div>
    </Section>
  );
};
