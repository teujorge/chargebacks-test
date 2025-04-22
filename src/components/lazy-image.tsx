"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type NextImageProps = React.ComponentProps<typeof Image>;

interface LazyImageProps extends Omit<NextImageProps, "src" | "alt"> {
  src?: NextImageProps["src"];
  alt?: NextImageProps["alt"];
  isLoading?: boolean;
  imageClassName?: string;
  wrapperClassName?: string;
}

export function LazyImage({
  src,
  alt,
  className,
  imageClassName,
  wrapperClassName,
  ...props
}: LazyImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imageRef.current?.complete) {
      setIsLoading(false);
      setIsReady(true);
    }
  }, []);

  return (
    <div
      className={cn(
        "overflow-hidden transition-all duration-500",
        isLoading ? "bg-muted-foreground/25 animate-pulse" : "bg-transparent",
        className,
        wrapperClassName,
      )}
    >
      {src && alt && (
        <Image
          ref={imageRef}
          src={src}
          alt={alt}
          className={cn(
            "object-cover transition-opacity duration-500",
            !isReady && "opacity-0",
            className,
            "border-none",
            imageClassName,
          )}
          {...props}
          onLoad={() => {
            setIsLoading(false);
            setIsReady(true);
          }}
          onError={() => {
            setIsLoading(false);
            setIsReady(true);
          }}
          unoptimized // optimized images caused 402 error
        />
      )}
    </div>
  );
}
