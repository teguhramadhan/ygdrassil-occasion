"use client";

import type {
  GalleryItem,
  InvitationEvent,
  StoryItem,
} from "@/lib/invitation";
import { getByPath } from "@/lib/customizer/path";
import { sectionDefinitionMap } from "@/lib/customizer/sections";
import type {
  CustomizerConfig,
  FieldDefinition,
  SectionId,
  SectionLabel,
} from "@/lib/customizer/types";
import ColorField from "./ColorField";
import ImageUpload from "./ImageUpload";

type DataPanelProps = {
  sectionId: SectionId;
  config: CustomizerConfig;
  slug: string;
  images: Record<string, string>;
  onInvitationChange: (path: string, value: unknown) => void;
  onLabelChange: (
    id: SectionId,
    field: keyof SectionLabel,
    value: string,
  ) => void;
  onUploaded: (id: string, url: string) => void;
  onRemoved: (id: string) => void;
  onError: (message: string) => void;
};

const inputClass =
  "w-full rounded-lg border border-[#1b1a17]/15 bg-white px-3 py-2 text-xs text-[#1b1a17] outline-none focus:border-[#1b1a17]";

function toDateTimeLocal(value: unknown): string {
  if (typeof value !== "string") return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60_000);
  return local.toISOString().slice(0, 16);
}

function fromDateTimeLocal(value: string): string {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toISOString();
}

function FieldInput({
  field,
  value,
  onChange,
}: {
  field: FieldDefinition;
  value: unknown;
  onChange: (value: unknown) => void;
}) {
  if (field.kind === "hex") {
    return (
      <ColorField
        label={field.label}
        value={typeof value === "string" ? value : "#000000"}
        onChange={onChange}
      />
    );
  }

  return (
    <label className="flex flex-col gap-1.5 text-[10px] uppercase tracking-[0.18em] text-[#8a8375]">
      {field.label}
      {field.kind === "textarea" ? (
        <textarea
          rows={3}
          value={typeof value === "string" ? value : ""}
          placeholder={field.placeholder}
          onChange={(event) => onChange(event.target.value)}
          className={`${inputClass} resize-none tracking-normal`}
        />
      ) : field.kind === "datetime" ? (
        <input
          type="datetime-local"
          value={toDateTimeLocal(value)}
          onChange={(event) => onChange(fromDateTimeLocal(event.target.value))}
          className={`${inputClass} tracking-normal`}
        />
      ) : (
        <input
          type={field.kind === "url" ? "url" : "text"}
          value={typeof value === "string" ? value : ""}
          placeholder={field.placeholder}
          onChange={(event) => onChange(event.target.value)}
          className={`${inputClass} tracking-normal`}
        />
      )}
    </label>
  );
}

function ListShell({
  title,
  onAdd,
  children,
}: {
  title: string;
  onAdd: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <p className="text-[10px] uppercase tracking-[0.2em] text-[#8a8375]">
          {title}
        </p>
        <button
          type="button"
          onClick={onAdd}
          className="rounded-full border border-[#1b1a17]/15 px-3 py-1 text-[10px] transition hover:bg-white"
        >
          + Tambah
        </button>
      </div>
      {children}
    </div>
  );
}

function ItemShell({
  onRemove,
  canRemove = true,
  children,
}: {
  onRemove: () => void;
  canRemove?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2 rounded-xl border border-[#1b1a17]/10 bg-white/50 p-3">
      {children}
      <button
        type="button"
        onClick={onRemove}
        disabled={!canRemove}
        className="self-end rounded-full border border-[#a33a3a]/30 px-3 py-1 text-[10px] text-[#a33a3a] transition hover:bg-[#f9ecec] disabled:cursor-not-allowed disabled:opacity-40"
      >
        Hapus
      </button>
    </div>
  );
}

export default function DataPanel({
  sectionId,
  config,
  slug,
  images,
  onInvitationChange,
  onLabelChange,
  onUploaded,
  onRemoved,
  onError,
}: DataPanelProps) {
  const definition = sectionDefinitionMap[sectionId];
  const labels = config.data.labels[sectionId];
  const invitation = config.data.invitation;

  function updateListItem<T>(
    path: string,
    list: T[],
    index: number,
    patch: Partial<T>,
  ) {
    onInvitationChange(
      path,
      list.map((item, itemIndex) =>
        itemIndex === index ? { ...item, ...patch } : item,
      ),
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-3">
        <p className="text-[10px] uppercase tracking-[0.2em] text-[#8a8375]">
          Judul section
        </p>
        {sectionId !== "envelope" && (
          <FieldInput
            field={{ path: "label.heading", label: "Heading", kind: "text" }}
            value={labels.heading}
            onChange={(value) =>
              onLabelChange(sectionId, "heading", String(value))
            }
          />
        )}
        <FieldInput
          field={{ path: "label.eyebrow", label: "Eyebrow", kind: "text" }}
          value={labels.eyebrow}
          onChange={(value) =>
            onLabelChange(sectionId, "eyebrow", String(value))
          }
        />
        <FieldInput
          field={{ path: "label.note", label: "Catatan", kind: "textarea" }}
          value={labels.note}
          onChange={(value) => onLabelChange(sectionId, "note", String(value))}
        />
      </div>

      {definition.fields.length > 0 && (
        <div className="flex flex-col gap-3 border-t border-[#1b1a17]/10 pt-4">
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#8a8375]">
            Data
          </p>
          {definition.fields.map((field) => (
            <FieldInput
              key={field.path}
              field={field}
              value={getByPath(invitation, field.path)}
              onChange={(value) => onInvitationChange(field.path, value)}
            />
          ))}
        </div>
      )}

      {sectionId === "story" && (
        <div className="border-t border-[#1b1a17]/10 pt-4">
          <ListShell
            title="Kisah"
            onAdd={() =>
              onInvitationChange("story", [
                ...invitation.story,
                { year: "", title: "", text: "" } satisfies StoryItem,
              ])
            }
          >
            {invitation.story.map((item, index) => (
              <ItemShell
                key={`story-${index}`}
                onRemove={() =>
                  onInvitationChange(
                    "story",
                    invitation.story.filter((_, i) => i !== index),
                  )
                }
              >
                <FieldInput
                  field={{ path: "year", label: "Tahun", kind: "text" }}
                  value={item.year}
                  onChange={(value) =>
                    updateListItem("story", invitation.story, index, {
                      year: String(value),
                    })
                  }
                />
                <FieldInput
                  field={{ path: "title", label: "Judul", kind: "text" }}
                  value={item.title}
                  onChange={(value) =>
                    updateListItem("story", invitation.story, index, {
                      title: String(value),
                    })
                  }
                />
                <FieldInput
                  field={{ path: "text", label: "Teks", kind: "textarea" }}
                  value={item.text}
                  onChange={(value) =>
                    updateListItem("story", invitation.story, index, {
                      text: String(value),
                    })
                  }
                />
              </ItemShell>
            ))}
          </ListShell>
        </div>
      )}

      {sectionId === "events" && (
        <div className="border-t border-[#1b1a17]/10 pt-4">
          <ListShell
            title="Acara"
            onAdd={() =>
              onInvitationChange("events", [
                ...invitation.events,
                {
                  label: "",
                  date: "",
                  time: "",
                  place: "",
                  address: "",
                } satisfies InvitationEvent,
              ])
            }
          >
            {invitation.events.map((event, index) => (
              <ItemShell
                key={`event-${index}`}
                canRemove={invitation.events.length > 1}
                onRemove={() =>
                  onInvitationChange(
                    "events",
                    invitation.events.filter((_, i) => i !== index),
                  )
                }
              >
                <FieldInput
                  field={{ path: "label", label: "Label", kind: "text" }}
                  value={event.label}
                  onChange={(value) =>
                    updateListItem("events", invitation.events, index, {
                      label: String(value),
                    })
                  }
                />
                <FieldInput
                  field={{ path: "date", label: "Tanggal", kind: "text" }}
                  value={event.date}
                  onChange={(value) =>
                    updateListItem("events", invitation.events, index, {
                      date: String(value),
                    })
                  }
                />
                <FieldInput
                  field={{ path: "time", label: "Waktu", kind: "text" }}
                  value={event.time}
                  onChange={(value) =>
                    updateListItem("events", invitation.events, index, {
                      time: String(value),
                    })
                  }
                />
                <FieldInput
                  field={{ path: "place", label: "Tempat", kind: "text" }}
                  value={event.place}
                  onChange={(value) =>
                    updateListItem("events", invitation.events, index, {
                      place: String(value),
                    })
                  }
                />
                <FieldInput
                  field={{ path: "address", label: "Alamat", kind: "textarea" }}
                  value={event.address}
                  onChange={(value) =>
                    updateListItem("events", invitation.events, index, {
                      address: String(value),
                    })
                  }
                />
              </ItemShell>
            ))}
          </ListShell>
        </div>
      )}

      {sectionId === "gallery" && (
        <div className="border-t border-[#1b1a17]/10 pt-4">
          <ListShell
            title="Galeri"
            onAdd={() =>
              onInvitationChange("gallery", [
                ...invitation.gallery,
                {
                  label: "",
                  from: "#e7d3d5",
                  to: "#c9a3a7",
                } satisfies GalleryItem,
              ])
            }
          >
            {invitation.gallery.map((item, index) => {
              const previewUrl = item.imageId
                ? images[item.imageId]
                : item.imageUrl;

              return (
                <ItemShell
                  key={`gallery-${index}`}
                  onRemove={() =>
                    onInvitationChange(
                      "gallery",
                      invitation.gallery.filter((_, i) => i !== index),
                    )
                  }
                >
                  <FieldInput
                    field={{ path: "label", label: "Label", kind: "text" }}
                    value={item.label}
                    onChange={(value) =>
                      updateListItem("gallery", invitation.gallery, index, {
                        label: String(value),
                      })
                    }
                  />
                  <ImageUpload
                    slug={slug}
                    value={item.imageId}
                    previewUrl={previewUrl}
                    onChange={(imageId) =>
                      updateListItem("gallery", invitation.gallery, index, {
                        imageId,
                      })
                    }
                    onUploaded={onUploaded}
                    onRemoved={onRemoved}
                    onError={onError}
                  />
                  <ColorField
                    label="Warna awal"
                    value={item.from}
                    onChange={(from) =>
                      updateListItem("gallery", invitation.gallery, index, {
                        from,
                      })
                    }
                  />
                  <ColorField
                    label="Warna akhir"
                    value={item.to}
                    onChange={(to) =>
                      updateListItem("gallery", invitation.gallery, index, {
                        to,
                      })
                    }
                  />
                  <FieldInput
                    field={{
                      path: "imageUrl",
                      label: "URL gambar (opsional)",
                      kind: "url",
                    }}
                    value={item.imageUrl}
                    onChange={(value) =>
                      updateListItem("gallery", invitation.gallery, index, {
                        imageUrl: String(value) || undefined,
                      })
                    }
                  />
                </ItemShell>
              );
            })}
          </ListShell>
        </div>
      )}

      {sectionId === "dresscode" && (
        <div className="border-t border-[#1b1a17]/10 pt-4">
          <ListShell
            title="Warna dress code"
            onAdd={() =>
              onInvitationChange("dresscode.colors", [
                ...invitation.dresscode.colors,
                { name: "", hex: "#cccccc" },
              ])
            }
          >
            {invitation.dresscode.colors.map((color, index) => (
              <ItemShell
                key={`color-${index}`}
                canRemove={invitation.dresscode.colors.length > 1}
                onRemove={() =>
                  onInvitationChange(
                    "dresscode.colors",
                    invitation.dresscode.colors.filter((_, i) => i !== index),
                  )
                }
              >
                <FieldInput
                  field={{ path: "name", label: "Nama warna", kind: "text" }}
                  value={color.name}
                  onChange={(value) =>
                    updateListItem(
                      "dresscode.colors",
                      invitation.dresscode.colors,
                      index,
                      { name: String(value) },
                    )
                  }
                />
                <ColorField
                  label="Hex"
                  value={color.hex}
                  onChange={(hex) =>
                    updateListItem(
                      "dresscode.colors",
                      invitation.dresscode.colors,
                      index,
                      { hex },
                    )
                  }
                />
              </ItemShell>
            ))}
          </ListShell>
        </div>
      )}

      {sectionId === "gift" && (
        <div className="border-t border-[#1b1a17]/10 pt-4">
          <ListShell
            title="Rekening"
            onAdd={() =>
              onInvitationChange("gift.accounts", [
                ...invitation.gift.accounts,
                { bank: "", number: "", holder: "" },
              ])
            }
          >
            {invitation.gift.accounts.map((account, index) => (
              <ItemShell
                key={`account-${index}`}
                canRemove={invitation.gift.accounts.length > 1}
                onRemove={() =>
                  onInvitationChange(
                    "gift.accounts",
                    invitation.gift.accounts.filter((_, i) => i !== index),
                  )
                }
              >
                <FieldInput
                  field={{ path: "bank", label: "Bank", kind: "text" }}
                  value={account.bank}
                  onChange={(value) =>
                    updateListItem(
                      "gift.accounts",
                      invitation.gift.accounts,
                      index,
                      { bank: String(value) },
                    )
                  }
                />
                <FieldInput
                  field={{ path: "number", label: "Nomor", kind: "text" }}
                  value={account.number}
                  onChange={(value) =>
                    updateListItem(
                      "gift.accounts",
                      invitation.gift.accounts,
                      index,
                      { number: String(value) },
                    )
                  }
                />
                <FieldInput
                  field={{ path: "holder", label: "Pemilik", kind: "text" }}
                  value={account.holder}
                  onChange={(value) =>
                    updateListItem(
                      "gift.accounts",
                      invitation.gift.accounts,
                      index,
                      { holder: String(value) },
                    )
                  }
                />
              </ItemShell>
            ))}
          </ListShell>
        </div>
      )}
    </div>
  );
}
