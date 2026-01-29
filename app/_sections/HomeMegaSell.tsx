import Image from "next/image";

export default function HomeMegaSell() {
  return (
    <div className="lg:pt-25 pt-15">
      <Image
        alt="Sell"
        src="/banner/megasell.png"
        width={1440}
        height={508}
        className="object-contain"
      />
    </div>
  );
}
