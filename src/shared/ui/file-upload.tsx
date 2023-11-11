"use client";
import { X } from "lucide-react";
import Image from "next/image";

import { UploadDropzone } from "@/src/shared/lib/uploadthing";

interface FileUploadProps {
  onChange: (url?: string) => void;
  value: string;
  endpoint: "messageFile" | "serverImage";
}

export const FileUpload = ({ endpoint, onChange, value }: FileUploadProps) => {
  const fileType = value?.split(".").pop();

  if (value && fileType !== "pdf") {
    return (
      <div className={"relative h-20 w-20"}>
        <Image
          src={value}
          className={"rounded-full object-cover"}
          alt={"Upload"}
          fill
        />
        <button
          onClick={() => {
            onChange("");
          }}
          className={
            "text-white p-1 rounded-full absolute top-0 right-0 shadow-sm bg-rose-500"
          }
        >
          <X className={"h-4 w-4"} />
        </button>
      </div>
    );
  }

  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url);
      }}
      onUploadError={(error: Error) => {
        console.log(error);
      }}
    />
  );
};
