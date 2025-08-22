import {Image} from "@heroui/react";
import NextImage from "next/image";

export default function ImageManager() {
  return (
    <Image
      alt="HeroUI hero Image with delay"
      as={NextImage}
      className="object-cover"
      height={300}
      isZoomed={true}
      radius="full"
      src="/picapica.png"
      width={300}
    />
  )
}
