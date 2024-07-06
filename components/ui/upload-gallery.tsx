"use client";

import { Button } from "./button";
import { CldUploadWidget } from "next-cloudinary";
import { Trash, Upload } from "lucide-react";

import React from "react";
import Image from "next/image";

interface UploadGalleryProps {
  disabled?: boolean;
  onChange: (image: string) => void;
  onRemove: (image: string) => void;
  value: string[];
  imageDisplay?: boolean;
}

function UploadGallery({
  disabled,
  onChange,
  onRemove,
  value,
  imageDisplay,
}: UploadGalleryProps) {
  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };
  return (
    <div className="grid gap-2">
      <Image
        alt="Product image"
        className="aspect-square w-full rounded-md object-cover"
        height="300"
        src={value[0]}
        width="300"
      />
      <div className="grid grid-cols-3 gap-2">
        {value.map((url) => (
          <div key={url} className="relative w-full h-full">
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
            <Image
              height="83"
              width="83"
              className="aspect-square w-full rounded-md object-cover"
              alt="Image"
              src={url}
            />
          </div>
        ))}
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
                className="flex aspect-square w-full h-full items-center justify-center rounded-md border border-dashed m-0 p-0"
              >
                <Upload className="w-4 h-4" />
              </Button>
            );
          }}
        </CldUploadWidget>
      </div>
    </div>
  );
}

export default UploadGallery;
