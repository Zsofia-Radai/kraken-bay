import { PlayerData } from "@/app/types/game";
import TargetModal from "./TargetModal";
import { IconTarget } from "@tabler/icons-react";

type AssassinateModalProps = {
  onConfirm: (targetCardId: string) => void;
  isOpen: boolean;
  players: PlayerData[];
  currentPlayerId: string;
  closeModal: () => void;
};

export default function AssassinateModal({
  onConfirm,
  isOpen,
  players,
  currentPlayerId,
  closeModal,
}: AssassinateModalProps) {
  if (!isOpen) return null;
  const settings = {
    title: "Select assassination target",
    description: "Select a card to reveal.",
    icon: IconTarget,
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
