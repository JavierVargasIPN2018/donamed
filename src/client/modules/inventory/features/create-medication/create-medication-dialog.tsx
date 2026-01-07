"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/client/components/ui/dialog";

import { useDonationGuard } from "@/client/hooks/use-donation-guard";

import { CreateMedicationForm } from "./create-medication.form";
import { useCreateMedicationModal } from "./use-create-medication.modal";

export function CreateMedicationModal({
  userId,
  isDonor,
}: {
  userId?: string | null;
  isDonor?: boolean;
}) {
  const { isOpen, onClose } = useCreateMedicationModal();

  const { isValid } = useDonationGuard({
    userId,
    isDonor,
    onValidated: () => {},
  });

  if (isOpen && !isValid) {
    return null;
  }

  if (userId == null) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-xl p-0 overflow-hidden">
        <DialogHeader className="p-4 bg-white border-b">
          <DialogTitle>Crear Donación</DialogTitle>
          <DialogDescription>
            Publica un medicamento para ayudar a alguien.
          </DialogDescription>
        </DialogHeader>

        <div className="px-4 pb-4">
          <CreateMedicationForm donorId={userId} onSuccess={onClose} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
