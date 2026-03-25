"use client";

export function ServerWakeLoader() {
  return (
    <div className="wake-loader" aria-label="Waking up server" role="status">
      <div className="wake-loader__panel">
        <span className="wake-loader__eyebrow">Boot sequence</span>

        <div className="wake-loader__visual" aria-hidden="true">
          <div className="wake-loader__aurora wake-loader__aurora--one" />
          <div className="wake-loader__aurora wake-loader__aurora--two" />
          <div className="wake-loader__pulse-ring wake-loader__pulse-ring--outer" />
          <div className="wake-loader__pulse-ring wake-loader__pulse-ring--inner" />
          <div className="wake-loader__hub">
            <span className="wake-loader__hub-core" />
          </div>
          <div className="wake-loader__beams">
            <span className="wake-loader__beam wake-loader__beam--one" />
            <span className="wake-loader__beam wake-loader__beam--two" />
            <span className="wake-loader__beam wake-loader__beam--three" />
            <span className="wake-loader__beam wake-loader__beam--four" />
          </div>
        </div>

        <div className="wake-loader__copy">
          <h1 className="wake-loader__title">Waking up server</h1>
          <p className="wake-loader__text">
            Getting Smart Notes ready so your workspace opens smoothly.
          </p>
        </div>

        <div className="wake-loader__meter" aria-hidden="true">
          <span className="wake-loader__meter-track">
            <span className="wake-loader__meter-fill" />
          </span>
        </div>
      </div>
    </div>
  );
}
