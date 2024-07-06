"use client";

import { Button } from "./button";
import { CldUploadWidget } from "next-cloudinary";
import { Trash, Upload } from "lucide-react";

import React from "react";
import Image from "next/image";

interface UploadImageButtonProps {
  disabled?: boolean;
  onChange: (image: string) => void;
  onRemove: (image: string) => void;
  value: string[];
  imageDisplay?: boolean;
  className?: string;
}

function UploadImageButton({
  disabled,
  onChange,
  onRemove,
  value,
  imageDisplay,
  className,
}: UploadImageButtonProps) {
  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };
  return (
    <div>
      <div className="flex gap-2 flex-wrap">
        {imageDisplay
          ? value.map((url) => (
              <div
                key={url}
                className="relative w-[200px] h-[200px] rounded-md overflow-hidden"
              >
                <div className="z-10 absolute top-2 right-2">
                  <Button
                    type="button"
                    onClick={() => onRemove(url)}
                    variant="destructive"
                    size="icon"
                  >
                    <Trash className="w-4 h-4" />
                  </Button>
                </div>
                <Image fill className="object-cover" alt="Image" src={url} />
              </div>
            ))
          : null}
      </div>
      <CldUploadWidget uploadPreset="fg0ntmfq" onUpload={onUpload}>
        {({ open }) => {
          const onClick = () => {
            open();
          };
          return (
            <Button
              type="button"
              disabled={disabled}
              variant="secondary"
              onClick={onClick}
              className={className}
            >
              <div className="flex gap-1 items-center">
                <Upload className="w-4 h-4" />
                {imageDisplay ? "Wgraj obrazy" : null}
              </div>
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
}

export default UploadImageButton;
