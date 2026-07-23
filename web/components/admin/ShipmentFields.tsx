import { STATUS_CLASSES, type ShipmentRow } from "@/lib/shipments";

/**
 * The editable fields shared by the "new shipment" and "edit shipment" forms.
 * Uncontrolled inputs with defaultValue — the enclosing <form> posts to a
 * server action.
 */
export default function ShipmentFields({ shipment }: { shipment?: ShipmentRow }) {
  const s = shipment;
  return (
    <>
      <div className="grid grid-2 gap-md">
        <div className="form-group">
          <label className="form-label">Tracking Number</label>
          <input
            name="tracking_no"
            className="form-control"
            defaultValue={s?.tracking_no ?? ""}
            placeholder={s ? "" : "Leave blank to auto-generate (e.g. SBG-482910-IN)"}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Carrier</label>
          <input name="carrier" className="form-control" defaultValue={s?.carrier ?? ""} placeholder="e.g. Sky Bridge Air" />
        </div>
      </div>

      <div className="grid grid-2 gap-md">
        <div className="form-group">
          <label className="form-label">Origin</label>
          <input name="origin" className="form-control" defaultValue={s?.origin ?? ""} placeholder="e.g. Bangalore, IN" />
        </div>
        <div className="form-group">
          <label className="form-label">Destination</label>
          <input name="destination" className="form-control" defaultValue={s?.destination ?? ""} placeholder="e.g. Dubai, AE" />
        </div>
      </div>

      <div className="grid grid-2 gap-md">
        <div className="form-group">
          <label className="form-label">Status label</label>
          <input name="status" className="form-control" defaultValue={s?.status ?? ""} placeholder="e.g. In Transit" />
        </div>
        <div className="form-group">
          <label className="form-label">Status colour</label>
          <select name="status_class" className="form-control" defaultValue={s?.status_class ?? "primary"}>
            {STATUS_CLASSES.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-2 gap-md">
        <div className="form-group">
          <label className="form-label">Current location</label>
          <input name="current_location" className="form-control" defaultValue={s?.current_location ?? ""} placeholder="e.g. Mumbai Sorting Hub" />
        </div>
        <div className="form-group">
          <label className="form-label">Estimated delivery</label>
          <input name="est_delivery" className="form-control" defaultValue={s?.est_delivery ?? ""} placeholder="e.g. 5 Aug 2026" />
        </div>
      </div>

      <div className="grid grid-2 gap-md">
        <div className="form-group">
          <label className="form-label">Weight</label>
          <input name="weight" className="form-control" defaultValue={s?.weight ?? ""} placeholder="e.g. 12.5 kg" />
        </div>
        <div className="form-group">
          <label className="form-label">Dimensions</label>
          <input name="dimensions" className="form-control" defaultValue={s?.dimensions ?? ""} placeholder="e.g. 40 × 30 × 25 cm" />
        </div>
      </div>
    </>
  );
}
