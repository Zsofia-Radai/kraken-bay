import { Character } from "@/app/types/game";
import Image from "next/image";

interface RoleCardProps {
  character: Character;
  size?: "small" | "large";
  priority?: boolean;
}

export default function RoleCard({
  character,
  size = "large",
  priority,
}: RoleCardProps) {
  const sizes = {
    small: "w-24 h-36",
    large: "w-[290px] h-[420px]",
  } as const;

  return (
    <article>
      <div className={`relative overflow-hidden ${sizes[size]}`}>
        <Image
          src={character.img}
          alt={character.name}
          sizes={size === "large" ? "290px" : "96px"}
          fill
          priority={priority}
        />
      </div>
    </article>
  );
}
