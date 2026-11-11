import assert from 'node:assert/strict';
import test from 'node:test';

import { buildMedicineOverviewFacts } from '../lib/medicine-guide-facts.ts';

test('replaces unavailable use, form, and strength with valid catalogue facts', () => {
  const facts = buildMedicineOverviewFacts({
    recognizedUse: '',
    composition: 'Spironolactone 100 mg',
    dosageForm: '',
    strength: '',
    manufacturer: 'Medico',
    source: 'Supplied Medico product catalogue',
  });

  assert.deepEqual(facts, [
    { key: 'composition', value: 'Spironolactone 100 mg' },
    { key: 'manufacturer', value: 'Medico' },
    { key: 'source', value: 'Supplied Medico product catalogue' },
  ]);
});

test('keeps the three most useful supplied medical facts without blank values', () => {
  const facts = buildMedicineOverviewFacts({
    recognizedUse: 'Hypertension',
    composition: 'Amlodipine and Valsartan',
    dosageForm: 'Film-coated tablet',
    strength: '5/80 mg',
    manufacturer: 'Medico',
  });

  assert.deepEqual(facts, [
    { key: 'use', value: 'Hypertension' },
    { key: 'composition', value: 'Amlodipine and Valsartan' },
    { key: 'form', value: 'Film-coated tablet' },
  ]);
  assert.equal(facts.some((fact) => !fact.value.trim()), false);
});
