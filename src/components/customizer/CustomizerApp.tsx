"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import type { Invitation } from "@/lib/invitation";
import { createDefaultConfig } from "@/lib/customizer/defaults";
import { deleteImagesBySlug, listImages } from "@/lib/customizer/image-store";
import { normalizeConfig, normalizeOrder } from "@/lib/customizer/normalize";
import { setByPath } from "@/lib/customizer/path";
import { customizerConfigSchema } from "@/lib/customizer/schema";
import { sectionDefinitionMap } from "@/lib/customizer/sections";
import {
  clearStoredConfig,
  loadStoredConfig,
  lock,
  saveStoredConfig,
} from "@/lib/customizer/storage";
import { getThemePreset } from "@/lib/customizer/theme-presets";
import type {
  Align,
  BackgroundConfig,
  CustomizerConfig,
  SectionId,
  SectionLabel,
  SectionStyle,
} from "@/lib/customizer/types";
import CustomizerToolbar from "./CustomizerToolbar";
import Preview from "./preview/Preview";
import SectionInspector from "./SectionInspector";
import SectionList from "./SectionList";
import Toast from "./Toast";

type Action =
  | { type: "replace"; config: CustomizerConfig }
  | { type: "reorder"; order: SectionId[] }
  | { type: "toggleVisible"; id: SectionId }
  | { type: "updateInvitation"; path: string; value: unknown }
  | { type: "updateLabel"; id: SectionId; field: keyof SectionLabel; value: string }
  | { type: "setStyle"; id: SectionId; patch: Partial<SectionStyle> }
  | { type: "setAlign"; id: SectionId; element: string; align: Align };

function reducer(state: CustomizerConfig, action: Action): CustomizerConfig {
  switch (action.type) {
    case "replace":
      return action.config;
    case "reorder":
      return { ...state, order: normalizeOrder(action.order) };
    case "toggleVisible": {
      const definition = sectionDefinitionMap[action.id];
      if (!definition.hideable) return state;

      return {
        ...state,
        sections: {
          ...state.sections,
          [action.id]: {
            ...state.sections[action.id],
            visible: !state.sections[action.id].visible,
          },
        },
      };
    }
    case "updateInvitation": {
      const invitation = setByPath(
        state.data.invitation,
        action.path,
        action.value,
      );

      return {
        ...state,
        data: { ...state.data, invitation },
      };
    }
    case "updateLabel":
      return {
        ...state,
        data: {
          ...state.data,
          labels: {
            ...state.data.labels,
            [action.id]: {
              ...state.data.labels[action.id],
              [action.field]: action.value,
            },
          },
        },
      };
    case "setStyle":
      return {
        ...state,
        sections: {
          ...state.sections,
          [action.id]: {
            ...state.sections[action.id],
            ...action.patch,
          },
        },
      };
    case "setAlign": {
      const current = state.sections[action.id];
      return {
        ...state,
        sections: {
          ...state.sections,
          [action.id]: {
            ...current,
            align: {
              ...current.align,
              [action.element]: action.align,
            },
          },
        },
      };
    }
    default:
      return state;
  }
}

type MobileTab = "sections" | "preview" | "inspector";

export default function CustomizerApp({
  invitation,
}: {
  invitation: Invitation;
}) {
  const preset = useMemo(
    () => getThemePreset(invitation.themeId),
    [invitation.themeId],
  );
  const [config, dispatch] = useReducer(
    reducer,
    undefined,
    () => createDefaultConfig(invitation, preset),
  );
  const [selectedId, setSelectedId] = useState<SectionId | null>("hero");
  const [opened, setOpened] = useState(true);
  const [ready, setReady] = useState(false);
  const [saved, setSaved] = useState(true);
  const [mobileTab, setMobileTab] = useState<MobileTab>("preview");
  const [images, setImages] = useState<Record<string, string>>({});
  const [toast, setToast] = useState<{
    message: string;
    tone: "info" | "error";
  } | null>(null);

  const imageUrlsRef = useRef<string[]>([]);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = useCallback(
    (message: string, tone: "info" | "error" = "info") => {
      setToast({ message, tone });
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
      toastTimerRef.current = setTimeout(() => setToast(null), 3500);
    },
    [],
  );

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    };
  }, []);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      const stored = loadStoredConfig(invitation.slug);
      const next = stored
        ? normalizeConfig(stored, invitation, preset)
        : createDefaultConfig(invitation, preset);

      dispatch({ type: "replace", config: next });
      setReady(true);
    }, 0);

    return () => window.clearTimeout(timeout);
  }, [invitation, preset]);

  useEffect(() => {
    if (!ready) return;

    const mark = window.setTimeout(() => setSaved(false), 0);
    const timeout = setTimeout(() => {
      const ok = saveStoredConfig(config);
      setSaved(true);
      if (!ok) {
        showToast(
          "Gagal menyimpan ke localStorage. Perubahan hanya ada di sesi ini.",
          "error",
        );
      }
    }, 500);

    return () => {
      window.clearTimeout(mark);
      clearTimeout(timeout);
    };
  }, [config, ready, showToast]);

  const loadImages = useCallback(async () => {
    try {
      const list = await listImages(invitation.slug);
      imageUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));

      const nextImages: Record<string, string> = {};
      const urls: string[] = [];

      list.forEach((image) => {
        const url = URL.createObjectURL(image.blob);
        nextImages[image.id] = url;
        urls.push(url);
      });

      imageUrlsRef.current = urls;
      setImages(nextImages);
    } catch {
      showToast("Gambar tidak dapat dimuat dari IndexedDB.", "error");
    }
  }, [invitation.slug, showToast]);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      void loadImages();
    }, 0);

    return () => {
      window.clearTimeout(timeout);
      imageUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
      imageUrlsRef.current = [];
    };
  }, [loadImages]);

  function registerImage(id: string, url: string) {
    setImages((previous) => {
      const old = previous[id];
      if (old) URL.revokeObjectURL(old);
      return { ...previous, [id]: url };
    });
    imageUrlsRef.current.push(url);
  }

  function removeImage(id: string) {
    setImages((previous) => {
      const next = { ...previous };
      const old = next[id];
      if (old) URL.revokeObjectURL(old);
      delete next[id];
      return next;
    });
  }

  function handleSelect(id: SectionId) {
    setSelectedId(id);
    if (id !== "envelope") setOpened(true);
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(max-width: 1023px)").matches
    ) {
      setMobileTab("inspector");
    }
  }

  async function handleReset() {
    if (!window.confirm("Reset semua kustomisasi dan gambar untuk undangan ini?")) {
      return;
    }

    const next = createDefaultConfig(invitation, preset);
    dispatch({ type: "replace", config: next });
    clearStoredConfig(invitation.slug);
    setSelectedId("hero");
    setOpened(false);

    try {
      await deleteImagesBySlug(invitation.slug);
    } catch {
      // ignore storage errors
    }

    imageUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
    imageUrlsRef.current = [];
    setImages({});
    showToast("Kustomisasi direset ke default.");
  }

  function handleExport() {
    const parsed = customizerConfigSchema.safeParse(config);

    if (!parsed.success) {
      const issue = parsed.error.issues[0];
      showToast(
        `Config belum valid: ${issue?.message ?? "periksa kembali data."}`,
        "error",
      );
      return;
    }

    const blob = new Blob([JSON.stringify(parsed.data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `customizer-${config.slug}.json`;
    link.click();
    URL.revokeObjectURL(url);
    showToast("JSON diekspor. Gambar tidak disertakan.");
  }

  function handleLock() {
    lock(invitation.slug);
    window.location.reload();
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#f4f1ea] text-[#1b1a17]">
      <CustomizerToolbar
        slug={config.slug}
        themeName={preset.name}
        opened={opened}
        saved={saved}
        onToggleOpened={() => setOpened((value) => !value)}
        onReset={() => void handleReset()}
        onExport={handleExport}
        onLock={handleLock}
      />

      <div className="flex border-b border-[#1b1a17]/10 bg-[#f4f1ea] lg:hidden">
        {(
          [
            ["sections", "Section"],
            ["preview", "Preview"],
            ["inspector", "Edit"],
          ] as const
        ).map(([value, label]) => (
          <button
            key={value}
            type="button"
            onClick={() => setMobileTab(value)}
            className={`flex-1 px-3 py-3 text-[10px] uppercase tracking-[0.2em] ${
              mobileTab === value
                ? "border-b-2 border-[#1b1a17] font-semibold"
                : "text-[#8a8375]"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="flex flex-1 flex-col lg:grid lg:grid-cols-[280px_minmax(0,1fr)_380px]">
        <aside
          className={`border-[#1b1a17]/10 bg-[#f4f1ea] lg:block lg:h-[calc(100vh-65px)] lg:border-r ${
            mobileTab === "sections" ? "block" : "hidden"
          }`}
        >
          <SectionList
            order={config.order}
            sections={config.sections}
            selectedId={selectedId}
            onSelect={handleSelect}
            onReorder={(order) => dispatch({ type: "reorder", order })}
            onToggleVisible={(id) => dispatch({ type: "toggleVisible", id })}
          />
        </aside>

        <main
          className={`min-w-0 bg-[#e9e4da] p-3 lg:block lg:p-4 ${
            mobileTab === "preview" ? "block" : "hidden"
          }`}
        >
          <div className="h-[72vh] overflow-y-auto rounded-2xl border border-[#1b1a17]/10 bg-white shadow-sm lg:h-[calc(100vh-97px)]">
            {ready ? (
              <Preview
                config={config}
                preset={preset}
                images={images}
                opened={opened}
                onOpen={() => setOpened(true)}
                selectedId={selectedId}
              />
            ) : (
              <div className="flex h-full items-center justify-center">
                <p className="text-xs text-[#8a8375]">Memuat preview...</p>
              </div>
            )}
          </div>
        </main>

        <aside
          className={`border-[#1b1a17]/10 bg-[#f4f1ea] lg:block lg:h-[calc(100vh-65px)] lg:border-l ${
            mobileTab === "inspector" ? "block" : "hidden"
          }`}
        >
          <div className="border-b border-[#1b1a17]/10 p-3 lg:hidden">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#8a8375]">
                Preview live
              </p>
              <button
                type="button"
                onClick={() => setMobileTab("preview")}
                className="text-[10px] uppercase tracking-[0.15em] text-[#5f5a50] underline underline-offset-2"
              >
                Perbesar
              </button>
            </div>
            <div className="h-44 overflow-y-auto rounded-xl border border-[#1b1a17]/10 bg-white">
              {ready ? (
                <Preview
                  config={config}
                  preset={preset}
                  images={images}
                  opened={opened}
                  onOpen={() => setOpened(true)}
                  selectedId={selectedId}
                />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <p className="text-xs text-[#8a8375]">Memuat preview...</p>
                </div>
              )}
            </div>
          </div>

          <SectionInspector
            config={config}
            selectedId={selectedId}
            slug={config.slug}
            images={images}
            onInvitationChange={(path, value) =>
              dispatch({ type: "updateInvitation", path, value })
            }
            onLabelChange={(id, field, value) =>
              dispatch({ type: "updateLabel", id, field, value })
            }
            onToggleVisible={(id) => dispatch({ type: "toggleVisible", id })}
            onChangeBackground={(id, background: BackgroundConfig) =>
              dispatch({ type: "setStyle", id, patch: { background } })
            }
            onChangeTextColor={(id, color) =>
              dispatch({ type: "setStyle", id, patch: { textColor: color } })
            }
            onChangeAlign={(id, element: string, align: Align) =>
              dispatch({ type: "setAlign", id, element, align })
            }
            onUploaded={registerImage}
            onRemoved={removeImage}
            onError={(message) => showToast(message, "error")}
          />
        </aside>
      </div>

      <Toast message={toast?.message ?? null} tone={toast?.tone} />
    </div>
  );
}
