import { characters } from "@/app/data/characters";
import { cn } from "@/app/lib/utils";
import { Card } from "@/app/types/game";
import { IconLetterX } from "@tabler/icons-react";
import Image from "next/image";
import styles from "./RoleCard.module.css";

interface RoleCardProps {
  card: Card;
  size?: "small" | "medium" | "large";
  priority?: boolean;
  isVisible?: boolean;
  selected?: boolean;
  isBeingEliminated?: boolean;
  onEliminationAnimationEnd?: () => void;
}

export default function RoleCard({
  card,
  size = "large",
  priority,
  isVisible,
  selected,
  isBeingEliminated,
  onEliminationAnimationEnd,
}: RoleCardProps) {
  const sizes = {
    small: "w-24 h-32",
    medium: "w-60 h-85",
    large: "w-[290px] h-[420px]",
  } as const;

  const character = characters[card.characterId];
  const shouldShowFront = isVisible || card.revealed;

  const imageSrc = shouldShowFront ? character.img : "/images/card-cover.png";
  const imageAlt = shouldShowFront ? character.name : "Hidden card";

  return (
    <div
      className={cn(
        "relative overflow-hidden",
        sizes[size],
        selected && "ring-4 ring-red-600",
      )}
    >
      <Image
        src={imageSrc}
        alt={imageAlt}
        sizes={size === "large" ? "290px" : size === "medium" ? "96px" : "72px"}
        fill
        priority={priority}
      />

      {isBeingEliminated && (
        <IconLetterX
          size={250}
          stroke={2}
          className={styles.eliminationCross}
          onAnimationEnd={() => {
            window.setTimeout(() => {
              onEliminationAnimationEnd?.();
            }, 2000);
          }}
        />
      )}
    </div>
  );
}
