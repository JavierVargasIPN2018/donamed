import { and, eq, gte, like, sql } from "drizzle-orm";

import { db } from "@/server/db";
import { medication } from "@server/modules/inventory/infrastructure/db/medication.schema";

import type { SearchMedicationsDto } from "../dtos/medication.dto";

// ==================== CASO DE USO: BUSCAR MEDICAMENTOS (RF13) ====================

export async function searchMedications(filters: SearchMedicationsDto) {
    try {
        const conditions = [];

        // Filtro por sustancia activa
        if (filters.activeSubstance) {
            conditions.push(
                like(
                    medication.activeSubstance,
                    `%${filters.activeSubstance}%`
                )
            );
        }

        // Filtro por gramaje/dosage
        if (filters.dosage) {
            conditions.push(
                like(medication.dosage, `%${filters.dosage}%`)
            );
        }

        // Filtro por código postal (para búsqueda por distancia)
        if (filters.postalCode) {
            conditions.push(
                eq(medication.postalCode, filters.postalCode)
            );
        }

        // Filtro por estado
        if (filters.status) {
            conditions.push(eq(medication.status, filters.status));
        } else {
            // Por defecto, solo mostrar disponibles
            conditions.push(eq(medication.status, "disponible"));
        }

        // Filtro por visibilidad (RF10)
        if (filters.onlyVisible !== false) {
            conditions.push(eq(medication.isVisible, true));
        }

        const medications = await db
            .select()
            .from(medication)
            .where(and(...conditions))
            .orderBy(medication.createdAt);

        return {
            success: true,
            medications,
            total: medications.length,
        };
    } catch (error) {
        console.error("Error searching medications:", error);
        return {
            success: false,
            medications: [],
            total: 0,
            error: "Error al buscar medicamentos",
        };
    }
}

// ==================== CASO DE USO: LISTAR MEDICAMENTOS DISPONIBLES ====================

export async function listAvailableMedications() {
    try {
        const medications = await db
            .select()
            .from(medication)
            .where(
                and(
                    eq(medication.status, "disponible"),
                    eq(medication.isVisible, true)
                )
            )
            .orderBy(medication.createdAt);

        return {
            success: true,
            medications,
            total: medications.length,
        };
    } catch (error) {
        console.error("Error listing medications:", error);
        return {
            success: false,
            medications: [],
            total: 0,
            error: "Error al listar medicamentos",
        };
    }
}

// ==================== CASO DE USO: BUSCAR POR SUSTANCIA Y GRAMAJE ====================

export async function searchBySubstanceAndDosage(
    activeSubstance: string,
    dosage?: string
) {
    try {
        const conditions = [
            like(medication.activeSubstance, `%${activeSubstance}%`),
            eq(medication.status, "disponible"),
            eq(medication.isVisible, true),
        ];

        if (dosage) {
            conditions.push(like(medication.dosage, `%${dosage}%`));
        }

        const medications = await db
            .select()
            .from(medication)
            .where(and(...conditions))
            .orderBy(medication.createdAt);

        return {
            success: true,
            medications,
            total: medications.length,
        };
    } catch (error) {
        console.error("Error searching by substance and dosage:", error);
        return {
            success: false,
            medications: [],
            total: 0,
            error: "Error al buscar medicamentos",
        };
    }
}
