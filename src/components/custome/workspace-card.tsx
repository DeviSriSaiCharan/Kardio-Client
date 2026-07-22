'use client';

import { Workspace } from '@/types/workspace';
import {
  AvatarGroup,
  Avatar,
  AvatarFallback,
  AvatarImage,
  AvatarGroupCount,
} from '@/components/ui/avatar';
import { MoreHorizontal, ArrowRight } from 'lucide-react';
import Color from 'color';

// ─── Mini task bar row ─────────────────────────────────────────────────────────
function TaskRow({ dotColor }: { dotColor: string }) {
  return (
    <div className="flex items-center gap-2 bg-zinc-200/50 p-2 rounded-sm">
      <span
        style={{
          display: 'inline-block',
          width: 7,
          height: 7,
          borderRadius: '50%',
          backgroundColor: dotColor,
          flexShrink: 0,
        }}
      />
      <span
        style={{
          height: 8,
          borderRadius: 4,
          flex: 1,
        }}
      />
    </div>
  );
}

// ─── Mini kanban preview ───────────────────────────────────────────────────────
function KanbanPreview({ dotColor }: { dotColor: string }) {
  const cols = ['To Do', 'In Progress', 'Done'];
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 8,
        marginTop: 14,
        marginBottom: 14,
      }}
    >
      {cols.map((col) => (
        <div
          key={col}
          className="flex flex-col gap-1 border p-2 rounded-sm shadow-xs"
        >
          <p
            style={{
              fontSize: 10,
              fontWeight: 500,
              color: '#9ca3af',
              marginBottom: 4,
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
            }}
          >
            {col}
          </p>
          <TaskRow dotColor={dotColor} />
          <TaskRow dotColor={dotColor} />
        </div>
      ))}
    </div>
  );
}

// ─── WorkspaceCard ─────────────────────────────────────────────────────────────
export default function WorkspaceCard({ workspace }: { workspace: Workspace }) {
  // const accent = accentColors[workspace.color];
  const visibleMembers = workspace.members.slice(0, 3);
  const extraCount = workspace.members.length - visibleMembers.length;

  const updatedAt = new Date(workspace.updatedAt);
  const currentDate = new Date();

  let updateStatus = updatedAt.toDateString();
  if (currentDate.getDate() - updatedAt.getDate() === 1) {
    updateStatus = 'Yesterday';
  } else if (currentDate.getDate() - updatedAt.getDate() === 0) {
    updateStatus = 'Today';
  }

  const hexColor = workspace.workspaceColor;
  const hue = Color(hexColor).hue();

  const accent = {
    border: `hsl(${hue}, 70%, 50%)`,
    iconBg: `hsl(${hue}, 30%, 90%)`,
    iconText: `hsl(${hue}, 70%, 30%)`,
    dot: `hsl(${hue}, 70%, 50%)`,
  };

  return (
    <div
      className="h-60 group bg-zinc-50 rounded-lg border border-border shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
      style={{ borderTop: `3px solid ${accent.border}` }}
    >
      <div className="p-5 h-full flex flex-col justify-between">
        {/* ── Header ── */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            {/* Icon badge */}
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
              style={{ backgroundColor: accent.iconBg, color: accent.iconText }}
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                <rect x="3" y="3" width="7.5" height="7.5" rx="2" />
                <rect x="13.5" y="3" width="7.5" height="7.5" rx="2" />
                <rect x="3" y="13.5" width="7.5" height="7.5" rx="2" />
                <rect x="13.5" y="13.5" width="7.5" height="7.5" rx="2" />
              </svg>
            </div>

            {/* Name + meta */}
            <div>
              <h2 className="text-sm font-semibold text-foreground leading-tight">
                {workspace.title}
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                {'0 '} boards&nbsp;·&nbsp;
                {workspace.members.length} members
              </p>
            </div>
          </div>

          {/* More button */}
          <button className="text-muted-foreground hover:text-foreground transition-colors p-1 -mr-1 rounded-md hover:bg-accent">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>

        {/* ── Mini kanban ── */}
        <KanbanPreview dotColor={accent.dot} />

        {/* ── Footer ── */}
        <div className="flex items-center justify-between pt-3 border-t border-border">
          {/* Avatars */}
          <AvatarGroup>
            {visibleMembers.map((member) => (
              <Avatar
                key={member.id}
                size="sm"
                className="border border-zinc-300"
              >
                <AvatarImage src={undefined} />
                <AvatarFallback className="text-[10px]">
                  {member.name.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            ))}
            {extraCount > 0 && (
              <AvatarGroupCount className="size-6! text-[10px] border border-zinc-300">
                +{extraCount}
              </AvatarGroupCount>
            )}
          </AvatarGroup>

          {/* Timestamp + arrow */}
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] text-muted-foreground">
              Updated {updateStatus}
            </span>
            <button className="text-muted-foreground hover:text-foreground transition-colors">
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
