import Image from "next/image";
import Link from "next/link";

export function LogoImnoandes() {
    return (
        <figure aria-label="Logo Imnoandes" className=" font-bold text-amber-600 flex items-center gap-4">
            <Link
                href={'/es'}
            >
                <Image
                    src={'/LogoImnoandes.png'}
                    width={150}
                    height={50}
                    priority
                    alt="Imagen Bienes Raices"
                    className="object-cover"
                />
            </Link>
        </figure>
    )
}
