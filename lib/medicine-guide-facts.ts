export type MedicineOverviewFactKey = 'use' | 'composition' | 'form' | 'strength' | 'manufacturer' | 'source';

type MedicineOverviewFactInput = {
  recognizedUse?: string;
  composition?: string;
  dosageForm?: string;
  strength?: string;
  manufacturer: string;
  source?: string;
};

export function buildMedicineOverviewFacts(input: MedicineOverviewFactInput) {
  const candidates: Array<{ key: MedicineOverviewFactKey; value?: string }> = [
    { key: 'use', value: input.recognizedUse },
    { key: 'composition', value: input.composition },
    { key: 'form', value: input.dosageForm },
    { key: 'strength', value: input.strength },
    { key: 'manufacturer', value: input.manufacturer },
    { key: 'source', value: input.source },
  ];

  return candidates
    .map((fact) => ({ ...fact, value: fact.value?.trim() || '' }))
    .filter((fact): fact is { key: MedicineOverviewFactKey; value: string } => Boolean(fact.value))
    .slice(0, 3);
}
