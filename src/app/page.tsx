import Image from "next/image";
import icons from "@/assets/icons";
import Quicks from "@/components/organism/Quicks";

export default function Home() {
  return (
    <main className="flex min-h-screen w-full bg-gray-900">
        <div className="flex flex-col w-full">
          <div className="h-58 w-full bg-[#4F4F4F] p-[19px]">
            <Image src={icons.SEARCH_WHITE} alt="logo" width={16} height={16} />
          </div>
        </div>

        <Quicks />

    </main>
  );
}
