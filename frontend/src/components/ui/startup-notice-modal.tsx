"use client";

import { Button } from "@/components/ui/button";

interface StartupNoticeModalProps {
  onAcknowledge: () => void;
}

export function StartupNoticeModal({ onAcknowledge }: StartupNoticeModalProps) {
  return (
    <div className="startup-notice" aria-modal="true" role="dialog">
      <div className="startup-notice__panel">
        <span className="startup-notice__badge">Smart Notes</span>

        <div className="startup-notice__copy">
          <h1 className="startup-notice__title">A quick heads-up before we begin</h1>
          <p className="startup-notice__text">
            First launch can take a moment. After you continue, Smart Notes will wake
            everything up and prepare your workspace for you.
          </p>
        </div>

        <div className="startup-notice__actions">
          <Button onClick={onAcknowledge} type="button">
            I understand
          </Button>
        </div>
      </div>
    </div>
  );
}
