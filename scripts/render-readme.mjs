import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dataPath = join(root, "models.json");
const readmePath = join(root, "README.md");

const DASH = "—";
const COLUMNS = [
  "Roles",
  "Model",
  "OpenRouter",
  "In $/M",
  "Out $/M",
  "Cache $/M",
  "Reasoning",
  "Rationale",
];

function formatPrice(value) {
  return value == null ? DASH : String(value);
}

function escapeCell(value) {
  return String(value).replaceAll("|", "\\|").replaceAll("\n", " ");
}

function formatSlug(slug) {
  return slug ? escapeCell(slug) : DASH;
}

function formatRoles(roles) {
  return Array.isArray(roles) && roles.length > 0
    ? escapeCell(roles.join(", "))
    : DASH;
}

function row(model) {
  return [
    formatRoles(model.roles),
    escapeCell(model.name),
    formatSlug(model.openrouter_slug),
    formatPrice(model.input_per_m),
    formatPrice(model.output_per_m),
    formatPrice(model.cache_hit_per_m),
    escapeCell(model.reasoning),
    escapeCell(model.rationale),
  ];
}

function table(models) {
  const header = `| ${COLUMNS.join(" | ")} |`;
  const sep = `| ${COLUMNS.map(() => "---").join(" | ")} |`;
  const body =
    models.length > 0
      ? models.map((model) => `| ${row(model).join(" | ")} |`)
      : [`| ${COLUMNS.map(() => DASH).join(" | ")} |`];
  return [header, sep, ...body].join("\n");
}

const data = JSON.parse(readFileSync(dataPath, "utf8"));
const models = Array.isArray(data.models) ? data.models : [];
const active = models.filter((model) => model.status === "active");
const retired = models.filter((model) => model.status === "retired");

const parts = [
  "# kannav-benchmark",
  "",
  "Up-to-date opinions on which model to use for what task and why",
  "",
  `Updated: ${data.updated}`,
  "",
  "Source of truth: models.json. Edit that file, then run `node scripts/render-readme.mjs`.",
  "",
  table(active),
];

if (retired.length > 0) {
  parts.push("", "## Retired", "", table(retired));
}

parts.push("");
writeFileSync(readmePath, parts.join("\n"));
