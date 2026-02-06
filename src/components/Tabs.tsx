import React from "react";
import { X, Settings2 } from "lucide-react";

export type IdeTab = {
  id: string;
  label: string;
  kind?: "activeFile" | "other";
};

export function Tabs({
  tabs,
  activeId,
  onSelect,
  onClose,
}: {
  tabs: IdeTab[];
  activeId: string;
  onSelect: (id: string) => void;
  onClose?: (id: string) => void;
}) {
  return (
    <div className="ideTabBar" role="tablist" aria-label="Editor tabs">
      {tabs.map((t) => {
        const isActive = t.id === activeId;
        return (
          <button
            key={t.id}
            type="button"
            className={`ideTab ${isActive ? "isActive" : "isInactive"}`}
            onClick={() => onSelect(t.id)}
            role="tab"
            aria-selected={isActive}
          >
            {/* Left icon area */}
            <span className="ideTabLeft">
              {isActive ? (
                <span className="ideTabDs" aria-hidden="true">
                  Ds
                </span>
              ) : (
                <Settings2 className="ideTabGear" aria-hidden="true" />
              )}
              <span className="ideTabLabel">{t.label}</span>
            </span>

            {/* Close button */}
            <span className="ideTabRight">
              <span
                className="ideTabCloseHit"
                role="button"
                aria-label={`Close ${t.label}`}
                tabIndex={0}
                onClick={(e) => {
                  e.stopPropagation();
                  onClose?.(t.id);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    e.stopPropagation();
                    onClose?.(t.id);
                  }
                }}
              >
                <X className="ideTabCloseIcon" aria-hidden="true" />
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
