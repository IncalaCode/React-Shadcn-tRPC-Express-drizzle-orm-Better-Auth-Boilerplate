import * as React from "react"
import { cn } from "@/lib/utils"
import { getAvatarUrl } from "@/config"

const Avatar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      className
    )}
    {...props}
  />
))
Avatar.displayName = "Avatar"

const AvatarImage = React.forwardRef<
  HTMLImageElement,
  React.ImgHTMLAttributes<HTMLImageElement> & {
    src?: string | null;
    fallback?: string;
  }
>(({ className, src, alt, fallback, ...props }, ref) => {
  const imageUrl = src ? getAvatarUrl(src) : fallback;
  
  return (
    <img
      ref={ref}
      className={cn("aspect-square h-full w-full", className)}
      src={imageUrl}
      alt={alt}
      {...props}
    />
  );
});
AvatarImage.displayName = "AvatarImage"

const AvatarFallback = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className
    )}
    {...props}
  />
))
AvatarFallback.displayName = "AvatarFallback"

export { Avatar, AvatarImage, AvatarFallback }
