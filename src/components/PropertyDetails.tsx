import React, { useState, useEffect } from 'react';
import { Plus, Trash2, AlertTriangle } from 'lucide-react';

export type OtherOwner = {
  name: string;
  phone: string;
  city: string;
  hasMore: 'yes' | 'no' | '';
};

export type CapitalImprovement = {
  description: string;
  cost: string;
  year: string;
  recordsLocation: string;
  hasMore?: string;
};

export type PropertyData = {
  type: string;
  name: string;
  country: string;
  province: string;
  state: string;
  city: string;
  locationOfDeeds: string;
  owners: string[];
  otherOwners: OtherOwner[];
  ownershipPercentages: Record<string, string>;
  purchaseYear: string;
  purchasedBy: string;
  purchasedByOtherOwners: OtherOwner[];
  purchasedByOwners: string[];
  purchasedByOwnershipPercentages: Record<string, string>;
  purchasePrice: string;
  documentsLocation: string;
  hasRenovations: string;
  capitalImprovements: CapitalImprovement[];
  inhabitedAnnually: string;
  usedForIncome: string;
  claimedCCA: string;
  recordsLocation: string;
  claimedPREOtherProperty: string;
  preDesignatedYears: string[];
  titleHolding: string;
  hasAdditionalOwners: string;
  purchasedByHasAdditionalOwners: string;
  coOwnershipAgreement: string;
  coOwnershipAgreementLocation: string;
  ownershipChangeYear: string;
  ownershipChangeDocLocation: string;
  farmActiveEngagement: string;
  leaseDocumentsLocation: string;
  hasPropertyManager: string;
  propertyManagerName: string;
  propertyManagerPhone: string;
  propertyManagerEmail: string;
  propertyManagerCompany: string;
  hasLandlordInsurance: string;
  landlordInsuranceLocation: string;
  wasAlwaysRental: string;
  inhabitedYears: string[];
};

type Props = {
  index: number;
  propertyType: string;
  data: Partial<PropertyData>;
  client1Name: string;
  client2Name: string;
  hasSpouse: boolean;
  corporations: Array<{ legalName: string }>;
  trusts: string[];
  partnerships: string[];
  predefinedPeople: Array<{ name: string; phone?: string; city?: string }>;
  onChange: (field: keyof PropertyData, value: unknown) => void;
  onMultiChange: (updates: Partial<PropertyData>) => void;
};

const inputClass =
  'w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all';
const labelClass = 'block text-sm font-medium text-gray-300 mb-2';

const CANADA_PROVINCES = [
  'Alberta', 'British Columbia', 'Manitoba', 'New Brunswick', 'Newfoundland and Labrador',
  'Nova Scotia', 'Ontario', 'Prince Edward Island', 'Quebec', 'Saskatchewan',
  'Northwest Territories', 'Nunavut', 'Yukon',
];

const US_STATES = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut',
  'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa',
  'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan',
  'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
  'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio',
  'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
  'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia',
  'Wisconsin', 'Wyoming',
];

function PersonNameSelect({
  idPrefix,
  people,
  selectedName,
  onSelect,
}: {
  idPrefix: string;
  people: Array<{ name: string; phone?: string; city?: string }>;
  selectedName: string;
  onSelect: (name: string, phone: string, city: string) => void;
}) {
  const OTHER_VALUE = '__other__';
  const currentPerson = people.find(p => p.name.toLowerCase() === (selectedName || '').trim().toLowerCase());
  const selectValue = currentPerson ? currentPerson.name : selectedName ? OTHER_VALUE : '';

  return (
    <div className="space-y-2">
      <select
        value={selectValue}
        onChange={(e) => {
          if (e.target.value === OTHER_VALUE) {
            onSelect('', '', '');
          } else {
            const person = people.find(p => p.name === e.target.value);
            onSelect(person?.name || '', person?.phone || '', person?.city || '');
          }
        }}
        className={inputClass}
      >
        <option value="">Select a person or add a new one</option>
        {people.map((p, i) => (
          <option key={`${idPrefix}-${i}`} value={p.name}>{p.name}</option>
        ))}
        <option value={OTHER_VALUE}>Other (new person)</option>
      </select>
      {selectValue === OTHER_VALUE && (
        <input
          type="text"
          value={selectedName}
          onChange={(e) => onSelect(e.target.value, '', '')}
          placeholder="Enter name"
          className={inputClass}
        />
      )}
    </div>
  );
}

export default function PropertyDetails({
  index,
  propertyType,
  data,
  client1Name,
  client2Name,
  hasSpouse,
  corporations,
  trusts,
  partnerships,
  predefinedPeople,
  onChange,
  onMultiChange,
}: Props) {
  const country = data.country || '';
  const owners = data.owners || [];
  const otherOwners = data.otherOwners || [];
  const ownershipPercentages = data.ownershipPercentages || {};

  const [showOwnershipPct, setShowOwnershipPct] = useState(false);

  const capitalImprovements = data.capitalImprovements || [];

  const handleCapitalImprovementChange = (i: number, field: keyof CapitalImprovement, value: string) => {
    const updated = [...capitalImprovements];
    if (!updated[i]) updated[i] = { description: '', cost: '', year: '', recordsLocation: '' };
    updated[i] = { ...updated[i], [field]: value };
    onChange('capitalImprovements', updated);
  };

  const isCanada = country.toLowerCase() === 'canada';
  const isUS = country.toLowerCase() === 'united states' || country.toLowerCase() === 'usa' || country.toLowerCase() === 'us';

  const validOwnerOptions: string[] = Array.from(new Set([
    client1Name,
    ...(hasSpouse ? [client2Name] : []),
    ...corporations.map(c => c.legalName).filter(Boolean),
    ...trusts.filter(Boolean),
    ...partnerships.filter(Boolean),
    ...otherOwners.map(o => o.name).filter(n => n?.trim()),
  ]));
  const allOwnerNames: string[] = validOwnerOptions.filter(n => owners.includes(n));

  useEffect(() => {
    const stale = owners.filter(o => o?.trim() && !validOwnerOptions.includes(o));
    if (stale.length > 0) {
      const cleanedOwners = owners.filter(o => validOwnerOptions.includes(o));
      const cleanedPct = { ...ownershipPercentages };
      stale.forEach(name => delete cleanedPct[name]);
      onMultiChange({ owners: cleanedOwners, ownershipPercentages: cleanedPct });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [validOwnerOptions.join('|')]);

  const hasOtherOwners = otherOwners.some(o => o.name?.trim());

  useEffect(() => {
    if (allOwnerNames.length === 1 && !hasOtherOwners) {
      const name = allOwnerNames[0];
      const updates: Partial<PropertyData> = {};
      if (ownershipPercentages[name] !== '100') {
        updates.ownershipPercentages = { [name]: '100' };
      }
      if (!data.purchasedBy) {
        updates.purchasedBy = 'clients';
      }
      if (Object.keys(updates).length > 0) onMultiChange(updates);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allOwnerNames.join('|'), hasOtherOwners]);

  const totalPct = allOwnerNames.reduce((sum, name) => {
    const pct = parseFloat(ownershipPercentages[name] || '0');
    return sum + (isNaN(pct) ? 0 : pct);
  }, 0);

  const handleOwnerToggle = (name: string, checked: boolean) => {
    let updated: string[];
    if (checked) {
      updated = [...owners, name];
    } else {
      updated = owners.filter(o => o !== name);
      const newPct = { ...ownershipPercentages };
      delete newPct[name];
      onMultiChange({ ownershipPercentages: newPct });
    }
    onChange('owners', updated);
  };

  const handleOtherOwnerChange = (i: number, field: keyof OtherOwner, value: string) => {
    const updated = [...otherOwners];
    if (!updated[i]) updated[i] = { name: '', phone: '', city: '', hasMore: '' };
    updated[i] = { ...updated[i], [field]: value };
    onChange('otherOwners', updated);
  };

  const handleAddOtherOwner = () => {
    const updated = [...otherOwners, { name: '', phone: '', city: '', hasMore: '' }];
    onChange('otherOwners', updated);
  };

  const handleRemoveOtherOwner = (i: number) => {
    const removed = otherOwners[i];
    const updated = otherOwners.filter((_, idx) => idx !== i);
    if (removed?.name) {
      const newPct = { ...ownershipPercentages };
      delete newPct[removed.name];
      onMultiChange({ otherOwners: updated, ownershipPercentages: newPct });
    } else {
      onChange('otherOwners', updated);
    }
  };

  const handlePctChange = (name: string, value: string) => {
    const newPct = { ...ownershipPercentages, [name]: value };
    onChange('ownershipPercentages', newPct);
  };

  const purchasedByOwners = data.purchasedByOwners || [];
  const purchasedByOtherOwners = data.purchasedByOtherOwners || [];
  const purchasedByOwnershipPercentages = data.purchasedByOwnershipPercentages || {};

  const [showPurchasedByPct, setShowPurchasedByPct] = useState(false);

  const validPurchasedByOptions: string[] = Array.from(new Set([
    client1Name,
    ...(hasSpouse ? [client2Name] : []),
    ...corporations.map(c => c.legalName).filter(Boolean),
    ...trusts.filter(Boolean),
    ...partnerships.filter(Boolean),
    ...purchasedByOtherOwners.map(o => o.name).filter(n => n?.trim()),
  ]));
  const purchasedByAllOwnerNames: string[] = validPurchasedByOptions.filter(n => purchasedByOwners.includes(n));

  useEffect(() => {
    const stale = purchasedByOwners.filter(o => o?.trim() && !validPurchasedByOptions.includes(o));
    if (stale.length > 0) {
      const cleanedOwners = purchasedByOwners.filter(o => validPurchasedByOptions.includes(o));
      const cleanedPct = { ...purchasedByOwnershipPercentages };
      stale.forEach(name => delete cleanedPct[name]);
      onMultiChange({ purchasedByOwners: cleanedOwners, purchasedByOwnershipPercentages: cleanedPct });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [validPurchasedByOptions.join('|')]);

  const purchasedByTotalPct = purchasedByAllOwnerNames.reduce((sum, name) => {
    const pct = parseFloat(purchasedByOwnershipPercentages[name] || '0');
    return sum + (isNaN(pct) ? 0 : pct);
  }, 0);

  const handlePurchasedByOwnerToggle = (name: string, checked: boolean) => {
    let updated: string[];
    if (checked) {
      updated = [...purchasedByOwners, name];
    } else {
      updated = purchasedByOwners.filter(o => o !== name);
      const newPct = { ...purchasedByOwnershipPercentages };
      delete newPct[name];
      onMultiChange({ purchasedByOwnershipPercentages: newPct });
    }
    onChange('purchasedByOwners', updated);
  };

  const handlePurchasedByOtherOwnerChange = (i: number, field: keyof OtherOwner, value: string) => {
    const updated = [...purchasedByOtherOwners];
    if (!updated[i]) updated[i] = { name: '', phone: '', city: '', hasMore: '' };
    updated[i] = { ...updated[i], [field]: value };
    onChange('purchasedByOtherOwners', updated);
  };

  const handleAddPurchasedByOtherOwner = () => {
    const updated = [...purchasedByOtherOwners, { name: '', phone: '', city: '', hasMore: '' }];
    onChange('purchasedByOtherOwners', updated);
  };

  const handleRemovePurchasedByOtherOwner = (i: number) => {
    const removed = purchasedByOtherOwners[i];
    const updated = purchasedByOtherOwners.filter((_, idx) => idx !== i);
    if (removed?.name) {
      const newPct = { ...purchasedByOwnershipPercentages };
      delete newPct[removed.name];
      onMultiChange({ purchasedByOtherOwners: updated, purchasedByOwnershipPercentages: newPct });
    } else {
      onChange('purchasedByOtherOwners', updated);
    }
  };

  const handlePurchasedByPctChange = (name: string, value: string) => {
    const newPct = { ...purchasedByOwnershipPercentages, [name]: value };
    onChange('purchasedByOwnershipPercentages', newPct);
  };

  const currentYear = new Date().getFullYear();

  const currentOwnerNames = [...allOwnerNames, ...otherOwners.map(o => o.name).filter(n => n?.trim())].sort();
  const purchaserNames = data.purchasedBy === 'clients'
    ? allOwnerNames.slice().sort()
    : [...purchasedByAllOwnerNames, ...purchasedByOtherOwners.map(o => o.name).filter(n => n?.trim())].sort();
  const ownersDifferFromPurchasers =
    data.purchasedBy !== undefined && data.purchasedBy !== '' &&
    JSON.stringify(currentOwnerNames) !== JSON.stringify(purchaserNames);
  const yearOptions: number[] = [];
  for (let y = currentYear; y >= 1900; y--) yearOptions.push(y);

  const isRental = propertyType.toLowerCase().includes('rental');
  const propertyName = data.name || `${propertyType} ${index + 1}`;
  const c1Pct = ownershipPercentages[client1Name] || '';
  const c2Pct = ownershipPercentages[client2Name] || '';

  const handlePurchasedByChange = (value: string) => {
    if (value !== 'other') {
      onMultiChange({
        purchasedBy: value,
        purchasedByOwners: [],
        purchasedByOtherOwners: [],
        purchasedByOwnershipPercentages: {},
      });
    } else {
      onChange('purchasedBy', value);
    }
  };

  return (
    <div className="border border-gray-600 rounded-xl p-6 bg-gray-800 space-y-5 mt-2">
      <div className="flex items-center gap-3 pb-3 border-b border-gray-600">
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white text-sm font-bold shrink-0">
          {index + 1}
        </div>
        <h3 className="text-lg font-semibold text-white">
          {data.name || `${propertyType} ${index + 1}`}
        </h3>
        {!isCanada && country && (
          <span className="flex items-center gap-1 ml-auto text-xs font-medium text-yellow-400 bg-yellow-400/10 px-2 py-1 rounded-full">
            <AlertTriangle size={12} />
            Outside Canada
          </span>
        )}
      </div>

      {/* Property Name */}
      <div>
        <label className={labelClass}>Property Name</label>
        <input
          type="text"
          value={data.name || ''}
          onChange={(e) => onChange('name', e.target.value)}
          placeholder="Enter a name for this property"
          className={inputClass}
        />
      </div>

      {/* Country */}
      <div>
        <label className={labelClass}>Country</label>
        <input
          type="text"
          value={country}
          onChange={(e) => onChange('country', e.target.value)}
          placeholder="Enter country"
          className={inputClass}
        />
      </div>

      {/* Province (Canada) */}
      {isCanada && (
        <div>
          <label className={labelClass}>Province</label>
          <select
            value={data.province || ''}
            onChange={(e) => onChange('province', e.target.value)}
            className={inputClass}
          >
            <option value="">Select province</option>
            {CANADA_PROVINCES.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>
      )}

      {/* State (US) */}
      {isUS && (
        <div>
          <label className={labelClass}>State</label>
          <select
            value={data.state || ''}
            onChange={(e) => onChange('state', e.target.value)}
            className={inputClass}
          >
            <option value="">Select state</option>
            {US_STATES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      )}

      {/* City */}
      {country && (
        <div>
          <label className={labelClass}>City</label>
          <input
            type="text"
            value={data.city || ''}
            onChange={(e) => onChange('city', e.target.value)}
            placeholder="Enter city"
            className={inputClass}
          />
        </div>
      )}

      {/* Location of Deeds */}
      {country && (
        <div>
          <label className={labelClass}>Location of Deeds</label>
          <input
            type="text"
            value={data.locationOfDeeds || ''}
            onChange={(e) => onChange('locationOfDeeds', e.target.value)}
            placeholder="Enter location of deeds"
            className={inputClass}
          />
        </div>
      )}

      {/* Farm active engagement — Farm properties only */}
      {propertyType === 'Farm' && country && (
        <div>
          <label className={labelClass}>
            Has {client1Name}{hasSpouse ? `, ${client2Name}` : ''} or any children been actively engaged in the farm on a regular basis for at least two years?
          </label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                name={`farmActiveEngagement-${index}`}
                value="yes"
                checked={data.farmActiveEngagement === 'yes'}
                onChange={() => onChange('farmActiveEngagement', 'yes')}
                className="mr-2"
              />
              <span className="text-gray-300">Yes</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name={`farmActiveEngagement-${index}`}
                value="no"
                checked={data.farmActiveEngagement === 'no'}
                onChange={() => onChange('farmActiveEngagement', 'no')}
                className="mr-2"
              />
              <span className="text-gray-300">No</span>
            </label>
          </div>
        </div>
      )}

      {/* Ownership */}
      {country && (
        <div className="pt-2 border-t border-gray-700">
          <label className="block text-sm font-semibold text-gray-200 mb-3">Current Ownership</label>
          <div className="space-y-2">
            {/* Client 1 */}
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={owners.includes(client1Name)}
                onChange={(e) => handleOwnerToggle(client1Name, e.target.checked)}
                className="mr-2"
              />
              <span className="text-white">{client1Name}</span>
            </label>

            {/* Client 2 */}
            {hasSpouse && (
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={owners.includes(client2Name)}
                  onChange={(e) => handleOwnerToggle(client2Name, e.target.checked)}
                  className="mr-2"
                />
                <span className="text-white">{client2Name}</span>
              </label>
            )}

            {/* Corporations */}
            {corporations.map((corp, ci) => {
              if (!corp.legalName) return null;
              return (
                <label key={`corp-${ci}`} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={owners.includes(corp.legalName)}
                    onChange={(e) => handleOwnerToggle(corp.legalName, e.target.checked)}
                    className="mr-2"
                  />
                  <span className="text-white">{corp.legalName}</span>
                </label>
              );
            })}

            {/* Family Trusts */}
            {trusts.map((trustName, ti) => {
              if (!trustName) return null;
              return (
                <label key={`trust-${ti}`} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={owners.includes(trustName)}
                    onChange={(e) => handleOwnerToggle(trustName, e.target.checked)}
                    className="mr-2"
                  />
                  <span className="text-white">{trustName}</span>
                </label>
              );
            })}

            {/* Partnerships */}
            {partnerships.map((pName, pi) => {
              if (!pName) return null;
              return (
                <label key={`partner-${pi}`} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={owners.includes(pName)}
                    onChange={(e) => handleOwnerToggle(pName, e.target.checked)}
                    className="mr-2"
                  />
                  <span className="text-white">{pName}</span>
                </label>
              );
            })}

            {/* Other owners added so far */}
            {otherOwners.map((oo, oi) => (
              oo.name?.trim() ? (
                <label key={`oo-${oi}`} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={owners.includes(oo.name)}
                    onChange={(e) => handleOwnerToggle(oo.name, e.target.checked)}
                    className="mr-2"
                  />
                  <span className="text-white">{oo.name}</span>
                </label>
              ) : null
            ))}
          </div>

          {/* Other owner collection */}
          <div className="mt-4 ml-6 space-y-4">
            {otherOwners.map((oo, oi) => (
              <div key={oi} className="border border-gray-600 rounded-lg p-4 bg-gray-700 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-300">Additional owner {oi + 1}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveOtherOwner(oi)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <div>
                  <label className={labelClass}>Name</label>
                  <PersonNameSelect
                    idPrefix={`other-owner-${index}-${oi}`}
                    people={predefinedPeople}
                    selectedName={oo.name}
                    onSelect={(name, phone, city) => {
                      const updated = [...otherOwners];
                      const oldName = updated[oi].name;
                      updated[oi] = { ...updated[oi], name, phone, city };
                      const oldKey = oldName || '';
                      let newOwners = [...owners];
                      if (newOwners.includes(oldKey)) {
                        newOwners = newOwners.map(o => o === oldKey ? name : o);
                      }
                      newOwners = newOwners.filter(n => n?.trim());
                      const newPct: Record<string, string> = { ...ownershipPercentages };
                      if (newPct[oldKey] !== undefined) {
                        newPct[name] = newPct[oldKey];
                        delete newPct[oldKey];
                      }
                      onMultiChange({ otherOwners: updated, owners: newOwners, ownershipPercentages: newPct });
                    }}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className={labelClass}>Phone</label>
                    <input
                      type="text"
                      value={oo.phone}
                      onChange={(e) => handleOtherOwnerChange(oi, 'phone', e.target.value)}
                      placeholder="Enter phone"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>City of Residence</label>
                    <input
                      type="text"
                      value={oo.city}
                      onChange={(e) => handleOtherOwnerChange(oi, 'city', e.target.value)}
                      placeholder="Enter city"
                      className={inputClass}
                    />
                  </div>
                </div>
                {oi === otherOwners.length - 1 && (
                  <div>
                    <label className={labelClass}>Are there additional owners of {propertyName}?</label>
                    <div className="flex gap-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name={`hasMore-${index}-${oi}`}
                          value="yes"
                          checked={oo.hasMore === 'yes'}
                          onChange={() => {
                            handleOtherOwnerChange(oi, 'hasMore', 'yes');
                            handleAddOtherOwner();
                          }}
                          className="mr-2"
                        />
                        <span className="text-gray-300">Yes</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name={`hasMore-${index}-${oi}`}
                          value="no"
                          checked={oo.hasMore === 'no'}
                          onChange={() => {
                            handleOtherOwnerChange(oi, 'hasMore', 'no');
                            const trimmed = otherOwners.slice(0, oi + 1).map((o, idx) =>
                              idx === oi ? { ...o, hasMore: 'no' as const } : o
                            );
                            const removedNames = otherOwners.slice(oi + 1).map((o) => o.name).filter(Boolean);
                            const newPct = { ...ownershipPercentages };
                            removedNames.forEach((n) => delete newPct[n]);
                            onMultiChange({ otherOwners: trimmed, ownershipPercentages: newPct });
                          }}
                          className="mr-2"
                        />
                        <span className="text-gray-300">No</span>
                      </label>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {otherOwners.length === 0 && (
              <div>
                <label className={labelClass}>Are there additional owners of {propertyName}?</label>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name={`hasAdditionalOwners-${index}`}
                      value="yes"
                      checked={data.hasAdditionalOwners === 'yes'}
                      onChange={() => {
                        onMultiChange({ hasAdditionalOwners: 'yes' });
                        handleAddOtherOwner();
                      }}
                      className="mr-2"
                    />
                    <span className="text-gray-300">Yes</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name={`hasAdditionalOwners-${index}`}
                      value="no"
                      checked={data.hasAdditionalOwners === 'no'}
                      onChange={() => {
                        onMultiChange({ hasAdditionalOwners: 'no', otherOwners: [], ownershipPercentages: Object.fromEntries(Object.entries(ownershipPercentages).filter(([n]) => owners.includes(n))), coOwnershipAgreement: '', coOwnershipAgreementLocation: '' });
                      }}
                      className="mr-2"
                    />
                    <span className="text-gray-300">No</span>
                  </label>
                </div>
              </div>
            )}
          </div>

          {/* Ownership percentages */}
          {allOwnerNames.length > 0 && (
            <div className="mt-6">
              <button
                type="button"
                onClick={() => setShowOwnershipPct(!showOwnershipPct)}
                className="text-sm font-semibold text-blue-400 hover:text-blue-300"
              >
                {showOwnershipPct ? 'Hide' : 'Set'} ownership percentages
              </button>
              {showOwnershipPct && (
                <div className="mt-3 space-y-3">
                  {allOwnerNames.map((name) => (
                    <div key={name} className="flex items-center gap-3">
                      <span className="text-white text-sm flex-1">{name}</span>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={ownershipPercentages[name] || ''}
                        onChange={(e) => handlePctChange(name, e.target.value)}
                        placeholder="0"
                        className="w-20 px-3 py-1 bg-gray-700 border border-gray-600 rounded-lg text-white text-right"
                      />
                      <span className="text-gray-400 text-sm">%</span>
                    </div>
                  ))}
                  <div className="flex items-center gap-2 pt-2 border-t border-gray-700">
                    <span className="text-sm font-medium text-gray-300">Total:</span>
                    <span className={`text-sm font-bold ${totalPct === 100 ? 'text-green-400' : 'text-red-400'}`}>
                      {totalPct}%
                    </span>
                    {totalPct !== 100 && totalPct > 0 && (
                      <span className="text-xs text-red-400 ml-2">Must add up to 100%</span>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Title holding — only when more than one owner */}
          {allOwnerNames.length > 1 && (
            <div className="mt-5 pt-4 border-t border-gray-700">
              <label className="block text-sm font-semibold text-gray-200 mb-1">Ownership Details</label>
              <p className="text-sm text-gray-300 mb-3">
                Is the title held as Joint Tenants with Right-of-Survivorship, or as Tenants-in-Common?
              </p>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name={`titleHolding-${index}`}
                    value="joint_tenants"
                    checked={data.titleHolding === 'joint_tenants'}
                    onChange={() => onChange('titleHolding', 'joint_tenants')}
                    className="mr-2"
                  />
                  <span className="text-gray-300">Joint Tenants with Right-of-Survivorship</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name={`titleHolding-${index}`}
                    value="tenants_in_common"
                    checked={data.titleHolding === 'tenants_in_common'}
                    onChange={() => onChange('titleHolding', 'tenants_in_common')}
                    className="mr-2"
                  />
                  <span className="text-gray-300">Tenants-in-Common</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name={`titleHolding-${index}`}
                    value="not_sure"
                    checked={data.titleHolding === 'not_sure'}
                    onChange={() => onChange('titleHolding', 'not_sure')}
                    className="mr-2"
                  />
                  <span className="text-gray-300">I/We are not sure</span>
                </label>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Co-ownership agreement — shown when any non-spouse other owner exists */}
      {(() => {
        const nonSpouseOthers = otherOwners.filter(o => o.name?.trim() && o.name !== client2Name);
        return nonSpouseOthers.length > 0 ? (
          <div className="pt-4 border-t border-gray-700 space-y-4">
            <div>
              <label className={labelClass}>Is there a co-ownership agreement?</label>
              <p className="text-xs text-gray-400 mb-3 italic">
                If the property is owned with someone other than a spouse, is there a written agreement detailing how expenses are shared or how a buyout is triggered?
              </p>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name={`coOwnershipAgreement-${index}`}
                    value="yes"
                    checked={data.coOwnershipAgreement === 'yes'}
                    onChange={() => onChange('coOwnershipAgreement', 'yes')}
                    className="mr-2"
                  />
                  <span className="text-gray-300">Yes</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name={`coOwnershipAgreement-${index}`}
                    value="no"
                    checked={data.coOwnershipAgreement === 'no'}
                    onChange={() => onMultiChange({ coOwnershipAgreement: 'no', coOwnershipAgreementLocation: '' })}
                    className="mr-2"
                  />
                  <span className="text-gray-300">No</span>
                </label>
              </div>
            </div>
            {data.coOwnershipAgreement === 'yes' && (
              <div>
                <label className={labelClass}>Location of the co-ownership agreement</label>
                <input
                  type="text"
                  value={data.coOwnershipAgreementLocation || ''}
                  onChange={(e) => onChange('coOwnershipAgreementLocation', e.target.value)}
                  placeholder="Enter where the agreement is kept"
                  className={inputClass}
                />
              </div>
            )}
          </div>
        ) : null;
      })()}

      {/* Purchase year + purchased by (shown once ownership structure is established) */}
      {country && allOwnerNames.length > 0 && (
        <div className="pt-4 border-t border-gray-700 space-y-5">
          {/* Purchase year */}
          <div>
            <label className={labelClass}>What year was {propertyName} purchased?</label>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <select
                value={data.purchaseYear && data.purchaseYear !== 'not_sure' ? data.purchaseYear : ''}
                onChange={(e) => onChange('purchaseYear', e.target.value)}
                className={inputClass}
                disabled={data.purchaseYear === 'not_sure'}
              >
                <option value="">Select year</option>
                {yearOptions.map((y) => (
                  <option key={y} value={String(y)}>{y}</option>
                ))}
              </select>
              <label className="flex items-center whitespace-nowrap">
                <input
                  type="radio"
                  name={`purchaseYearNotsure-${index}`}
                  checked={data.purchaseYear === 'not_sure'}
                  onChange={() => onChange('purchaseYear', 'not_sure')}
                  className="mr-2"
                />
                <span className="text-gray-300">I'm/We're not sure</span>
              </label>
            </div>
          </div>

          {/* Purchased by */}
          <div>
            <label className={labelClass}>Who purchased the property?</label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name={`purchasedBy-${index}`}
                  value="clients"
                  checked={data.purchasedBy === 'clients'}
                  onChange={() => handlePurchasedByChange('clients')}
                  className="mr-2"
                />
                <span className="text-white">
                  {allOwnerNames.length > 0
                    ? allOwnerNames.map((name, i) => {
                        const pct = ownershipPercentages[name];
                        return (i > 0 ? ' and ' : '') + name + (pct ? ` (${pct}%)` : '');
                      }).join('')
                    : client1Name + (c1Pct ? ` (${c1Pct}%)` : '') + (hasSpouse && client2Name ? ` and ${client2Name}${c2Pct ? ` (${c2Pct}%)` : ''}` : '')}
                </span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name={`purchasedBy-${index}`}
                  value="other"
                  checked={data.purchasedBy === 'other'}
                  onChange={() => handlePurchasedByChange('other')}
                  className="mr-2"
                />
                <span className="text-white">Other</span>
              </label>
            </div>

            {/* Other: repeat ownership field/logic */}
            {data.purchasedBy === 'other' && (
              <div className="mt-4 ml-6">
                <label className="block text-sm font-semibold text-gray-200 mb-3">Who purchased it?</label>
                <div className="space-y-2">
                  {/* Client 1 */}
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={purchasedByOwners.includes(client1Name)}
                      onChange={(e) => handlePurchasedByOwnerToggle(client1Name, e.target.checked)}
                      className="mr-2"
                    />
                    <span className="text-white">{client1Name}</span>
                  </label>

                  {/* Client 2 */}
                  {hasSpouse && (
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={purchasedByOwners.includes(client2Name)}
                        onChange={(e) => handlePurchasedByOwnerToggle(client2Name, e.target.checked)}
                        className="mr-2"
                      />
                      <span className="text-white">{client2Name}</span>
                    </label>
                  )}

                  {/* Corporations */}
                  {corporations.map((corp, ci) => {
                    if (!corp.legalName) return null;
                    return (
                      <label key={`pb-corp-${ci}`} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={purchasedByOwners.includes(corp.legalName)}
                          onChange={(e) => handlePurchasedByOwnerToggle(corp.legalName, e.target.checked)}
                          className="mr-2"
                        />
                        <span className="text-white">{corp.legalName}</span>
                      </label>
                    );
                  })}

                  {/* Family Trusts */}
                  {trusts.map((trustName, ti) => {
                    if (!trustName) return null;
                    return (
                      <label key={`pb-trust-${ti}`} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={purchasedByOwners.includes(trustName)}
                          onChange={(e) => handlePurchasedByOwnerToggle(trustName, e.target.checked)}
                          className="mr-2"
                        />
                        <span className="text-white">{trustName}</span>
                      </label>
                    );
                  })}

                  {/* Partnerships */}
                  {partnerships.map((pName, pi) => {
                    if (!pName) return null;
                    return (
                      <label key={`pb-partner-${pi}`} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={purchasedByOwners.includes(pName)}
                          onChange={(e) => handlePurchasedByOwnerToggle(pName, e.target.checked)}
                          className="mr-2"
                        />
                        <span className="text-white">{pName}</span>
                      </label>
                    );
                  })}

                  {/* Other owners added so far */}
                  {purchasedByOtherOwners.map((oo, oi) => (
                    oo.name?.trim() ? (
                      <label key={`pb-oo-${oi}`} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={purchasedByOwners.includes(oo.name)}
                          onChange={(e) => handlePurchasedByOwnerToggle(oo.name, e.target.checked)}
                          className="mr-2"
                        />
                        <span className="text-white">{oo.name}</span>
                      </label>
                    ) : null
                  ))}
                </div>

                {/* Other owner collection */}
                <div className="mt-4 ml-6 space-y-4">
                  {purchasedByOtherOwners.map((oo, oi) => (
                    <div key={oi} className="border border-gray-600 rounded-lg p-4 bg-gray-700 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-300">Additional purchaser {oi + 1}</span>
                        <button
                          type="button"
                          onClick={() => handleRemovePurchasedByOtherOwner(oi)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <div>
                        <label className={labelClass}>Name</label>
                        <PersonNameSelect
                          idPrefix={`purchasedby-owner-${index}-${oi}`}
                          people={predefinedPeople}
                          selectedName={oo.name}
                          onSelect={(name, phone, city) => {
                            const updated = [...purchasedByOtherOwners];
                            const oldName = updated[oi].name;
                            updated[oi] = { ...updated[oi], name, phone, city };
                            const oldKey = oldName || '';
                            let newOwners = [...purchasedByOwners];
                            if (newOwners.includes(oldKey)) {
                              newOwners = newOwners.map(o => o === oldKey ? name : o);
                            }
                            newOwners = newOwners.filter(n => n?.trim());
                            const newPct: Record<string, string> = { ...purchasedByOwnershipPercentages };
                            if (newPct[oldKey] !== undefined) {
                              newPct[name] = newPct[oldKey];
                              delete newPct[oldKey];
                            }
                            onMultiChange({ purchasedByOtherOwners: updated, purchasedByOwners: newOwners, purchasedByOwnershipPercentages: newPct });
                          }}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className={labelClass}>Phone</label>
                          <input
                            type="text"
                            value={oo.phone}
                            onChange={(e) => handlePurchasedByOtherOwnerChange(oi, 'phone', e.target.value)}
                            placeholder="Enter phone"
                            className={inputClass}
                          />
                        </div>
                        <div>
                          <label className={labelClass}>City of Residence</label>
                          <input
                            type="text"
                            value={oo.city}
                            onChange={(e) => handlePurchasedByOtherOwnerChange(oi, 'city', e.target.value)}
                            placeholder="Enter city"
                            className={inputClass}
                          />
                        </div>
                      </div>
                      {oi === purchasedByOtherOwners.length - 1 && (
                        <div>
                          <label className={labelClass}>Are there additional purchasers of {propertyName}?</label>
                          <div className="flex gap-4">
                            <label className="flex items-center">
                              <input
                                type="radio"
                                name={`purchasedBy-hasMore-${index}-${oi}`}
                                value="yes"
                                checked={oo.hasMore === 'yes'}
                                onChange={() => {
                                  handlePurchasedByOtherOwnerChange(oi, 'hasMore', 'yes');
                                  handleAddPurchasedByOtherOwner();
                                }}
                                className="mr-2"
                              />
                              <span className="text-gray-300">Yes</span>
                            </label>
                            <label className="flex items-center">
                              <input
                                type="radio"
                                name={`purchasedBy-hasMore-${index}-${oi}`}
                                value="no"
                                checked={oo.hasMore === 'no'}
                                onChange={() => {
                                  handlePurchasedByOtherOwnerChange(oi, 'hasMore', 'no');
                                  const trimmed = purchasedByOtherOwners.slice(0, oi + 1).map((o, idx) =>
                                    idx === oi ? { ...o, hasMore: 'no' as const } : o
                                  );
                                  const removedNames = purchasedByOtherOwners.slice(oi + 1).map((o) => o.name).filter(Boolean);
                                  const newPct = { ...purchasedByOwnershipPercentages };
                                  removedNames.forEach((n) => delete newPct[n]);
                                  onMultiChange({ purchasedByOtherOwners: trimmed, purchasedByOwnershipPercentages: newPct });
                                }}
                                className="mr-2"
                              />
                              <span className="text-gray-300">No</span>
                            </label>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}

                  {purchasedByOtherOwners.length === 0 && (
                    <div>
                      <label className={labelClass}>Are there additional purchasers of {propertyName}?</label>
                      <div className="flex gap-4">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name={`purchasedByHasAdditionalOwners-${index}`}
                            value="yes"
                            checked={data.purchasedByHasAdditionalOwners === 'yes'}
                            onChange={() => {
                              onMultiChange({ purchasedByHasAdditionalOwners: 'yes' });
                              handleAddPurchasedByOtherOwner();
                            }}
                            className="mr-2"
                          />
                          <span className="text-gray-300">Yes</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name={`purchasedByHasAdditionalOwners-${index}`}
                            value="no"
                            checked={data.purchasedByHasAdditionalOwners === 'no'}
                            onChange={() => {
                              onMultiChange({ purchasedByHasAdditionalOwners: 'no', purchasedByOtherOwners: [], purchasedByOwnershipPercentages: Object.fromEntries(Object.entries(purchasedByOwnershipPercentages).filter(([n]) => purchasedByOwners.includes(n))) });
                            }}
                            className="mr-2"
                          />
                          <span className="text-gray-300">No</span>
                        </label>
                      </div>
                    </div>
                  )}
                </div>

                {/* Ownership percentages */}
                {purchasedByAllOwnerNames.length > 0 && (
                  <div className="mt-6">
                    <button
                      type="button"
                      onClick={() => setShowPurchasedByPct(!showPurchasedByPct)}
                      className="text-sm font-semibold text-blue-400 hover:text-blue-300"
                    >
                      {showPurchasedByPct ? 'Hide' : 'Set'} ownership percentages
                    </button>
                    {showPurchasedByPct && (
                      <div className="mt-3 space-y-3">
                        {purchasedByAllOwnerNames.map((name) => (
                          <div key={name} className="flex items-center gap-3">
                            <span className="text-white text-sm flex-1">{name}</span>
                            <input
                              type="number"
                              min="0"
                              max="100"
                              value={purchasedByOwnershipPercentages[name] || ''}
                              onChange={(e) => handlePurchasedByPctChange(name, e.target.value)}
                              placeholder="0"
                              className="w-20 px-3 py-1 bg-gray-700 border border-gray-600 rounded-lg text-white text-right"
                            />
                            <span className="text-gray-400 text-sm">%</span>
                          </div>
                        ))}
                        <div className="flex items-center gap-2 pt-2 border-t border-gray-700">
                          <span className="text-sm font-medium text-gray-300">Total:</span>
                          <span className={`text-sm font-bold ${purchasedByTotalPct === 100 ? 'text-green-400' : 'text-red-400'}`}>
                            {purchasedByTotalPct}%
                          </span>
                          {purchasedByTotalPct !== 100 && purchasedByTotalPct > 0 && (
                            <span className="text-xs text-red-400 ml-2">Must add up to 100%</span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Total purchase price */}
          <div>
            <label className={labelClass}>What was the total purchase price including legal fees and land transfer taxes?</label>
            <input
              type="text"
              value={data.purchasePrice || ''}
              onChange={(e) => onChange('purchasePrice', e.target.value)}
              placeholder="Enter total purchase price"
              className={inputClass}
            />
          </div>

          {/* Documents location */}
          <div>
            <label className={labelClass}>Where are the documents kept?</label>
            <input
              type="text"
              value={data.documentsLocation || ''}
              onChange={(e) => onChange('documentsLocation', e.target.value)}
              placeholder="Enter where documents are kept"
              className={inputClass}
            />
          </div>

          {/* Ownership change (conditional: purchasers differ from current owners) */}
          {ownersDifferFromPurchasers && (
            <>
              <div>
                <label className={labelClass}>What year did the ownership change?</label>
                <select
                  value={data.ownershipChangeYear || ''}
                  onChange={(e) => onChange('ownershipChangeYear', e.target.value)}
                  className={inputClass}
                >
                  <option value="">Select year</option>
                  {(() => {
                    const startYear = parseInt(data.purchaseYear || '', 10);
                    const from = isNaN(startYear) ? 1900 : startYear;
                    const opts: number[] = [];
                    for (let y = currentYear; y >= from; y--) opts.push(y);
                    return opts.map((y) => (
                      <option key={y} value={String(y)}>{y}</option>
                    ));
                  })()}
                </select>
              </div>
              <div>
                <label className={labelClass}>Location of the change of ownership documentation</label>
                <input
                  type="text"
                  value={data.ownershipChangeDocLocation || ''}
                  onChange={(e) => onChange('ownershipChangeDocLocation', e.target.value)}
                  placeholder="Enter where the documentation is kept"
                  className={inputClass}
                />
              </div>
            </>
          )}

          {/* Renovations */}
          <div>
            <label className={labelClass}>Have there been any Capital Improvements to {propertyName}?</label>
            <p className="text-xs text-gray-400 mb-3 italic">
              Note: the CRA distinguishes between these two based on whether the work improves the property beyond its original condition or merely maintains it. Examples of Capital Improvement are structural additions, substantial upgrades (replacing carpeting with hardwood floors, replacing a bathroom/kitchen), or new major systems (new roof, HVAC system). Things that typically do not qualify are expenses/maintenance (routine repairs, cleaning). When in doubt of which is which, include it here.
            </p>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name={`hasRenovations-${index}`}
                  value="yes"
                  checked={data.hasRenovations === 'yes'}
                  onChange={() => {
                    const existing = data.capitalImprovements || [];
                    onMultiChange({
                      hasRenovations: 'yes',
                      capitalImprovements: existing.length > 0 ? existing : [{ description: '', cost: '', year: '', recordsLocation: '' }],
                    });
                  }}
                  className="mr-2"
                />
                <span className="text-gray-300">Yes</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name={`hasRenovations-${index}`}
                  value="no"
                  checked={data.hasRenovations === 'no'}
                  onChange={() => {
                    onMultiChange({
                      hasRenovations: 'no',
                      capitalImprovements: [],
                    });
                  }}
                  className="mr-2"
                />
                <span className="text-gray-300">No</span>
              </label>
            </div>
          </div>

          {/* Capital improvements (conditional on hasRenovations = yes) */}
          {data.hasRenovations === 'yes' && capitalImprovements.length > 0 && (
            <div className="ml-6 space-y-5">
              {capitalImprovements.map((imp, impIndex) => (
                <div key={impIndex} className="bg-gray-750 rounded-lg p-4 border border-gray-600 space-y-4">
                  <h4 className="text-sm font-semibold text-white">Capital Improvement {impIndex + 1}</h4>
                  <div>
                    <label className={labelClass}>Description</label>
                    <input
                      type="text"
                      value={imp.description || ''}
                      onChange={(e) => handleCapitalImprovementChange(impIndex, 'description', e.target.value)}
                      placeholder="Enter description of the improvement"
                      className={inputClass}
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>Cost</label>
                      <input
                        type="text"
                        value={imp.cost || ''}
                        onChange={(e) => handleCapitalImprovementChange(impIndex, 'cost', e.target.value)}
                        placeholder="Enter cost"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Year</label>
                      <select
                        value={imp.year || ''}
                        onChange={(e) => handleCapitalImprovementChange(impIndex, 'year', e.target.value)}
                        className={inputClass}
                      >
                        <option value="">Select year</option>
                        {yearOptions.map((y) => (
                          <option key={y} value={String(y)}>{y}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Location of the receipt/records</label>
                    <input
                      type="text"
                      value={imp.recordsLocation || ''}
                      onChange={(e) => handleCapitalImprovementChange(impIndex, 'recordsLocation', e.target.value)}
                      placeholder="Enter where receipt/records are kept"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Are there any additional capital improvements to add?</label>
                    <div className="flex gap-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name={`addMoreImprovements-${index}-${impIndex}`}
                          value="yes"
                          checked={capitalImprovements[impIndex]?.hasMore === 'yes'}
                          onChange={() => {
                            const updated = [...capitalImprovements];
                            updated[impIndex] = { ...updated[impIndex], hasMore: 'yes' };
                            onChange('capitalImprovements', [...updated, { description: '', cost: '', year: '', recordsLocation: '' }]);
                          }}
                          className="mr-2"
                        />
                        <span className="text-gray-300">Yes</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name={`addMoreImprovements-${index}-${impIndex}`}
                          value="no"
                          checked={capitalImprovements[impIndex]?.hasMore === 'no'}
                          onChange={() => {
                            const updated = capitalImprovements.slice(0, impIndex + 1);
                            updated[impIndex] = { ...updated[impIndex], hasMore: 'no' };
                            onChange('capitalImprovements', updated);
                          }}
                          className="mr-2"
                        />
                        <span className="text-gray-300">No</span>
                      </label>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Rental-specific questions */}
          {isRental && (
            <>
              {/* Lease documents location */}
              <div>
                <label className={labelClass}>Where are lease documents and rental agreements kept?</label>
                <input
                  type="text"
                  value={data.leaseDocumentsLocation || ''}
                  onChange={(e) => onChange('leaseDocumentsLocation', e.target.value)}
                  placeholder="Enter where lease documents and rental agreements are kept"
                  className={inputClass}
                />
              </div>

              {/* Was it always a rental or ever inhabited by client/spouse/child */}
              <div>
                <label className={labelClass}>
                  Has {propertyName} always been a rental, or was it ever inhabited by {client1Name}{hasSpouse && client2Name ? `, ${client2Name}` : ''} or a child?
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name={`wasAlwaysRental-${index}`}
                      value="yes"
                      checked={data.wasAlwaysRental === 'yes'}
                      onChange={() => onChange('wasAlwaysRental', 'yes')}
                      className="mr-2"
                    />
                    <span className="text-gray-300">Yes, it was inhabited by {client1Name}{hasSpouse && client2Name ? `, ${client2Name}` : ''} or a child</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name={`wasAlwaysRental-${index}`}
                      value="no"
                      checked={data.wasAlwaysRental === 'no'}
                      onChange={() => onMultiChange({ wasAlwaysRental: 'no', inhabitedYears: [] })}
                      className="mr-2"
                    />
                    <span className="text-gray-300">No, it has always been a rental</span>
                  </label>
                </div>
              </div>

              {/* Inhabited years (conditional on wasAlwaysRental = yes) */}
              {data.wasAlwaysRental === 'yes' && (() => {
                const purchaseYearNum = parseInt(data.purchaseYear || '', 10);
                const selectedYears: string[] = data.inhabitedYears || [];
                const years: number[] = [];
                if (!isNaN(purchaseYearNum) && purchaseYearNum <= currentYear) {
                  for (let y = purchaseYearNum; y <= currentYear; y++) years.push(y);
                }
                const toggleYear = (year: number) => {
                  const yearStr = String(year);
                  const updated = selectedYears.includes(yearStr)
                    ? selectedYears.filter(y => y !== yearStr)
                    : [...selectedYears, yearStr].sort((a, b) => Number(a) - Number(b));
                  onChange('inhabitedYears', updated);
                };
                return (
                  <div className="ml-6 space-y-3">
                    <label className={labelClass}>
                      What years was {propertyName} inhabited by {client1Name}{hasSpouse && client2Name ? `, ${client2Name}` : ''}, or a child?
                    </label>
                    <p className="text-xs text-gray-400 italic">
                      Select all years that apply, from the purchase date to the present.
                    </p>
                    <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 gap-2">
                      {years.map(year => (
                        <button
                          key={year}
                          type="button"
                          onClick={() => toggleYear(year)}
                          className={`px-2 py-1.5 text-sm rounded-lg border transition-colors ${
                            selectedYears.includes(String(year))
                              ? 'bg-blue-600 border-blue-500 text-white'
                              : 'bg-gray-600 border-gray-500 text-gray-300 hover:bg-gray-500'
                          }`}
                        >
                          {year}
                        </button>
                      ))}
                    </div>
                    {years.length === 0 && (
                      <p className="text-xs text-gray-400 italic">
                        Enter a purchase date for this property above to enable year selection.
                      </p>
                    )}
                  </div>
                );
              })()}

              {/* Property manager */}
              <div>
                <label className={labelClass}>Is there a designated property manager?</label>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name={`hasPropertyManager-${index}`}
                      value="yes"
                      checked={data.hasPropertyManager === 'yes'}
                      onChange={() => onChange('hasPropertyManager', 'yes')}
                      className="mr-2"
                    />
                    <span className="text-gray-300">Yes</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name={`hasPropertyManager-${index}`}
                      value="no"
                      checked={data.hasPropertyManager === 'no'}
                      onChange={() => onMultiChange({
                        hasPropertyManager: 'no',
                        propertyManagerName: '',
                        propertyManagerPhone: '',
                        propertyManagerEmail: '',
                        propertyManagerCompany: '',
                      })}
                      className="mr-2"
                    />
                    <span className="text-gray-300">No</span>
                  </label>
                </div>
              </div>

              {/* Property manager contact details (conditional on hasPropertyManager = yes) */}
              {data.hasPropertyManager === 'yes' && (
                <div className="ml-6 space-y-4">
                  <div>
                    <label className={labelClass}>Contact Name:</label>
                    <input
                      type="text"
                      value={data.propertyManagerName || ''}
                      onChange={(e) => onChange('propertyManagerName', e.target.value)}
                      placeholder="Enter contact name"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Phone</label>
                    <input
                      type="text"
                      value={data.propertyManagerPhone || ''}
                      onChange={(e) => onChange('propertyManagerPhone', e.target.value)}
                      placeholder="Enter phone number"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Email</label>
                    <input
                      type="text"
                      value={data.propertyManagerEmail || ''}
                      onChange={(e) => onChange('propertyManagerEmail', e.target.value)}
                      placeholder="Enter email address"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Company:</label>
                    <input
                      type="text"
                      value={data.propertyManagerCompany || ''}
                      onChange={(e) => onChange('propertyManagerCompany', e.target.value)}
                      placeholder="Enter company name"
                      className={inputClass}
                    />
                  </div>
                </div>
              )}

              {/* Landlord insurance */}
              <div>
                <label className={labelClass}>Do you have a specific Landlord insurance policy?</label>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name={`hasLandlordInsurance-${index}`}
                      value="yes"
                      checked={data.hasLandlordInsurance === 'yes'}
                      onChange={() => onChange('hasLandlordInsurance', 'yes')}
                      className="mr-2"
                    />
                    <span className="text-gray-300">Yes</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name={`hasLandlordInsurance-${index}`}
                      value="no"
                      checked={data.hasLandlordInsurance === 'no'}
                      onChange={() => onMultiChange({ hasLandlordInsurance: 'no', landlordInsuranceLocation: '' })}
                      className="mr-2"
                    />
                    <span className="text-gray-300">No</span>
                  </label>
                </div>
              </div>

              {/* Landlord insurance document location (conditional on hasLandlordInsurance = yes) */}
              {data.hasLandlordInsurance === 'yes' && (
                <div className="ml-6">
                  <label className={labelClass}>Landlord insurance policy document location:</label>
                  <input
                    type="text"
                    value={data.landlordInsuranceLocation || ''}
                    onChange={(e) => onChange('landlordInsuranceLocation', e.target.value)}
                    placeholder="Enter where the policy document is kept"
                    className={inputClass}
                  />
                </div>
              )}
            </>
          )}

          {/* Inhabited annually / used for income / PRE — hidden for Rental properties */}
          {!isRental && (
            <>
          <div>
            <label className={labelClass}>
              Has {propertyName} been inhabited by {client1Name}{hasSpouse && client2Name ? `, ${client2Name}` : ''} or one or more of your children for at least some part of every year since it was purchased?
            </label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name={`inhabitedAnnually-${index}`}
                  value="yes"
                  checked={data.inhabitedAnnually === 'yes'}
                  onChange={() => onChange('inhabitedAnnually', 'yes')}
                  className="mr-2"
                />
                <span className="text-gray-300">Yes</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name={`inhabitedAnnually-${index}`}
                  value="no"
                  checked={data.inhabitedAnnually === 'no'}
                  onChange={() => onChange('inhabitedAnnually', 'no')}
                  className="mr-2"
                />
                <span className="text-gray-300">No</span>
              </label>
            </div>
          </div>

          {/* Used for income */}
          <div>
            <label className={labelClass}>
              Since the date of purchase, has this property ever been used primarily to earn income (e.g., rented to third parties)?
            </label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name={`usedForIncome-${index}`}
                  value="yes"
                  checked={data.usedForIncome === 'yes'}
                  onChange={() => {
                    onChange('usedForIncome', 'yes');
                  }}
                  className="mr-2"
                />
                <span className="text-gray-300">Yes</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name={`usedForIncome-${index}`}
                  value="no"
                  checked={data.usedForIncome === 'no'}
                  onChange={() => {
                    onChange('usedForIncome', 'no');
                    onMultiChange({ claimedCCA: '', recordsLocation: '' });
                  }}
                  className="mr-2"
                />
                <span className="text-gray-300">No</span>
              </label>
            </div>
          </div>

          {/* CCA claim (conditional on usedForIncome = yes) */}
          {data.usedForIncome === 'yes' && (
            <div className="ml-6 space-y-5">
              <div>
                <label className={labelClass}>
                  Did you ever claim Capital Cost Allowance (depreciation) when filing with the CRA?
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name={`claimedCCA-${index}`}
                      value="yes"
                      checked={data.claimedCCA === 'yes'}
                      onChange={() => onChange('claimedCCA', 'yes')}
                      className="mr-2"
                    />
                    <span className="text-gray-300">Yes</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name={`claimedCCA-${index}`}
                      value="no"
                      checked={data.claimedCCA === 'no'}
                      onChange={() => {
                        onChange('claimedCCA', 'no');
                        onChange('recordsLocation', '');
                      }}
                      className="mr-2"
                    />
                    <span className="text-gray-300">No</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name={`claimedCCA-${index}`}
                      value="not_sure"
                      checked={data.claimedCCA === 'not_sure'}
                      onChange={() => {
                        onChange('claimedCCA', 'not_sure');
                        onChange('recordsLocation', '');
                      }}
                      className="mr-2"
                    />
                    <span className="text-gray-300">I'm/We're not sure</span>
                  </label>
                </div>
              </div>

              {/* Records location (conditional on claimedCCA = yes) */}
              {data.claimedCCA === 'yes' && (
                <div>
                  <label className={labelClass}>Where are your records kept?</label>
                  <input
                    type="text"
                    value={data.recordsLocation || ''}
                    onChange={(e) => onChange('recordsLocation', e.target.value)}
                    placeholder="Enter where records are kept"
                    className={inputClass}
                  />
                </div>
              )}
            </div>
          )}

          {/* PRE claimed for another property */}
          <div>
            <label className={labelClass}>
              Aside from the year you purchased this property, were there any other years where you already claimed the Principal Residence Exemption for a different property you sold?
            </label>
            <p className="text-xs text-gray-400 mb-3 italic">
              Guidance: If you sold your previous home in 2011 and bought this one in 2011, the 'one-plus' rule covers both for that year, so you would answer 'No' unless you sold another property later during your ownership of this home.
            </p>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name={`claimedPREOtherProperty-${index}`}
                  value="yes"
                  checked={data.claimedPREOtherProperty === 'yes'}
                  onChange={() => onChange('claimedPREOtherProperty', 'yes')}
                  className="mr-2"
                />
                <span className="text-gray-300">Yes</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name={`claimedPREOtherProperty-${index}`}
                  value="no"
                  checked={data.claimedPREOtherProperty === 'no'}
                  onChange={() => {
                    onChange('claimedPREOtherProperty', 'no');
                    onChange('preDesignatedYears', []);
                  }}
                  className="mr-2"
                />
                <span className="text-gray-300">No</span>
              </label>
            </div>
          </div>

          {/* Designated years checkboxes (conditional on claimedPREOtherProperty = yes) */}
          {data.claimedPREOtherProperty === 'yes' && (
            <div className="ml-6">
              <label className={labelClass}>What specific years were designated for the other property(ies) sold?</label>
              <p className="text-xs text-yellow-400 mb-3">
                This data will be important for a POA or Executor to use when filing taxes.
              </p>
              {(() => {
                const startYear = parseInt(data.purchaseYear || '', 10);
                if (isNaN(startYear)) {
                  return (
                    <p className="text-sm text-gray-400">
                      Please select a purchase year above to see the list of eligible years.
                    </p>
                  );
                }
                const selectedYears = data.preDesignatedYears || [];
                const yearList: number[] = [];
                for (let y = startYear; y <= currentYear; y++) yearList.push(y);
                const toggleYear = (year: string) => {
                  if (selectedYears.includes(year)) {
                    onChange('preDesignatedYears', selectedYears.filter(yr => yr !== year));
                  } else {
                    onChange('preDesignatedYears', [...selectedYears, year]);
                  }
                };
                return (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                    {yearList.map((y) => (
                      <label key={y} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedYears.includes(String(y))}
                          onChange={() => toggleYear(String(y))}
                          className="mr-2"
                        />
                        <span className="text-gray-300 text-sm">{y}</span>
                      </label>
                    ))}
                  </div>
                );
              })()}
            </div>
          )}
            </>
          )}

          {/* Legacy Intent */}
          <div className="mt-8">
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px flex-1 bg-gradient-to-r from-blue-500/50 to-transparent" />
              <h3 className="text-sm font-semibold tracking-widest text-blue-400 uppercase whitespace-nowrap">
                Legacy Intent
              </h3>
              <div className="h-px flex-1 bg-gradient-to-l from-blue-500/50 to-transparent" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
