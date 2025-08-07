import Image from "next/image";
import Link from "next/link";

export default function ButtonGoogle() {
    return (
        <div className="flex justify-center mt-4">
            <Link href="http://localhost:4000/api/auth/google" >
            de nest
                <Image priority src="/Google.png" alt="Login Google" width={30} height={30} />
            </Link>
        </div>
    );
}
