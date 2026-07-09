import { characters } from "@/app/data/characters";
import { Card } from "@/app/types/game";
import Image from "next/image";

interface RoleCardProps {
  card: Card;
  size?: "small" | "medium" | "large";
  priority?: boolean;
}

export default function RoleCard({
  card,
  size = "large",
  priority,
}: RoleCardProps) {
  const sizes = {
    small: "w-24 h-36",
    medium: "w-60 h-85",
    large: "w-[290px] h-[420px]",
  } as const;

  const character = characters[card.characterId];

  return (
    <article>
      <div className={`relative overflow-hidden ${sizes[size]}`}>
        <Image
          src={character.img}
          alt={character.name}
          sizes={
            size === "large" ? "290px" : size === "medium" ? "96px" : "72px"
          }
          fill
          priority={priority}
        />
      </div>
    </article>
  );
}
