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
    /**
     * Optional profile image URL - not stored in DB, may be enriched from user profile
     */
    requesterImage?: string;
    medicalSituation: string;
    urgencyLevel: "low" | "medium" | "high" | "critical";
    socioeconomicScore?: number;
    /**
     * Trust score - not stored in DB, may be computed from user's history
     */
    trustScore?: "Alta" | "Media" | "Baja";
    status: "pending" | "accepted" | "rejected" | "cancelled" | "expired";
    requestedAt: Date;
    respondedAt?: Date;
    expiresAt?: Date;
    /**
     * Prescription document URL - not stored in DB, may be added in future
     */
    prescriptionUrl?: string;
    createdAt: Date;
    updatedAt: Date;
}
