import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

interface UseDonationGuardOptions {
  userId?: string | null;
  isDonor?: boolean;
  hasCompletedProfile?: boolean;
  onValidated?: () => void;
}

/**
 * Hook to validate user authentication and donor status before allowing donations.
 * Redirects users through the proper flow: login -> profile completion -> donation.
 *
 * @reasoning This hook encapsulates the complex validation logic in one place,
 * making it reusable across the app and keeping components clean.
 */
export function useDonationGuard({
  userId,
  isDonor,
  onValidated,
}: UseDonationGuardOptions) {
  const router = useRouter();

  useEffect(() => {
    // Not authenticated -> redirect to sign-in
    if (!userId) {
      toast.error("Por favor inicia sesión para poder donar medicamentos");
      router.push("/sign-in?callbackUrl=/donate");
      return;
    }

    // Not a donor -> redirect to donor registration
    if (!isDonor) {
      toast.info("Completa tu perfil de donante para comenzar a donar");
      // router.push("/settings/profile");
      return;
    }

    // All validations passed
    onValidated?.();
  }, [userId, isDonor, router, onValidated]);

  return {
    isValid: userId && isDonor,
  };
}
