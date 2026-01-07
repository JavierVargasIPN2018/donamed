/* eslint-disable no-restricted-imports */

import { queryOptions } from "@tanstack/react-query";
import {
    getMyRequestsAction,
    getRequestsForMedicationAction,
    countPendingRequestsAction,
} from "@/server/modules/matchmaking/features/requests/actions/medication-request.actions";

export const medicationRequestQueries = {
    all: () => ["medication-requests"] as const,

    myRequests: () =>
        queryOptions({
            queryKey: [...medicationRequestQueries.all(), "my-requests"] as const,
            queryFn: async () => {
                const result = await getMyRequestsAction();
                if (!result.success) throw new Error(result.error);
                return result;
            },
        }),

    forMedication: (medicationId: number) =>
        queryOptions({
            queryKey: [...medicationRequestQueries.all(), "medication", medicationId] as const,
            queryFn: async () => {
                const result = await getRequestsForMedicationAction(medicationId);
                if (!result.success) throw new Error(result.error);
                return result.data || [];
            },
        }),

    pendingCount: (medicationId: number) =>
        queryOptions({
            queryKey: [...medicationRequestQueries.all(), "pending-count", medicationId] as const,
            queryFn: async () => {
                return await countPendingRequestsAction(medicationId);
            },
        }),
};
