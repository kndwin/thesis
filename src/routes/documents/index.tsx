import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { PlusIcon, TableIcon, GridIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

import {
  Text,
  Section,
  Button,
  Select,
  DropdownMenu as Menu,
} from "~/components";

export { NewDocumentSection } from "./new";

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
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <Text size="xl">Most recent</Text>
        <Button variant="fill" onClick={() => navigate("/documents/new")}>
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
              <Text className="font-bold w-[8ch] truncate">Document {i}</Text>
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

const documentViewOptions = [
  {
    label: "Table",
    value: "table",
    icon: <TableIcon className="h-4 w-4 text-orange-8" />,
  },
  {
    label: "Grid",
    value: "grid",
    icon: <GridIcon className="h-4 w-4 text-orange-8" />,
  },
];

const SearchDocument = () => {
  const [view, setView] = useAtom(documentViewAtom);
  return (
    <div className="flex flex-col gap-8">
      <div className="flex gap-4 items-center mt-8 justify-between">
        <Text size="xl">Search Document</Text>
        <Select.Root value={view} onValueChange={(value) => setView(value)}>
          <Select.Trigger className="w-28 flex-row gap-2">
            {documentViewOptions.find((o) => o.value === view)?.icon}
            <Select.Value />
          </Select.Trigger>
          <Select.Content>
            {documentViewOptions.map((option) => (
              <Select.Item key={option.value} value={option.value}>
                <Select.ItemIndicatorChecked />
                <div className="flex items-center gap-2">
                  {option.icon}
                  <Select.ItemText>{option.label}</Select.ItemText>
                </div>
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Root>
      </div>
      {view === "table" && <TableView />}
      {view === "grid" && <GridView />}
    </div>
  );
};

const TableView = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4 w-full justify-between">
        <div className="flex gap-4 ">
          <div className="w-40 h-10 rounded-lg bg-orange-3" />
          <div className="w-40 h-10 rounded-lg bg-orange-5" />
        </div>
        <div className="flex gap-4 ">
          <div className="w-80 h-10 rounded-lg bg-orange-3" />
          <div className="w-20 h-10 rounded-lg bg-orange-5" />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col rounded-2xl overflow-hidden divide-y divide-orange-5">
          <div className="w-full h-12 bg-orange-5" />
          {[...Array(10).keys()].map((i) => (
            <div key={i} className="w-full h-16 bg-orange-3" />
          ))}
        </div>
        <div className="flex justify-between items-center">
          <Text size="sm" className="ml-4">
            Showing 1-10 of 1000
          </Text>

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
    <div className="flex flex-col gap-8">
      <div className="flex gap-4 w-full justify-between">
        <div className="flex gap-4 ">
          <div className="w-40 h-10 rounded-lg bg-orange-3" />
          <div className="w-40 h-10 rounded-lg bg-orange-5" />
        </div>
        <div className="flex gap-4 ">
          <div className="w-80 h-10 rounded-lg bg-orange-3" />
          <div className="w-20 h-10 rounded-lg bg-orange-5" />
        </div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(20).keys()].map((i) => (
          <div key={i} className="w-full h-32 rounded-lg bg-orange-3" />
        ))}
      </div>
    </div>
  );
};
