export type ShipmentRow = {
  id: string;
  tracking_no: string;
  status: string | null;
  status_class: string | null;
  origin: string | null;
  destination: string | null;
  weight: string | null;
  dimensions: string | null;
  carrier: string | null;
  current_location: string | null;
  est_delivery: string | null;
  created_at: string;
};

export type ShipmentEventRow = {
  id: string;
  shipment_id: string;
  title: string | null;
  event_time: string | null;
  location: string | null;
  description: string | null;
  status: string | null;
};

/** Options for the status colour (drives the badge on the public tracking page). */
export const STATUS_CLASSES = [
  { value: "primary", label: "In transit (blue)" },
  { value: "success", label: "Delivered (green)" },
  { value: "warning", label: "Attention / delay (orange)" },
  { value: "danger", label: "Exception (red)" },
];

/** Options for a timeline event's state. "active" marks the current step. */
export const EVENT_STATUSES = [
  { value: "completed", label: "Completed (past step)" },
  { value: "active", label: "Current step" },
];

export function badgeClassFor(statusClass: string | null): string {
  switch (statusClass) {
    case "success": return "badge-success";
    case "warning": return "badge-warning";
    case "danger": return "badge-danger";
    default: return "badge-primary";
  }
}

/** Generates a tracking number like SBG-482910-IN. */
export function generateTrackingNo(): string {
  const n = Math.floor(100000 + Math.random() * 900000);
  return `SBG-${n}-IN`;
}
