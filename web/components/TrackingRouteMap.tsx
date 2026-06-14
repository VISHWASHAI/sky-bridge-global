type Props = {
  origin: string;
  destination: string;
  currentLocation: string;
  progress: number; // 0-100
};

export default function TrackingRouteMap({ origin, destination, currentLocation, progress }: Props) {
  const pct = Math.min(96, Math.max(4, progress));

  return (
    <div className="route-map">
      <div className="route-map-track-wrap">
        <div className="route-map-track" />
        <div className="route-map-fill" style={{ width: `${pct}%` }} />

        <div className="route-map-node" />
        <div className="route-map-node is-end" />
        <div className="route-map-current" style={{ left: `${pct}%` }} />

        <div className="route-map-label">{origin}</div>
        <div className="route-map-label is-end">{destination}</div>
        <div className="route-map-label is-current" style={{ left: `${pct}%` }}>
          {currentLocation}
        </div>
      </div>
    </div>
  );
}
