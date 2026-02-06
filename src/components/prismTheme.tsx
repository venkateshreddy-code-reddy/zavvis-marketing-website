export const zavvisPrismTheme = {
  plain: {
    color: "rgba(255,255,255,0.86)",
    backgroundColor: "transparent",
    fontFamily:
      '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono","Courier New", monospace',
    fontSize: "12px",
    fontWeight: 400,
    lineHeight: 1.55,
  },
  styles: [
    { types: ["comment"], style: { color: "rgba(255,255,255,0.38)" } }, // gray
    { types: ["keyword"], style: { color: "rgba(196, 135, 255, 0.95)" } }, // purple
    { types: ["function"], style: { color: "rgba(120, 210, 255, 0.95)" } }, // cyan/blue
    { types: ["string"], style: { color: "rgba(88, 235, 214, 0.92)" } }, // teal
    {
      types: ["variable", "parameter", "constant"],
      style: { color: "rgba(255, 224, 120, 0.92)" }, // yellow
    },

    /* helpful extras so it looks “real IDE” */
    { types: ["punctuation"], style: { color: "rgba(255,255,255,0.72)" } },
    { types: ["operator"], style: { color: "rgba(255,255,255,0.78)" } },
    { types: ["number", "boolean"], style: { color: "rgba(255, 197, 126, 0.92)" } },
    { types: ["class-name", "tag"], style: { color: "rgba(160, 200, 255, 0.90)" } },
    { types: ["property", "attr-name"], style: { color: "rgba(180, 245, 255, 0.85)" } },
  ],
} as const;
