import { Plus, X, ShieldCheck, Heart } from 'lucide-react';

export type PlanningPerson = {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  email: string;
  city: string;
  province: string;
  country: string;
  sourceId?: string;
};

type Contact = {
  id: string;
  name: string;
  phone: string;
  email: string;
  city: string;
  province: string;
  source: string;
};

type Props = {
  childIndex: number;
  childData: Record<string, string>;
  childrenData: Array<Record<string, string>>;
  planningPersons: PlanningPerson[];
  prefilledContacts: Contact[];
  classification: 'minor' | 'independent_adult' | 'adult_dependant';
  isDisabled: boolean;
  minorIndices: number[];
  onChildChange: (index: number, field: string, value: string) => void;
  onChildMultiChange: (index: number, fields: Record<string, string>) => void;
  onPlanningPersonsChange: (persons: PlanningPerson[]) => void;
};

const SOURCE_LABELS: Record<string, string> = {
  parent1: 'Parent / Guardian 1',
  parent2: 'Parent / Guardian 2',
  sibling: 'Sibling',
  family: 'Other Family',
  school: 'School Team',
  doctor: 'Doctor / Therapist / Support Worker',
  other: 'Other',
  otherparent: "Child's Other Parent",
  prevrel1: 'Former Partner (Client 1)',
  prevrel2: 'Former Partner (Client 2)',
  et1: 'Estate Trustee (Client 1)',
  et2: 'Estate Trustee (Client 2)',
  poapc1: 'POA — Personal Care (Client 1)',
  poapc2: 'POA — Personal Care (Client 2)',
  poaprop1: 'POA — Property (Client 1)',
  poaprop2: 'POA — Property (Client 2)',
  fa1: 'Financial Advisor (Client 1)',
  fa2: 'Financial Advisor (Client 2)',
  trustben: 'Trust Beneficiary',
  adultchild: 'Adult Child',
};

const PROVINCES = ['AB', 'BC', 'MB', 'NB', 'NL', 'NS', 'NT', 'NU', 'ON', 'PE', 'QC', 'SK', 'YT'];

const SPOKEN_OPTIONS = [
  { value: 'yes_agreed', label: 'Yes, and they agreed' },
  { value: 'yes_not_confirmed', label: 'Yes, but we haven\'t formally confirmed' },
  { value: 'not_yet', label: 'Not yet' },
  { value: 'not_sure', label: 'We\'re not sure' },
];

const WILL_OPTIONS = [
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
  { value: 'not_sure', label: 'We\'re not sure' },
  { value: 'no_will', label: 'We do not currently have a Will' },
];

const CONSIDERED_OPTIONS = [
  { value: 'yes', label: 'Yes' },
  { value: 'some_ideas', label: 'We have some ideas, but haven\'t decided' },
  { value: 'no', label: 'No' },
  { value: 'not_sure', label: 'We\'re not sure' },
];

function personName(planningPersons: PlanningPerson[], personId?: string): string {
  if (!personId) return '';
  const p = planningPersons.find(p => p.id === personId);
  return p?.name || '';
}

export default function ChildPlanningSection({
  childIndex,
  childData,
  childrenData,
  planningPersons,
  prefilledContacts,
  classification,
  isDisabled,
  minorIndices,
  onChildChange,
  onChildMultiChange,
  onPlanningPersonsChange,
}: Props) {
  if (classification === 'independent_adult') return null;

  const childName = childData.nickname || childData.name || `Child ${childIndex + 1}`;

  const createPlanningPerson = (data?: Partial<PlanningPerson>): string => {
    const id = `pp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const newPerson: PlanningPerson = {
      id,
      name: data?.name || '',
      relationship: data?.relationship || '',
      phone: data?.phone || '',
      email: data?.email || '',
      city: data?.city || '',
      province: data?.province || '',
      country: data?.country || '',
      sourceId: data?.sourceId,
    };
    onPlanningPersonsChange([...planningPersons, newPerson]);
    return id;
  };

  const createFromContact = (contact: Contact): string => {
    const existing = planningPersons.find(p => p.sourceId === contact.id);
    if (existing) return existing.id;
    return createPlanningPerson({
      name: contact.name,
      phone: contact.phone,
      email: contact.email,
      city: contact.city,
      province: contact.province,
      sourceId: contact.id,
    });
  };

  const updatePlanningPerson = (personId: string, field: string, value: string) => {
    onPlanningPersonsChange(planningPersons.map(p => (p.id === personId ? { ...p, [field]: value } : p)));
  };

  const getPerson = (personId?: string): PlanningPerson | undefined => {
    if (!personId) return undefined;
    return planningPersons.find(p => p.id === personId);
  };

  // Find other minor children who already have a guardian
  const otherMinorsWithGuardians = minorIndices
    .filter(i => i !== childIndex)
    .filter(i => childrenData[i]?.guardianPersonId && getPerson(childrenData[i]?.guardianPersonId))
    .map(i => ({
      index: i,
      name: childrenData[i]?.nickname || childrenData[i]?.name || `Child ${i + 1}`,
      guardianId: childrenData[i]?.guardianPersonId as string,
      guardianName: personName(planningPersons, childrenData[i]?.guardianPersonId),
    }));

  // Deduplicate by guardianId
  const uniqueGuardians = otherMinorsWithGuardians.filter(
    (g, i, arr) => arr.findIndex(x => x.guardianId === g.guardianId) === i
  );

  const renderPersonForm = (personId: string, labelPrefix: string) => {
    const person = getPerson(personId);
    if (!person) return null;
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
        <input type="text" value={person.name} onChange={e => updatePlanningPerson(personId, 'name', e.target.value)} placeholder="Full name" className="px-3 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm" />
        <input type="text" value={person.relationship} onChange={e => updatePlanningPerson(personId, 'relationship', e.target.value)} placeholder={`Relationship to ${childName}`} className="px-3 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm" />
        <input type="tel" value={person.phone} onChange={e => updatePlanningPerson(personId, 'phone', e.target.value)} placeholder="Phone" className="px-3 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm" />
        <input type="email" value={person.email} onChange={e => updatePlanningPerson(personId, 'email', e.target.value)} placeholder="Email" className="px-3 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm" />
        <input type="text" value={person.city} onChange={e => updatePlanningPerson(personId, 'city', e.target.value)} placeholder="City" className="px-3 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm" />
        <select value={person.province} onChange={e => updatePlanningPerson(personId, 'province', e.target.value)} className="px-3 py-2 bg-gray-600 border border-gray-500 text-white rounded-lg focus:ring-2 focus:ring-blue-500 text-sm">
          <option value="">Province / State</option>
          {PROVINCES.map(p => <option key={p} value={p}>{p}</option>)}
          <option value="other">Other</option>
        </select>
        <input type="text" value={person.country} onChange={e => updatePlanningPerson(personId, 'country', e.target.value)} placeholder="Country" className="px-3 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm md:col-span-2" />
      </div>
    );
  };

  const renderPersonSelector = (
    selectedPersonId: string | undefined,
    fieldName: string,
    placeholderLabel: string
  ) => {
    const person = getPerson(selectedPersonId);
    const hasSelection = !!person;

    const handleSelect = (value: string) => {
      if (value === '') {
        onChildChange(childIndex, fieldName, '');
      } else if (value === 'new') {
        const id = createPlanningPerson();
        onChildChange(childIndex, fieldName, id);
      } else if (value.startsWith('contact_')) {
        const contactId = value.replace('contact_', '');
        const contact = prefilledContacts.find(c => c.id === contactId);
        if (contact) {
          const id = createFromContact(contact);
          onChildChange(childIndex, fieldName, id);
        }
      } else if (value.startsWith('existing_')) {
        const existingId = value.replace('existing_', '');
        onChildChange(childIndex, fieldName, existingId);
      }
    };

    return (
      <div>
        <select
          value={hasSelection ? `existing_${selectedPersonId}` : ''}
          onChange={e => handleSelect(e.target.value)}
          className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
        >
          <option value="">{placeholderLabel}</option>
          {planningPersons.length > 0 && (
            <optgroup label="People already added in this step">
              {planningPersons.map(p => (
                <option key={p.id} value={`existing_${p.id}`}>{p.name || 'Unnamed person'}{p.relationship ? ` (${p.relationship})` : ''}</option>
              ))}
            </optgroup>
          )}
          {prefilledContacts.length > 0 && (
            <optgroup label="People from elsewhere in your questionnaire">
              {prefilledContacts.map(c => (
                <option key={c.id} value={`contact_${c.id}`}>{c.name || SOURCE_LABELS[c.source] || c.id} ({SOURCE_LABELS[c.source] || 'Contact'})</option>
              ))}
            </optgroup>
          )}
          <option value="new">+ Someone new</option>
        </select>
        {hasSelection && renderPersonForm(selectedPersonId!, fieldName)}
      </div>
    );
  };

  const renderGuardianPlanning = () => {
    const considered = childData.guardianConsidered;
    const showQuestions = considered === 'yes' || considered === 'some_ideas';
    const guardianId = childData.guardianPersonId;
    const guardianName = personName(planningPersons, guardianId) || 'this guardian';
    const guardian2Id = childData.guardianPersonId2;
    const guardian2Name = personName(planningPersons, guardian2Id) || 'this person';
    const hasJointGuardian = !!(guardianId && guardian2Id && guardian2Id !== guardianId);
    const jointLabel = hasJointGuardian ? `${guardianName} and ${guardian2Name}` : guardianName;
    const showSameGuardianQ = showQuestions && uniqueGuardians.length > 0;
    const sameGuardianAnswer = childData.guardianSameAsSibling;
    const showPersonSelector = showQuestions && (!showSameGuardianQ || sameGuardianAnswer === 'no' || sameGuardianAnswer === 'not_sure');

    const alternateConsidered = childData.alternateGuardianConsidered;
    const showAlternate = alternateConsidered === 'yes' || alternateConsidered === 'some_ideas';
    const alternateId = childData.alternateGuardianPersonId;
    const alternateName = personName(planningPersons, alternateId) || 'this person';

    // Multi-select: other minor children for this guardian
    const otherMinorChildren = minorIndices.filter(i => i !== childIndex);
    const appliesTo = (childData.guardianAppliesTo || '').split(',').filter(Boolean);

    const toggleAppliesTo = (siblingIndex: number) => {
      const isChecked = appliesTo.includes(String(siblingIndex));
      if (isChecked) {
        const next = appliesTo.filter(v => v !== String(siblingIndex));
        onChildChange(childIndex, 'guardianAppliesTo', next.join(','));
        onChildMultiChange(siblingIndex, {
          guardianPersonId: '',
          guardianPersonId2: '',
          guardianConsidered: '',
          guardianSameAsSibling: '',
          guardianSpokenWith: '',
          guardianInWill: '',
        });
      } else {
        const next = [...appliesTo, String(siblingIndex)];
        onChildChange(childIndex, 'guardianAppliesTo', next.join(','));
        onChildMultiChange(siblingIndex, {
          guardianPersonId: guardianId || '',
          guardianPersonId2: guardian2Id || '',
          guardianConsidered: 'yes',
          guardianSameAsSibling: 'yes',
        });
      }
    };

    return (
      <>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Have you considered who you would ideally want to act as {childName}'s guardian if you were no longer able to care for {childName}?
          </label>
          <div className="flex flex-col gap-2">
            {CONSIDERED_OPTIONS.map(({ value, label }) => (
              <label key={value} className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name={`guardianConsidered-${childIndex}`} value={value} checked={considered === value} onChange={e => {
                  const val = e.target.value;
                  if (val !== 'yes' && val !== 'some_ideas') {
                    onChildMultiChange(childIndex, {
                      guardianConsidered: val,
                      guardianSameAsSibling: '',
                      guardianPersonId: '',
                      guardianPersonId2: '',
                      guardianSpokenWith: '',
                      guardianInWill: '',
                      guardianNotes: '',
                      guardianAppliesTo: '',
                      alternateGuardianConsidered: '',
                      alternateGuardianPersonId: '',
                      alternateGuardianSpokenWith: '',
                      alternateGuardianInWill: '',
                      alternateGuardianNotes: '',
                    });
                  } else {
                    onChildChange(childIndex, 'guardianConsidered', val);
                  }
                }} className="mr-1" />
                <span className="text-gray-300 text-sm">{label}</span>
              </label>
            ))}
          </div>
        </div>

        {showSameGuardianQ && (
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Would you ideally want the same guardian for {childName} as you identified for {uniqueGuardians.map(g => g.name).join(', ')}?
            </label>
            <div className="flex gap-4">
              {[
                { value: 'yes', label: 'Yes' },
                { value: 'no', label: 'No' },
                { value: 'not_sure', label: "We're not sure" },
              ].map(({ value, label }) => (
                <label key={value} className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name={`guardianSameAsSibling-${childIndex}`} value={value} checked={sameGuardianAnswer === value} onChange={e => {
                    const val = e.target.value;
                    if (val === 'yes') {
                      const targetGuardian = uniqueGuardians[0];
                      if (uniqueGuardians.length > 1) {
                        // Multiple guardians exist — let user pick below
                        onChildMultiChange(childIndex, {
                          guardianSameAsSibling: val,
                          guardianPersonId: '',
                          guardianPersonId2: '',
                        });
                      } else {
                        onChildMultiChange(childIndex, {
                          guardianSameAsSibling: val,
                          guardianPersonId: targetGuardian.guardianId,
                          guardianPersonId2: '',
                        });
                      }
                    } else {
                      onChildMultiChange(childIndex, {
                        guardianSameAsSibling: val,
                        guardianPersonId: '',
                        guardianPersonId2: '',
                      });
                    }
                  }} className="mr-1" />
                  <span className="text-gray-300 text-sm">{label}</span>
                </label>
              ))}
            </div>
            {sameGuardianAnswer === 'yes' && uniqueGuardians.length > 1 && (
              <div className="mt-3">
                <label className="block text-sm font-medium text-gray-300 mb-2">Which guardian would you like to use?</label>
                <select
                  value={guardianId || ''}
                  onChange={e => onChildChange(childIndex, 'guardianPersonId', e.target.value)}
                  className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                >
                  <option value="">Select a guardian...</option>
                  {uniqueGuardians.map(g => (
                    <option key={g.guardianId} value={g.guardianId}>{g.guardianName || 'Unnamed'} (guardian for {g.name})</option>
                  ))}
                </select>
              </div>
            )}
          </div>
        )}

        {showPersonSelector && (
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Who would you ideally want to act as {childName}'s guardian?
            </label>
            {renderPersonSelector(guardianId, 'guardianPersonId', 'Select a person...')}
          </div>
        )}

        {showPersonSelector && guardianId && getPerson(guardianId) && (
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Is there a second person who would act together with {guardianName} as {childName}'s guardian? (Optional)
            </label>
            {renderPersonSelector(guardian2Id, 'guardianPersonId2', 'Select a second person...')}
          </div>
        )}

        {guardianId && getPerson(guardianId) && (
          <>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Have you spoken with {jointLabel} about taking on this responsibility?
              </label>
              <div className="flex flex-col gap-2">
                {SPOKEN_OPTIONS.map(({ value, label }) => (
                  <label key={value} className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name={`guardianSpokenWith-${childIndex}`} value={value} checked={childData.guardianSpokenWith === value} onChange={e => onChildChange(childIndex, 'guardianSpokenWith', e.target.value)} className="mr-1" />
                    <span className="text-gray-300 text-sm">{label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                To your knowledge, is {jointLabel} currently named as guardian for {childName} in your Will?
              </label>
              <div className="flex flex-col gap-2">
                {WILL_OPTIONS.map(({ value, label }) => (
                  <label key={value} className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name={`guardianInWill-${childIndex}`} value={value} checked={childData.guardianInWill === value} onChange={e => onChildChange(childIndex, 'guardianInWill', e.target.value)} className="mr-1" />
                    <span className="text-gray-300 text-sm">{label}</span>
                  </label>
                ))}
              </div>
            </div>

            {otherMinorChildren.length > 0 && (
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Would you ideally want {jointLabel} to act as guardian for any of your other minor children as well?
                </label>
                <div className="flex flex-col gap-2">
                  {otherMinorChildren.map(i => {
                    const sibName = childrenData[i]?.nickname || childrenData[i]?.name || `Child ${i + 1}`;
                    const isChecked = appliesTo.includes(String(i));
                    return (
                      <label key={i} className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" checked={isChecked} onChange={() => toggleAppliesTo(i)} className="w-4 h-4 rounded border-gray-500 bg-gray-600 text-blue-500 focus:ring-blue-500" />
                        <span className="text-gray-300 text-sm">{sibName}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">Notes</label>
              <textarea value={childData.guardianNotes || ''} onChange={e => onChildChange(childIndex, 'guardianNotes', e.target.value)} placeholder="Any additional notes about this guardian arrangement..." rows={3} className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm" />
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Have you considered an alternate guardian for {childName} in case {jointLabel} is unable to take on the role?
              </label>
              <div className="flex flex-col gap-2">
                {CONSIDERED_OPTIONS.map(({ value, label }) => (
                  <label key={value} className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name={`alternateGuardianConsidered-${childIndex}`} value={value} checked={alternateConsidered === value} onChange={e => {
                      const val = e.target.value;
                      if (val !== 'yes' && val !== 'some_ideas') {
                        onChildMultiChange(childIndex, {
                          alternateGuardianConsidered: val,
                          alternateGuardianPersonId: '',
                          alternateGuardianSpokenWith: '',
                          alternateGuardianInWill: '',
                          alternateGuardianNotes: '',
                        });
                      } else {
                        onChildChange(childIndex, 'alternateGuardianConsidered', val);
                      }
                    }} className="mr-1" />
                    <span className="text-gray-300 text-sm">{label}</span>
                  </label>
                ))}
              </div>
            </div>

            {showAlternate && (
              <>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Who would you ideally want to act as {childName}'s alternate guardian?
                  </label>
                  {renderPersonSelector(alternateId, 'alternateGuardianPersonId', 'Select a person...')}
                </div>

                {alternateId && getPerson(alternateId) && (
                  <>
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Have you spoken with {alternateName} about taking on this responsibility?
                      </label>
                      <div className="flex flex-col gap-2">
                        {SPOKEN_OPTIONS.map(({ value, label }) => (
                          <label key={value} className="flex items-center gap-2 cursor-pointer">
                            <input type="radio" name={`alternateGuardianSpokenWith-${childIndex}`} value={value} checked={childData.alternateGuardianSpokenWith === value} onChange={e => onChildChange(childIndex, 'alternateGuardianSpokenWith', e.target.value)} className="mr-1" />
                            <span className="text-gray-300 text-sm">{label}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        To your knowledge, is {alternateName} currently named as alternate guardian for {childName} in your Will?
                      </label>
                      <div className="flex flex-col gap-2">
                        {WILL_OPTIONS.map(({ value, label }) => (
                          <label key={value} className="flex items-center gap-2 cursor-pointer">
                            <input type="radio" name={`alternateGuardianInWill-${childIndex}`} value={value} checked={childData.alternateGuardianInWill === value} onChange={e => onChildChange(childIndex, 'alternateGuardianInWill', e.target.value)} className="mr-1" />
                            <span className="text-gray-300 text-sm">{label}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-300 mb-2">Notes</label>
                      <textarea value={childData.alternateGuardianNotes || ''} onChange={e => onChildChange(childIndex, 'alternateGuardianNotes', e.target.value)} placeholder="Any additional notes about this alternate guardian arrangement..." rows={3} className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm" />
                    </div>
                  </>
                )}
              </>
            )}
          </>
        )}
      </>
    );
  };

  const renderFutureSupportPlanning = () => {
    const considered = childData.supportLeadConsidered;
    const showQuestions = considered === 'yes' || considered === 'some_ideas';
    const leadId = childData.supportLeadPersonId;
    const leadName = personName(planningPersons, leadId) || 'this person';
    const showSupportNetwork = !isDisabled;

    // Support network multi-select (using existing futureCareTeamSelection field)
    const networkSelected = (childData.futureCareTeamSelection || '').split(',').filter(Boolean);
    const toggleNetwork = (id: string) => {
      const next = networkSelected.includes(id) ? networkSelected.filter(v => v !== id) : [...networkSelected, id];
      onChildChange(childIndex, 'futureCareTeamSelection', next.join(','));
    };

    return (
      <>
        {showSupportNetwork && (
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">
              If you were no longer able to provide care, who would you hope steps in first? (Select all that apply)
            </label>
            <div className="flex flex-col gap-2">
              {prefilledContacts.map(c => {
                const isSelected = networkSelected.includes(c.id);
                return (
                  <label key={c.id} className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={isSelected} onChange={() => toggleNetwork(c.id)} className="w-4 h-4 rounded border-gray-500 bg-gray-600 text-blue-500 focus:ring-blue-500" />
                    <span className="text-gray-300 text-sm">{c.name || SOURCE_LABELS[c.source] || c.id}</span>
                    {c.name && <span className="text-xs text-gray-500">({SOURCE_LABELS[c.source]})</span>}
                  </label>
                );
              })}
            </div>
          </div>
        )}

        <div className={showSupportNetwork ? 'mt-4' : ''}>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            If you were no longer able to provide the support you currently provide to {childName}, have you considered who you would ideally want to take the lead in helping support them?
          </label>
          <div className="flex flex-col gap-2">
            {CONSIDERED_OPTIONS.map(({ value, label }) => (
              <label key={value} className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name={`supportLeadConsidered-${childIndex}`} value={value} checked={considered === value} onChange={e => {
                  const val = e.target.value;
                  if (val !== 'yes' && val !== 'some_ideas') {
                    onChildMultiChange(childIndex, {
                      supportLeadConsidered: val,
                      supportLeadPersonId: '',
                      supportLeadSpokenWith: '',
                      supportLeadNotes: '',
                    });
                  } else {
                    onChildChange(childIndex, 'supportLeadConsidered', val);
                  }
                }} className="mr-1" />
                <span className="text-gray-300 text-sm">{label}</span>
              </label>
            ))}
          </div>
        </div>

        {showQuestions && (
          <>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Who would you ideally want to take the lead in supporting {childName}?
              </label>
              {renderPersonSelector(leadId, 'supportLeadPersonId', 'Select a person...')}
            </div>

            {leadId && getPerson(leadId) && (
              <>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Have you spoken with {leadName} about taking on this responsibility?
                  </label>
                  <div className="flex flex-col gap-2">
                    {SPOKEN_OPTIONS.map(({ value, label }) => (
                      <label key={value} className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name={`supportLeadSpokenWith-${childIndex}`} value={value} checked={childData.supportLeadSpokenWith === value} onChange={e => onChildChange(childIndex, 'supportLeadSpokenWith', e.target.value)} className="mr-1" />
                        <span className="text-gray-300 text-sm">{label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Notes</label>
                  <textarea value={childData.supportLeadNotes || ''} onChange={e => onChildChange(childIndex, 'supportLeadNotes', e.target.value)} placeholder="Any additional notes about this support arrangement..." rows={3} className="w-full px-4 py-2 bg-gray-600 border border-gray-500 text-white placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm" />
                </div>
              </>
            )}
          </>
        )}
      </>
    );
  };

  const subHeading = classification === 'minor' ? 'Guardian Planning' : 'Future Support Planning';
  const SubIcon = classification === 'minor' ? ShieldCheck : Heart;

  return (
    <>
      <div className="mt-8 pt-6 border-t-2 border-blue-500/30">
        <h4 className="text-lg font-semibold text-white">
          Planning for {childName} if you're unable to provide care
        </h4>
      </div>

      <div className="mt-2 pb-2 border-b border-gray-500 mb-2">
        <h5 className="text-base font-semibold text-blue-400 flex items-center gap-2">
          <SubIcon size={18} />
          {subHeading}
        </h5>
      </div>

      {classification === 'minor' && renderGuardianPlanning()}
      {classification === 'adult_dependant' && renderFutureSupportPlanning()}
    </>
  );
}
