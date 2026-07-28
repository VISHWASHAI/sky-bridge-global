import { JOB_TYPES, type JobRow } from "@/lib/jobs";

/** Editable fields shared by the "new job" and "edit job" forms. */
export default function JobFields({ job }: { job?: JobRow }) {
  const j = job;
  return (
    <>
      <div className="grid grid-2 gap-md">
        <div className="form-group">
          <label className="form-label">Job title *</label>
          <input name="title" className="form-control" defaultValue={j?.title ?? ""} placeholder="Logistics Operations Executive" required />
        </div>
        <div className="form-group">
          <label className="form-label">Employment type</label>
          <input name="type" className="form-control" list="job-types" defaultValue={j?.type ?? "Full-time"} placeholder="Full-time" />
          <datalist id="job-types">
            {JOB_TYPES.map((t) => <option key={t} value={t} />)}
          </datalist>
        </div>
      </div>

      <div className="grid grid-2 gap-md">
        <div className="form-group">
          <label className="form-label">Department</label>
          <input name="dept" className="form-control" defaultValue={j?.dept ?? ""} placeholder="Operations & Strategy" />
        </div>
        <div className="form-group">
          <label className="form-label">Location</label>
          <input name="location" className="form-control" defaultValue={j?.location ?? ""} placeholder="Kolar, Karnataka" />
        </div>
      </div>

      <div className="grid grid-2 gap-md">
        <div className="form-group">
          <label className="form-label">Salary</label>
          <input name="salary" className="form-control" defaultValue={j?.salary ?? ""} placeholder="₹3–5 LPA" />
        </div>
        <div className="form-group">
          <label className="form-label">Sort order (lower shows first)</label>
          <input name="sort_order" className="form-control" defaultValue={String(j?.sort_order ?? 0)} inputMode="numeric" placeholder="0" />
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Description</label>
        <textarea name="description" className="form-textarea" defaultValue={j?.description ?? ""} placeholder="What the role involves…" />
      </div>

      <div className="form-group">
        <label className="form-label">Requirements — one per line</label>
        <textarea name="requirements" className="form-textarea" rows={5} defaultValue={(j?.requirements ?? []).join("\n")} placeholder={"Bachelor's degree in Logistics or related field\n1–3 years of freight operations experience\nGood communication in English, Kannada, Hindi"} />
      </div>

      <label style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "var(--space-sm)", fontSize: "var(--font-size-sm)", color: "var(--color-text-muted)" }}>
        <input type="checkbox" name="active" defaultChecked={j ? j.active : true} />
        Show this job on the public careers page
      </label>
    </>
  );
}
