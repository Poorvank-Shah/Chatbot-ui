"use client"

// import { ChannelType, MemberRole } from "@prisma/client"
import { Plus, Settings } from "lucide-react"

// import { ServerWithMembersWithProfiles } from "@/types"
// import { ActionTooltip } from "@/components/action-tooltip";
// import { useModal } from "@/hooks/use-modal-store";

interface ServerSectionProps {
  label: string
  role?: string
  sectionType: "channels" | "members"
  channelType?: string
  server: string
}

export const ServerSection = ({
  label,
  role,
  sectionType,
  channelType,
  server
}: ServerSectionProps) => {
  // const { onOpen } = useModal();

  return (
    <div className="flex items-center justify-between py-2">
      <p className="text-xs uppercase font-semibold text-zinc-500 dark:text-zinc-400">
        {label}
      </p>
      {role !== "guest" && sectionType === "channels" && (
        <button
          // onClick={() => onOpen("createChannel", { channelType })}
          className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition"
        >
          <Plus className="h-4 w-4" />
        </button>
      )}
      {role === "admin" && sectionType === "members" && (
        <button
          // onClick={() => onOpen("members", { server })}
          className="text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition"
        >
          <Settings className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}
