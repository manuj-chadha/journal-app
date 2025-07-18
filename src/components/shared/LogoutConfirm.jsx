import { useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

export default function LogoutConfirm({ onConfirm, onClose }) {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
    if (onClose) onClose();
  };

  return (
    <AlertDialog open={open} onOpenChange={(state) => {
      setOpen(state);
      if (!state && onClose) onClose();  // Notify parent when closed
    }}>
      <AlertDialogContent className="rounded-xl shadow-xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-pink-700 text-lg">
            Leaving already? 😢
          </AlertDialogTitle>
          <AlertDialogDescription className="text-pink-500">
            You sure you wanna log out? We’ll be right here when you’re back!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleClose} className="hover:bg-pink-100">
            Nah, Stay In
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              onConfirm();
              handleClose();
            }}
            className="bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:from-pink-600 hover:to-rose-600"
          >
            Yep, Log me out
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
