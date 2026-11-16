"use client";

import {
  closestCenter,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import { sectionDefinitionMap } from "@/lib/customizer/sections";
import type { SectionId } from "@/lib/customizer/types";

type SectionListProps = {
  order: SectionId[];
  sections: Record<SectionId, { visible: boolean }>;
  selectedId: SectionId | null;
  onSelect: (id: SectionId) => void;
  onReorder: (order: SectionId[]) => void;
  onToggleVisible: (id: SectionId) => void;
};

type SortableItemProps = {
  id: SectionId;
  visible: boolean;
  selected: boolean;
  onSelect: () => void;
  onToggleVisible: () => void;
};

function SortableItem({
  id,
  visible,
  selected,
  onSelect,
  onToggleVisible,
}: SortableItemProps) {
  const definition = sectionDefinitionMap[id];
  const locked = definition.lockedPosition !== null || !definition.hideable;
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id, disabled: locked });

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      onClick={onSelect}
      className={`flex cursor-pointer items-center gap-2 rounded-xl border px-2 py-2 transition hover:border-[#1b1a17]/40 ${
        selected
          ? "border-[#1b1a17] bg-white shadow-sm"
          : "border-transparent bg-white/50"
      } ${isDragging ? "opacity-60" : ""} ${visible ? "" : "opacity-55"}`}
    >
      <button
        type="button"
        {...attributes}
        {...listeners}
        disabled={locked}
        onClick={(e) => e.stopPropagation()}
        aria-label={`Geser ${definition.label}`}
        className={`flex h-8 w-7 shrink-0 items-center justify-center rounded-lg text-xs ${
          locked
            ? "cursor-not-allowed opacity-30"
            : "cursor-grab text-[#8a8375] hover:bg-[#f4f1ea] active:cursor-grabbing"
        }`}
      >
        ⠿
      </button>

      <div className="flex-1 truncate text-xs font-medium">
        {definition.label}
        {definition.lockedPosition === "first" && (
          <span className="ml-1 text-[9px] uppercase tracking-wide opacity-50">
            awal
          </span>
        )}
        {definition.lockedPosition === "last" && (
          <span className="ml-1 text-[9px] uppercase tracking-wide opacity-50">
            akhir
          </span>
        )}
      </div>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onToggleVisible();
        }}
        disabled={!definition.hideable}
        aria-label={
          visible
            ? `Sembunyikan ${definition.label}`
            : `Tampilkan ${definition.label}`
        }
        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[11px] ${
          definition.hideable
            ? "hover:bg-[#f4f1ea]"
            : "cursor-not-allowed opacity-30"
        }`}
      >
        {visible ? "◉" : "○"}
      </button>
    </div>
  );
}

export default function SectionList({
  order,
  sections,
  selectedId,
  onSelect,
  onReorder,
  onToggleVisible,
}: SectionListProps) {
  const [activeId, setActiveId] = useState<SectionId | null>(null);
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 150, tolerance: 8 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id as SectionId);
  }

  function handleDragEnd(event: DragEndEvent) {
    setActiveId(null);
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = order.indexOf(active.id as SectionId);
    const newIndex = order.indexOf(over.id as SectionId);
    if (oldIndex < 0 || newIndex < 0) return;

    onReorder(arrayMove(order, oldIndex, newIndex));
  }

  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-[#1b1a17]/10 px-4 py-4">
        <p className="text-[10px] uppercase tracking-[0.25em] text-[#8a8375]">
          Urutan section
        </p>
        <p className="mt-1 text-xs text-[#5f5a50]">
          Geser untuk mengubah urutan. Envelope dan penutup terkunci.
        </p>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-3">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragCancel={() => setActiveId(null)}
        >
          <SortableContext items={order} strategy={verticalListSortingStrategy}>
            <div className="flex flex-col gap-1.5">
              {order.map((id) => (
                <SortableItem
                  key={id}
                  id={id}
                  visible={sections[id].visible}
                  selected={selectedId === id}
                  onSelect={() => onSelect(id)}
                  onToggleVisible={() => onToggleVisible(id)}
                />
              ))}
            </div>
          </SortableContext>

          <DragOverlay>
            {activeId ? (
              <div className="rounded-xl border border-[#1b1a17] bg-white px-4 py-3 text-xs font-medium shadow-lg">
                {sectionDefinitionMap[activeId].label}
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  );
}
