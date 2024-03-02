import { ChatbotUIContext } from "@/context/context"
import { Tables } from "@/supabase/types"
import { ContentType } from "@/types"
import { FC, useContext } from "react"
import { SIDEBAR_WIDTH } from "../ui/dashboard"
import { TabsContent } from "../ui/tabs"
import { WorkspaceSwitcher } from "../utility/workspace-switcher"
import { WorkspaceSettings } from "../workspace/workspace-settings"
import { SidebarContent } from "./sidebar-content"

import { ServerHeader } from "./server/server-header"
import { ServerSearch } from "./server/server-search"
import { ServerSection } from "./server/server-section"
import { ServerChannel } from "./server/server-channel"
import { ServerMember } from "./server/server-member"
import { Hash, Mic, ShieldAlert, ShieldCheck, Video } from "lucide-react"
import { string } from "zod"

interface SidebarProps {
  contentType: ContentType
  showSidebar: boolean
}

export const Sidebar: FC<SidebarProps> = ({ contentType, showSidebar }) => {
  const {
    folders,
    chats,
    presets,
    prompts,
    files,
    collections,
    assistants,
    tools,
    models
  } = useContext(ChatbotUIContext)

  const iconMap = {
    text: <Hash className="mr-2 h-4 w-4" />,
    audio: <Mic className="mr-2 h-4 w-4" />,
    video: <Video className="mr-2 h-4 w-4" />
  }

  const roleIconMap = {
    guest: null,
    moderator: <ShieldCheck className="h-4 w-4 mr-2 text-indigo-500" />,
    admin: <ShieldAlert className="h-4 w-4 mr-2 text-rose-500" />
  }

  const textChannels = [
    {
      id: "1",
      name: "Text Channel 1",
      type: "text"
    },
    {
      id: "2",
      name: "Text Channel 2",
      type: "text"
    },
    {
      id: "3",
      name: "Text Channel 3",
      type: "text"
    },
    {
      id: "4",
      name: "Text Channel 4",
      type: "text"
    }
  ]

  const audioChannels = [
    {
      id: "1",
      name: "Audio Channel 1",
      type: "audio"
    }
  ]

  const videoChannels = [
    {
      id: "1",
      name: "Video Channel 1",
      type: "video"
    }
  ]

  const members = [
    {
      id: "1",
      name: "Member 1",
      role: "admin"
    },
    {
      id: "2",
      name: "Member 2",
      role: "moderator"
    },
    {
      id: "3",
      name: "Member 3",
      role: "guest"
    },
    {
      id: "4",
      name: "Member 4",
      role: "guest"
    }
  ]

  const role = "admin"
  let server = "public"

  const chatFolders = folders.filter(folder => folder.type === "chats")
  const presetFolders = folders.filter(folder => folder.type === "presets")
  const promptFolders = folders.filter(folder => folder.type === "prompts")
  const filesFolders = folders.filter(folder => folder.type === "files")
  const collectionFolders = folders.filter(
    folder => folder.type === "collections"
  )
  const assistantFolders = folders.filter(
    folder => folder.type === "assistants"
  )
  const toolFolders = folders.filter(folder => folder.type === "tools")
  const modelFolders = folders.filter(folder => folder.type === "models")

  const renderSidebarContent = (
    contentType: ContentType,
    data: any[],
    folders: Tables<"folders">[]
  ) => {
    return (
      <SidebarContent contentType={contentType} data={data} folders={folders} />
    )
  }

  return (
    <TabsContent
      className="m-0 w-full space-y-2 flex justify-between flex-col"
      style={{
        // Sidebar - SidebarSwitcher
        minWidth: showSidebar ? `calc(${SIDEBAR_WIDTH}px - 60px)` : "0px",
        maxWidth: showSidebar ? `calc(${SIDEBAR_WIDTH}px - 60px)` : "0px",
        width: showSidebar ? `calc(${SIDEBAR_WIDTH}px - 60px)` : "0px"
      }}
      value={contentType}
    >
      <div className="flex h-[50%] w-full flex-col p-3 overflow-auto">
        <div className="flex items-center border-b-2 pb-2">
          <WorkspaceSwitcher />

          <WorkspaceSettings />
        </div>

        {(() => {
          switch (contentType) {
            case "chats":
              return renderSidebarContent("chats", chats, chatFolders)

            case "presets":
              return renderSidebarContent("presets", presets, presetFolders)

            case "prompts":
              return renderSidebarContent("prompts", prompts, promptFolders)

            case "files":
              return renderSidebarContent("files", files, filesFolders)

            case "collections":
              return renderSidebarContent(
                "collections",
                collections,
                collectionFolders
              )

            case "assistants":
              return renderSidebarContent(
                "assistants",
                assistants,
                assistantFolders
              )

            case "tools":
              return renderSidebarContent("tools", tools, toolFolders)

            case "models":
              return renderSidebarContent("models", models, modelFolders)

            default:
              return null
          }
        })()}
      </div>
      <hr className="w-[calc(100%-8px)]" />
      <div className="flex h-[50%] w-full flex-col p-3 overflow-auto">
        <ServerHeader server={server} role={role} />
        <div className="mt-2">
          <ServerSearch
            data={[
              {
                label: "Text Channels",
                type: "channel",
                data: textChannels?.map(channel => ({
                  id: channel.id,
                  name: channel.name,
                  icon: iconMap.text
                }))
              },
              {
                label: "Voice Channels",
                type: "channel",
                data: audioChannels?.map((channel: any) => ({
                  id: channel.id,
                  name: channel.name,
                  icon: iconMap.audio
                }))
              },
              {
                label: "Video Channels",
                type: "channel",
                data: videoChannels?.map((channel: any) => ({
                  id: channel.id,
                  name: channel.name,
                  icon: iconMap.video
                }))
              },
              {
                label: "Members",
                type: "member",
                data: members?.map(member => ({
                  id: member.id,
                  name: member.name,
                  icon: roleIconMap.admin // look afterwards
                }))
              }
            ]}
          />
        </div>
        <hr />

        {!!textChannels?.length && (
          <div className="mb-2">
            <ServerSection
              sectionType="channels"
              channelType="text"
              role={role}
              label="Text Channels"
              server={server}
            />
            <div className="space-y-[2px]">
              {textChannels.map(channel => (
                <ServerChannel
                  key={channel.id}
                  channel={channel}
                  role={role}
                  server={server}
                />
              ))}
            </div>
          </div>
        )}
        {!!audioChannels?.length && (
          <div className="mb-2">
            <ServerSection
              sectionType="channels"
              channelType="audio"
              role={role}
              label="Voice Channels"
              server={server}
            />
            <div className="space-y-[2px]">
              {audioChannels.map(channel => (
                <ServerChannel
                  key={channel.id}
                  channel={channel}
                  role={role}
                  server={server}
                />
              ))}
            </div>
          </div>
        )}
        {!!videoChannels?.length && (
          <div className="mb-2">
            <ServerSection
              sectionType="channels"
              channelType="video"
              role={role}
              label="Video Channels"
              server={server}
            />
            <div className="space-y-[2px]">
              {videoChannels.map(channel => (
                <ServerChannel
                  key={channel.id}
                  channel={channel}
                  role={role}
                  server={server}
                />
              ))}
            </div>
          </div>
        )}
        {/* {!!members?.length && (
          <div className="mb-2">
            <ServerSection
              sectionType="members"
              role={role}
              label="Members"
              server={server}
            />
            <div className="space-y-[2px]">
              {members.map(member => (
                <ServerMember key={member.id} member={member} server={server} />
              ))}
            </div>
          </div>
        )} */}
      </div>
    </TabsContent>
  )
}
