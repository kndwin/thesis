import { useNavigate } from "react-router-dom";
import {
  ArrowLeftIcon,
  MessageSquareIcon,
  FileEditIcon,
  PlusIcon,
  MinusIcon,
} from "lucide-react";
import { useDropzone } from "react-dropzone";
import { useRef, useState } from "react";

import {
  Button,
  StyledHeader,
  Text,
  ButtonToggleTheme,
  TextField,
  Page,
  Tabs,
  ScrollArea,
} from "~/components";
import { useVirtualizer } from "@tanstack/react-virtual";

import { usePdf } from "~/features/pdf";

export const NewDocumentSection = () => {
  const navigate = useNavigate();
  return (
    <Page variant="page">
      <StyledHeader>
        <Button size="icon" onClick={() => navigate("/")}>
          <ArrowLeftIcon />
        </Button>
        <Text size="2xl">Hello</Text>
        <ButtonToggleTheme />
      </StyledHeader>
      <div className="flex flex-1 gap-8 p-8 h-full w-full">
        <DropPdfFile />
        <Tabs defaultValue="chat" className="w-[40em] flex flex-col">
          <Tabs.List className="w-fit">
            <Tabs.Trigger value="chat">
              <MessageSquareIcon className="w-4 h-4" />
              Chat
            </Tabs.Trigger>
            <Tabs.Trigger value="notes">
              <FileEditIcon className="w-4 h-4" />
              Notes
            </Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="chat" className="h-full">
            <div className="flex flex-col h-full gap-4">
              <div className="border border-orange-4 rounded-lg h-full"></div>
              <div className="flex gap-4 w-full">
                <TextField className="w-full" />
                <Button variant="fill">Send</Button>
              </div>
            </div>
          </Tabs.Content>
          <Tabs.Content value="notes">
            <Button size="sm">
              <PlusIcon />
              New Note
            </Button>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Change your password here. After saving, you&apos;ll be logged
              out.
            </p>
          </Tabs.Content>
        </Tabs>
      </div>
    </Page>
  );
};

const DropPdfFile = () => {
  const [pdfFile, setPdfFile] = useState("");
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: async (acceptedFiles) => {
      const file = acceptedFiles[0];
      const reader = new FileReader();
      reader.onload = (ev) => {
        setPdfFile(ev.target.result);
      };
      reader.readAsDataURL(file);
    },
    accept: {
      "application/pdf": [".pdf"],
    },
  });

  return (
    <>
      {!pdfFile && (
        <div
          className="bg-orange-4 rounded-xl h-full w-full flex items-center"
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          <div className="m-auto">
            <Text className="text-orange-12">
              Drop your PDF here, or click to select files
            </Text>
          </div>
        </div>
      )}

      {pdfFile && <PDF pdfFile={pdfFile} />}
    </>
  );
};

const PDF = ({ pdfFile }: { pdfFile: string }) => {
  const canvasRef = useRef(null);
  const parentRef = useRef<HTMLDivElement>(null);
  const toolbarProps = usePdfToolbar();

  const { pdfDocument, pdfPage } = usePdf({
    canvasRef,
    file: pdfFile,
  });

  const totalPage = pdfDocument?.numPages ?? 1;

  const rowvirtualizer = useVirtualizer({
    horizontal: false,
    count: totalPage,
    getScrollElement: () => parentRef.current,
    estimateSize: (i) => Number(pdfPage?.getViewport().height),
    overscan: 5,
  });

  return (
    <div className="flex flex-col w-full rounded-xl overflow-hidden">
      <PDFToolbar {...toolbarProps} />
      <ScrollArea.Root className="h-[calc(100vh_-_12rem)] bg-orange-3">
        <ScrollArea.Viewport ref={parentRef}>
          <div
            style={{ height: rowvirtualizer.getTotalSize() }}
            className="py-8 flex flex-col gap-3"
          >
            {rowvirtualizer.getVirtualItems().map((virtualRow) => (
              <div
                key={virtualRow.index}
                style={{
                  position: "absolute",
                  top: 0,
                  left: `${virtualRow.lane * 25}%`,
                  transform: `translateY(${virtualRow.start}px)`,
                }}
              >
                <PDFPage
                  key={`page-${virtualRow.index + 1}-${toolbarProps.zoom}`}
                  pageNumber={virtualRow.index + 1}
                  pdfFile={pdfFile}
                  toolbarProps={toolbarProps}
                />
              </div>
            ))}
          </div>
        </ScrollArea.Viewport>
      </ScrollArea.Root>
    </div>
  );
};

type PDFPageProps = {
  pageNumber: number;
  pdfFile: string;
  toolbarProps: PDFToolbarProps;
};

const PDFPage = ({ pageNumber, pdfFile, toolbarProps }: PDFPageProps) => {
  const canvasRef = useRef(null);

  usePdf({
    canvasRef,
    file: pdfFile,
    scale: toolbarProps.zoom,
    page: pageNumber,
  });

  return <canvas ref={canvasRef} className="mx-auto" />;
};

type PDFToolbarProps = ReturnType<typeof usePdfToolbar>;

const PDFToolbar = (props: PDFToolbarProps) => {
  return (
    <div className="w-full bg-orange-5 h-12 flex gap-3 items-center px-4">
      <div className="flex items-center gap-1">
        <PlusIcon onClick={() => props.setZoom((prev) => prev * 1.1)} />
        {(props.zoom * 100).toFixed(0) + "%"}
        <MinusIcon onClick={() => props.setZoom((prev) => prev * 0.9)} />
      </div>
    </div>
  );
};

const usePdfToolbar = () => {
  const [zoom, setZoom] = useState(1);

  return {
    zoom,
    setZoom,
  };
};
