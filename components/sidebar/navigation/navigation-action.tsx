"use client"

import { Plus } from "lucide-react"

// import { ActionTooltip } from "@/components/action-tooltip";
// import { useModal } from "@/hooks/use-modal-store"

export const NavigationAction = () => {
  // const { onOpen } = useModal()

  return (
    <div>
      <button
        // onClick={() => onOpen("createServer")}
        className="group flex items-center"
      >
        <div className="flex mx-3 h-[40px] w-[40px] rounded-[20px] group-hover:rounded-[10px] transition-all overflow-hidden items-center justify-center bg-background dark:bg-neutral-700 group-hover:bg-emerald-500">
          <Plus
            className="group-hover:text-white transition text-emerald-500"
            size={25}
          />
        </div>
      </button>
    </div>
  )
}
