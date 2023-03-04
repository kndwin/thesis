import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { PlusIcon, TableIcon, GridIcon } from "lucide-react";
import {
  Text,
  Section,
  Button,
  Select,
  DropdownMenu as Menu,
} from "~/components";

export const DocumentSection = () => {
  return (
    <Section>
      <div className="flex flex-col gap-8 p-8">
        <MostRecent />
        <SearchDocument />
      </div>
    </Section>
  );
};

const MostRecent = () => {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <Text size="xl">Most recent</Text>
        <Button variant="fill">
          <PlusIcon />
          New Document
        </Button>
      </div>
      <div className="grid grid-cols-4 gap-4 w-full">
        {[...Array(4).keys()].map((i) => (
          <div
            key={i}
            className="w-full h-32 rounded-lg bg-orange-3 flex flex-col justify-end overflow-hidden"
          >
            <div className="bg-orange-4 py-2 px-4 flex justify-between items-center">
              <Text className="font-bold">Document {i}</Text>
              <Text size="xs">11:30PM Today</Text>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const documentViewAtom = atomWithStorage<"table" | "grid">(
  "document-view",
  "table"
);

const SearchDocument = () => {
  const [view, setView] = useAtom(documentViewAtom);
  return (
    <div className="flex flex-col gap-8">
      <div className="flex gap-4 items-start mt-8">
        <Text size="xl">Search Document</Text>
      </div>
      <div className="flex gap-4 w-full justify-between">
        <div className="flex gap-4 ">
          <Select.Root value={view} onValueChange={(value) => setView(value)}>
            <Select.Trigger className="w-28 flex-row gap-2">
              <Select.Value />
            </Select.Trigger>
            <Select.Content>
              <Select.Item value="table">
                <Select.ItemIndicator>
                  <TableIcon className="h-4 w-4 text-orange-8" />
                </Select.ItemIndicator>
                <Select.ItemText>Table</Select.ItemText>
              </Select.Item>
              <Select.Item value="grid">
                <Select.ItemIndicator>
                  <TableIcon className="h-4 w-4 text-orange-8" />
                </Select.ItemIndicator>
                <Select.ItemText>Grid</Select.ItemText>
              </Select.Item>
            </Select.Content>
          </Select.Root>
          <div className="w-40 h-10 rounded-lg bg-orange-3" />
          <div className="w-40 h-10 rounded-lg bg-orange-5" />
        </div>
        <div className="flex gap-4 ">
          <div className="w-80 h-10 rounded-lg bg-orange-3" />
          <div className="w-20 h-10 rounded-lg bg-orange-5" />
        </div>
      </div>
      {view === "table" && <TableView />}
      {view === "grid" && <GridView />}
    </div>
  );
};

const TableView = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4">
          {[...Array(20).keys()].map((i) => (
            <div key={i} className="w-full h-16 rounded-lg bg-orange-3" />
          ))}
        </div>
        <div className="flex justify-end">
          <div className="flex items-start gap-2">
            <div className="bg-orange-3 w-8 h-8 rounded" />
            <div className="bg-orange-5 w-8 h-8 rounded" />
            <div className="bg-orange-3 w-8 h-8 rounded" />
            <div className="bg-orange-3 w-8 h-8 rounded" />
            <div className="bg-orange-3 w-8 h-8 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
};

const GridView = () => {
  return (
    <div className="grid grid-cols-4 gap-4">
      {[...Array(60).keys()].map((i) => (
        <div key={i} className="w-full h-16 rounded-lg bg-orange-3" />
      ))}
    </div>
  );
};
