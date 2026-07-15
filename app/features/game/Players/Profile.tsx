import { PlayerData } from "@/app/types/game";
import { IconWallet } from "@tabler/icons-react";
import Image from "next/image";

export default function Profile({ player }: { player: PlayerData }) {
  const profile = player.profile;
  return (
    <div className="flex items-center gap-4">
      <div className="h-20 w-20 relative rounded-full border-4 border-yellow-400 bg-slate-200">
        <Image
          src={profile.avatar}
          alt={profile.name}
          fill
          sizes="80px"
          className="cover"
        />
      </div>

      <div className="flex-1">
        <h2 className="text-xl font-bold">{profile.name}</h2>
        <div className="mt-1 flex items-center gap-2">
          <IconWallet className="h-5 w-5 text-cyan-200" />
          <p className="text-cyan-100 font-semibold">{player.coins} coins</p>
        </div>
      </div>
    </div>
  );
}
