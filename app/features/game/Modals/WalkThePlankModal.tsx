import { PlayerData } from "@/app/types/game";
import TargetModal from "./TargetModal";
import { IconSkull } from "@tabler/icons-react";

type WalkThePlankModalProps = {
  onConfirm: (targetCardId: string) => void;
  isOpen: boolean;
  players: PlayerData[];
  currentPlayerId: string;
  closeModal: () => void;
};

export default function WalkThePlankModal({
  onConfirm,
  isOpen,
  players,
  currentPlayerId,
  closeModal,
}: WalkThePlankModalProps) {
  if (!isOpen) return null;
  const settings = {
    title: "Choose who walks the plank",
    description: "Select a card to reveal.",
    icon: IconSkull,
  };
  return (
    <TargetModal
      onConfirm={onConfirm}
      isOpen={isOpen}
      players={players}
      currentPlayerId={currentPlayerId}
      closeModal={closeModal}
      settings={settings}
    />
  );
}
