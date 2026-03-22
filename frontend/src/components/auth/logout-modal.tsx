import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";

interface LogoutModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function LogoutModal({ open, onClose, onConfirm }: LogoutModalProps) {
  return (
    <Modal
      className="ui-modal--auth"
      description="Confirm before ending your current session."
      onClose={onClose}
      open={open}
      title="Logout"
    >
      <div className="logout-modal">
        <p className="danger-callout">
          You are about to log out of Smart Notes. Unsaved note form changes will be lost.
        </p>

        <div className="modal-actions">
          <Button onClick={onClose} type="button" variant="ghost">
            Stay signed in
          </Button>
          <Button onClick={onConfirm} type="button" variant="danger">
            Logout
          </Button>
        </div>
      </div>
    </Modal>
  );
}
