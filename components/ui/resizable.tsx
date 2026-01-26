"use client"

import { GripVertical } from "lucide-react"
import { Group, Panel, Separator } from "react-resizable-panels"
import { ComponentProps } from "react"
import { cn } from "@/lib/utils"

const ResizablePanelGroup = ({
  className,
  ...props
}: ComponentProps<typeof Group>) => (
  <Group
    data-slot="resizable-panel-group"
    className={cn(
      "flex h-full w-full aria-[orientation=vertical]:flex-col",
      className
    )}
    {...props}
  />
)

const ResizablePanel = ({
  ...props
}: ComponentProps<typeof Panel>) => (
  <Panel data-slot="resizable-panel" {...props} />
)

const ResizableHandle = ({
  withHandle,
  className,
  ...props
}: ComponentProps<typeof Separator> & {
  withHandle?: boolean
}) => (
  <Separator
    data-slot="resizable-handle"
    className={cn(
      "bg-border relative flex w-px items-center justify-center after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 aria-[orientation=vertical]:h-px aria-[orientation=vertical]:w-full aria-[orientation=vertical]:after:left-0 aria-[orientation=vertical]:after:h-1 aria-[orientation=vertical]:after:w-full aria-[orientation=vertical]:after:-translate-y-1/2 aria-[orientation=vertical]:after:translate-x-0 [&[aria-orientation=vertical]>div]:rotate-90",
      className
    )}
    {...props}
  >
    {withHandle && (
      <div className="bg-border z-10 flex h-4 w-3 items-center justify-center rounded-sm border">
        <GripVertical className="h-2.5 w-2.5" />
      </div>
    )}
  </Separator>
)

export { ResizablePanelGroup, ResizablePanel, ResizableHandle }