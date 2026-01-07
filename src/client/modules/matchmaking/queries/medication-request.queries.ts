/* eslint-disable no-restricted-imports */

import { queryOptions } from "@tanstack/react-query";
import {
    getMyRequestsAction,
    getRequestsForMedicationAction,
    countPendingRequestsAction,
} from "@/server/modules/matchmaking/features/requests/actions/medication-request.actions";
import type { MedicationRequest as DBMedicationRequest } from "@/server/modules/matchmaking/infrastructure/db/medication-request.schema";
import type { MedicationRequest } from "@/client/modules/matchmaking/types/medication-request.types";

/**
 * Convert database types (with null) to frontend types (with undefined)
 * Also adds fields that may be enriched from other sources (user profile, computed scores)
 */
function convertToFrontendType(request: DBMedicationRequest): MedicationRequest {
    return {
        ...request,
        socioeconomicScore: request.socioeconomicScore ?? undefined,
        respondedAt: request.respondedAt ?? undefined,
        expiresAt: request.expiresAt ?? undefined,
        // Fields not in DB schema - may be enriched from user profile or computed
        requesterImage: undefined,
        trustScore: undefined,
        prescriptionUrl: undefined,
    };
}

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
                const requests = result.data || [];
                return requests.map(convertToFrontendType);
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
