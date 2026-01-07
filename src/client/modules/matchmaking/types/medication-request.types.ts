/**
 * Frontend type definitions for medication requests
 * These types align with the database schema but use undefined instead of null
 * for optional fields to match TypeScript conventions
 */

export interface MedicationRequest {
    id: string;
    medicationId: number;
    requesterId: string;
    requesterName: string;
    requesterPhone: string;
    requesterImage?: string;
    medicalSituation: string;
    urgencyLevel: "low" | "medium" | "high" | "critical";
    socioeconomicScore?: number;
    trustScore?: "Alta" | "Media" | "Baja";
    status: "pending" | "accepted" | "rejected" | "cancelled" | "expired";
    requestedAt: Date;
    respondedAt?: Date;
    expiresAt?: Date;
    prescriptionUrl?: string;
    createdAt: Date;
    updatedAt: Date;
}
