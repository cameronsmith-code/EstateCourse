import { buildGuardianshipRoadmap } from './guardianshipRoadmapBuilder';
import { validateGuardianshipRoadmap } from './guardianshipRoadmapValidation';
import type { GuardianshipRoadmapModel } from './guardianshipRoadmapTypes';

type AnswersMap = Map<string, Record<string, unknown>>;

function makeAnswers(entries: Array<[string, Record<string, unknown>]>): AnswersMap {
  return new Map(entries);
}

function runFixture(name: string, answers: AnswersMap): GuardianshipRoadmapModel {
  const model = buildGuardianshipRoadmap(answers);
  const findings = validateGuardianshipRoadmap(model);
  const errors = findings.filter(f => f.level === 'error');
  const warnings = findings.filter(f => f.level === 'warning');

  console.log(`\n=== ${name} ===`);
  console.log(`  Children: ${model.children.length}`);
  console.log(`  Guardian assignments: ${model.guardianAssignments.length}`);
  console.log(`  Roles: ${model.roles.length}`);
  console.log(`  Documents: ${model.documents.length}`);
  console.log(`  Readiness — decisions: ${model.readiness.decisionsMade.length}, confirming: ${model.readiness.thingsWorthConfirming.length}, todo: ${model.readiness.thingsStillToDo.length}`);
  console.log(`  Immediate actions: ${model.immediateActions.length}`);
  console.log(`  Adult sibling roles: ${model.adultSiblingRoles.length}`);
  if (errors.length) console.log(`  ERRORS: ${errors.map(e => e.message).join('; ')}`);
  if (warnings.length) console.log(`  WARNINGS: ${warnings.map(w => w.message).join('; ')}`);

  return model;
}

function fixtureA_SimpleFamily(): AnswersMap {
  return makeAnswers([
    ['aboutYou', {
      fullName: 'Daniel Thompson', spouseName: 'Sarah Thompson',
      maritalStatus: 'married', province: 'ON',
    }],
    ['children', {
      childrenData: [
        { name: 'Jack', nickname: 'Jack', dateOfBirth: '2018-05-15', disabled: 'no', independent: 'no',
          guardianPersonId: 'pp_1', guardianConsidered: 'yes', guardianSpokenWith: 'yes_agreed', guardianInWill: 'yes',
          guardianAppliesTo: '1',
          transitionMoveExpected: 'no_remain_current', attendingSchool: 'yes', schoolName: 'Maple Grove PS',
          hasIEP: 'no', birthCertificateLocation: 'Safe deposit box',
        },
        { name: 'Sophie', nickname: 'Sophie', dateOfBirth: '2020-09-20', disabled: 'no', independent: 'no',
          guardianPersonId: 'pp_1', guardianConsidered: 'yes', guardianSameAsSibling: 'yes',
          guardianSpokenWith: 'yes_agreed', guardianInWill: 'yes',
          transitionMoveExpected: 'no_remain_current', attendingSchool: 'no',
        },
      ],
      planningPersons: [
        { id: 'pp_1', name: 'Michael Morrison', relationship: 'Uncle', phone: '416-555-0100', city: 'Toronto', province: 'ON', country: 'Canada' },
      ],
    }],
    ['wills', {
      currentWillData: { clients: [
        { clientId: 'client1', clientName: 'Daniel', documentBasics: { hasWill: 'yes', willLocation: 'Home office' } },
        { clientId: 'client2', clientName: 'Sarah', documentBasics: { hasWill: 'yes', willLocation: 'Home office' } },
      ]},
    }],
    ['estateTrustees', { client1EstateTrusteeName: 'David Morrison' }],
    ['lifeInsurance', { client1HasLifeInsurance: 'yes', client2HasLifeInsurance: 'yes' }],
    ['financialFootprint', { investmentsData: [{ accountType: 'RESP' }] }],
    ['familyTrusts', {}],
  ]);
}

function fixtureB_MoveRequired(): AnswersMap {
  return makeAnswers([
    ['aboutYou', {
      fullName: 'Daniel Thompson', spouseName: 'Sarah Thompson',
      maritalStatus: 'married', province: 'ON',
    }],
    ['children', {
      childrenData: [
        { name: 'Jack', nickname: 'Jack', dateOfBirth: '2018-05-15', disabled: 'no', independent: 'no',
          guardianPersonId: 'pp_1', guardianConsidered: 'yes', guardianSpokenWith: 'not_yet', guardianInWill: 'not_sure',
          guardianAppliesTo: '1',
          transitionMoveExpected: 'yes_most_likely',
          transitionSchoolChangeExpected: 'yes_most_likely',
          transitionEducationRecordLocation: 'School office',
          transitionProviderSelections: 'doctor_0',
          transitionSupportSelections: '',
          transitionActivitySelections: 'Soccer',
          transitionPeopleSelections: 'sibling_1',
          transitionFirstDaysCount: '2',
          transitionFirstDays_0: 'Keep the children together',
          transitionFirstDays_1: 'Bring his comfort blanket',
          attendingSchool: 'yes', schoolName: 'Maple Grove PS', hasIEP: 'no',
          activityList: JSON.stringify([{ activityName: 'Soccer', activityType: 'Sport', importanceLevel: 'Critical', frequency: 'weekly' }]),
          cityOfResidence: 'Mississauga', provinceTerritory: 'ON', countryOfResidence: 'Canada',
          birthCertificateLocation: 'Filing cabinet',
        },
        { name: 'Sophie', nickname: 'Sophie', dateOfBirth: '2020-09-20', disabled: 'no', independent: 'no',
          guardianPersonId: 'pp_1', guardianConsidered: 'yes', guardianSameAsSibling: 'yes',
          guardianSpokenWith: 'not_yet', guardianInWill: 'not_sure',
          transitionMoveExpected: 'yes_most_likely',
          attendingSchool: 'no',
        },
      ],
      planningPersons: [
        { id: 'pp_1', name: 'Michael Morrison', relationship: 'Uncle', phone: '905-555-0100', city: 'Oakville', province: 'ON', country: 'Canada' },
      ],
    }],
    ['wills', {
      currentWillData: { clients: [
        { clientId: 'client1', clientName: 'Daniel', documentBasics: { hasWill: 'yes', willLocation: 'Home office' } },
      ]},
    }],
    ['estateTrustees', { client1EstateTrusteeName: 'David Morrison' }],
    ['lifeInsurance', { client1HasLifeInsurance: 'yes' }],
    ['financialFootprint', {}],
    ['familyTrusts', {}],
  ]);
}

function fixtureC_Disability(): AnswersMap {
  return makeAnswers([
    ['aboutYou', {
      fullName: 'Lisa Chen', spouseName: 'James Chen',
      maritalStatus: 'married', province: 'BC',
    }],
    ['children', {
      childrenData: [
        { name: 'Ethan', nickname: 'Ethan', dateOfBirth: '2016-03-10', disabled: 'yes', independent: 'no',
          guardianPersonId: 'pp_1', guardianConsidered: 'yes', guardianSpokenWith: 'yes_agreed', guardianInWill: 'yes',
          supportNeedTypes: 'cognitive_developmental,learning',
          disabilityTaxCredit: 'yes', disabilityTaxCreditDocLocation: 'Filing cabinet',
          careCoordinators: 'doctor,school',
          careCoord_doctor_count: '1', careCoord_doctor_0_name: 'Dr. Rebecca Patel', careCoord_doctor_0_role: 'Family physician', careCoord_doctor_0_phone: '604-555-0100',
          careCoord_school_count: '1', careCoord_school_0_name: 'Ms. Garcia', careCoord_school_0_role: 'Resource teacher', careCoord_school_0_phone: '604-555-0200',
          medications: 'yes', medicationList: JSON.stringify([{ name: 'Methylphenidate', treats: 'ADHD', prescription: 'yes', prescribedBy: 'Dr. Patel' }]),
          allergies: 'no',
          transitionMoveExpected: 'possibly',
          transitionProviderSelections: 'doctor_0,school_0',
          transitionSupportSelections: 'cognitive_developmental,learning,existing_supports',
          transitionSupportNotes: 'Ethan needs structure and visual schedules',
          attendingSchool: 'yes', schoolName: 'Cedar Elementary', hasIEP: 'yes', individualEducationPlan: 'Accommodations for attention and sensory needs', iepDocumentLocation: 'School office',
          transitionEducationRecordLocation: 'School office',
          futureIndependenceLevel: 'mostly_independent',
          carePlanWritten: 'yes', carePlanStored: 'Filing cabinet',
          birthCertificateLocation: 'Safe',
        },
      ],
      planningPersons: [
        { id: 'pp_1', name: 'Mei Chen', relationship: 'Grandmother', phone: '604-555-0300', city: 'Vancouver', province: 'BC', country: 'Canada' },
      ],
    }],
    ['wills', {
      currentWillData: { clients: [
        { clientId: 'client1', clientName: 'Lisa', documentBasics: { hasWill: 'yes', willLocation: 'Lawyer' },
          inheritanceType: 'held_until_age',
          trustStages: [{ age: '25', fraction: '50%', description: 'Half at 25' }],
          trustTrusteeName: 'James Chen',
          childSpecificArrangements: [{ childId: 'child_0', childName: 'Ethan', hasDifferentArrangement: 'yes', specialArrangement: 'held_for_lifetime', knownTrustType: 'henson_trust', description: 'Henson Trust to protect ODSP eligibility' }],
        },
      ]},
    }],
    ['estateTrustees', { client1EstateTrusteeName: 'James Chen' }],
    ['lifeInsurance', { client1HasLifeInsurance: 'yes' }],
    ['financialFootprint', { investmentsData: [{ accountType: 'RDSP' }, { accountType: 'RESP' }] }],
    ['familyTrusts', {}],
  ]);
}

function fixtureD_MixedAge(): AnswersMap {
  return makeAnswers([
    ['aboutYou', {
      fullName: 'Robert Walsh', spouseName: 'Maria Walsh',
      maritalStatus: 'married', province: 'ON',
    }],
    ['children', {
      childrenData: [
        { name: 'Emma', nickname: 'Em', dateOfBirth: '2000-01-15', disabled: 'no', independent: 'yes' },
        { name: 'Jack', nickname: 'Jack', dateOfBirth: '2018-05-15', disabled: 'no', independent: 'no',
          guardianPersonId: 'pp_1', guardianConsidered: 'yes', guardianSpokenWith: 'yes_agreed', guardianInWill: 'yes',
          guardianAppliesTo: '2',
          transitionMoveExpected: 'possibly',
          transitionAdultSiblingRole_0: 'emotional_support',
          transitionAdultSiblingNotResponsible_0: 'primary_caregiver,managing_finances',
          attendingSchool: 'yes', schoolName: 'Maple Grove PS', hasIEP: 'no',
        },
        { name: 'Lily', nickname: 'Lily', dateOfBirth: '2019-06-20', disabled: 'yes', independent: 'no',
          guardianPersonId: 'pp_1', guardianConsidered: 'yes', guardianSameAsSibling: 'yes',
          guardianSpokenWith: 'yes_agreed', guardianInWill: 'yes',
          supportNeedTypes: 'physical',
          careCoord_doctor_count: '1', careCoord_doctor_0_name: 'Dr. Smith', careCoord_doctor_0_role: 'Pediatrician',
          transitionMoveExpected: 'possibly',
          transitionAdultSiblingRole_0: 'family_discussions',
          attendingSchool: 'yes', schoolName: 'Cedar Elementary', hasIEP: 'yes', iepDocumentLocation: 'School',
        },
      ],
      planningPersons: [
        { id: 'pp_1', name: 'Laura Walsh', relationship: 'Aunt', phone: '416-555-0100', city: 'Toronto', province: 'ON', country: 'Canada' },
      ],
    }],
    ['wills', {
      currentWillData: { clients: [
        { clientId: 'client1', clientName: 'Robert', documentBasics: { hasWill: 'yes', willLocation: 'Home' },
          inheritanceType: 'released_gradually',
          trustStages: [{ age: '25', fraction: '50%', description: '' }, { age: '30', fraction: '100%', description: '' }],
          trustTrusteeName: 'Laura Walsh',
        },
        { clientId: 'client2', clientName: 'Maria', documentBasics: { hasWill: 'yes', willLocation: 'Home' },
          inheritanceType: 'held_until_age', trustTrusteeName: 'Robert Walsh',
        },
      ]},
    }],
    ['estateTrustees', { client1EstateTrusteeName: 'Laura Walsh' }],
    ['lifeInsurance', { client1HasLifeInsurance: 'yes' }],
    ['financialFootprint', {}],
    ['familyTrusts', {}],
  ]);
}

function fixtureE_DifferentGuardians(): AnswersMap {
  return makeAnswers([
    ['aboutYou', {
      fullName: 'Daniel Thompson', spouseName: 'Sarah Thompson',
      maritalStatus: 'married', province: 'ON',
    }],
    ['children', {
      childrenData: [
        { name: 'Jack', nickname: 'Jack', dateOfBirth: '2018-05-15', disabled: 'no', independent: 'no',
          guardianPersonId: 'pp_1', guardianConsidered: 'yes', guardianSpokenWith: 'yes_agreed', guardianInWill: 'yes',
          transitionMoveExpected: 'no_remain_current', attendingSchool: 'yes', schoolName: 'Maple Grove PS',
        },
        { name: 'Sophie', nickname: 'Sophie', dateOfBirth: '2020-09-20', disabled: 'no', independent: 'no',
          guardianPersonId: 'pp_2', guardianConsidered: 'yes', guardianSpokenWith: 'not_yet', guardianInWill: 'not_sure',
          alternateGuardianPersonId: 'pp_3', alternateGuardianConsidered: 'yes',
          transitionMoveExpected: 'no_remain_current', attendingSchool: 'no',
        },
      ],
      planningPersons: [
        { id: 'pp_1', name: 'Michael Morrison', relationship: 'Uncle', city: 'Toronto', province: 'ON', country: 'Canada' },
        { id: 'pp_2', name: 'Jennifer Lee', relationship: 'Aunt', city: 'Ottawa', province: 'ON', country: 'Canada' },
        { id: 'pp_3', name: 'David Lee', relationship: 'Uncle', city: 'Ottawa', province: 'ON', country: 'Canada' },
      ],
    }],
    ['wills', {
      currentWillData: { clients: [
        { clientId: 'client1', clientName: 'Daniel', documentBasics: { hasWill: 'yes', willLocation: 'Home' } },
      ]},
    }],
    ['estateTrustees', { client1EstateTrusteeName: 'Michael Morrison' }],
    ['lifeInsurance', {}],
    ['financialFootprint', {}],
    ['familyTrusts', {}],
  ]);
}

function fixtureF_CrossProvince(): AnswersMap {
  return makeAnswers([
    ['aboutYou', {
      fullName: 'Daniel Thompson', spouseName: 'Sarah Thompson',
      maritalStatus: 'married', province: 'ON',
    }],
    ['children', {
      childrenData: [
        { name: 'Jack', nickname: 'Jack', dateOfBirth: '2018-05-15', disabled: 'no', independent: 'no',
          guardianPersonId: 'pp_1', guardianConsidered: 'yes', guardianSpokenWith: 'yes_agreed', guardianInWill: 'yes',
          guardianAppliesTo: '1',
          transitionMoveExpected: 'yes_most_likely',
          cityOfResidence: 'Toronto', provinceTerritory: 'ON', countryOfResidence: 'Canada',
          attendingSchool: 'yes', schoolName: 'Maple Grove PS',
        },
        { name: 'Sophie', nickname: 'Sophie', dateOfBirth: '2020-09-20', disabled: 'no', independent: 'no',
          guardianPersonId: 'pp_1', guardianConsidered: 'yes', guardianSameAsSibling: 'yes',
          guardianSpokenWith: 'yes_agreed', guardianInWill: 'yes',
          transitionMoveExpected: 'yes_most_likely',
          cityOfResidence: 'Toronto', provinceTerritory: 'ON', countryOfResidence: 'Canada',
        },
      ],
      planningPersons: [
        { id: 'pp_1', name: 'Michael Morrison', relationship: 'Uncle', phone: '604-555-0100', city: 'Vancouver', province: 'BC', country: 'Canada' },
      ],
    }],
    ['wills', {
      currentWillData: { clients: [
        { clientId: 'client1', clientName: 'Daniel', documentBasics: { hasWill: 'yes', willLocation: 'Home' } },
      ]},
    }],
    ['estateTrustees', { client1EstateTrusteeName: 'David Morrison' }],
    ['lifeInsurance', {}],
    ['financialFootprint', {}],
    ['familyTrusts', {}],
  ]);
}

export function runAllFixtures(): void {
  console.log('Running Guardianship Roadmap test fixtures...\n');

  const a = runFixture('A. Simple Family (two minors, same local guardian)', fixtureA_SimpleFamily());
  const b = runFixture('B. Move-Required Family (guardian 1hr away)', fixtureB_MoveRequired());
  const c = runFixture('C. Disability Family (IEP, specialists, therapy, medication)', fixtureC_Disability());
  const d = runFixture('D. Mixed-Age Family (adult independent + minor + disabled minor)', fixtureD_MixedAge());
  const e = runFixture('E. Different Guardians (two minors, different guardians)', fixtureE_DifferentGuardians());
  const f = runFixture('F. Cross-Province Guardian (ON → BC)', fixtureF_CrossProvince());

  console.log('\n=== Summary ===');
  console.log(`A: ${a.guardianAssignments.length} assignments, ${a.roles.length} roles`);
  console.log(`B: ${b.guardianAssignments.length} assignments, moveStatus=${b.guardianAssignments[0]?.moveStatus}`);
  console.log(`C: ${c.children[0].supportTransition?.length || 0} support transitions, ${c.children[0].healthcareTransition?.selectedProviders.length || 0} providers`);
  console.log(`D: ${d.adultSiblingRoles.length} adult sibling roles, ${d.children[0].inheritanceByClient.length} inheritance records for child 0`);
  console.log(`E: ${e.guardianAssignments.length} assignments (should be 2)`);
  console.log(`F: crossProvince=${f.guardianAssignments[0]?.isCrossProvince}, ageOfMajority=${f.family.ageOfMajority}`);

  console.log('\nAll fixtures completed.');
}
