import React, { useState } from 'react';
import { Plus, Trash2, AlertTriangle } from 'lucide-react';

export type OtherOwner = {
  name: string;
  phone: string;
  city: string;
  hasMore: 'yes' | 'no' | '';
};

export type PropertyData = {
  type: string;
  name: string;
  country: string;
  province: string;
  state: string;
  city: string;
  owners: string[];
  otherOwners: OtherOwner[];
  ownershipPercentages: Record<string, string>;
  purchaseYear: string;
  purchasedBy: string;
  purchasedByOtherOwners: OtherOwner[];
  purchasedByOwners: string[];
  purchasedByOwnershipPercentages: Record<string, string>;
  inhabitedAnnually: string;
  usedForIncome: string;
  claimedCCA: string;
  recordsLocation: string;
  claimedPREOtherProperty: string;
  preDesignatedYears: string[];
  titleHolding: string;
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

  const isCanada = country.toLowerCase() === 'canada';
  const isUS = country.toLowerCase() === 'united states' || country.toLowerCase() === 'usa' || country.toLowerCase() === 'us';

  const allOwnerNames: string[] = [
    ...owners,
    ...otherOwners.filter(o => o.name?.trim()).map(o => o.name),
  ];

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

  const purchasedByAllOwnerNames: string[] = [
    ...purchasedByOwners,
    ...purchasedByOtherOwners.filter(o => o.name?.trim()).map(o => o.name),
  ];

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
  const yearOptions: number[] = [];
  for (let y = currentYear; y >= 1900; y--) yearOptions.push(y);

  const propertyName = data.name || `${propertyType} ${index + 1}`;
  const c1Pct = ownershipPercentages[client1Name] || '';
  const c2Pct = ownershipPercentages[client2Name] || '';

  const handlePurchasedByChange = (value: string) => {
    onChange('purchasedBy', value);
    if (value !== 'other') {
      onMultiChange({
        purchasedByOwners: [],
        purchasedByOtherOwners: [],
        purchasedByOwnershipPercentages: {},
      });
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
              <label key={`oo-${oi}`} className="flex items-center">
                <input
                  type="checkbox"
                  checked={owners.includes(oo.name)}
                  onChange={(e) => handleOwnerToggle(oo.name, e.target.checked)}
                  className="mr-2"
                />
                <span className="text-white">{oo.name || `Other ${oi + 1}`}</span>
              </label>
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
                  <input
                    type="text"
                    list={`predefined-people-${index}-${oi}`}
                    value={oo.name}
                    onChange={(e) => handleOtherOwnerChange(oi, 'name', e.target.value)}
                    placeholder="Enter name or select from list"
                    className={inputClass}
                  />
                  <datalist id={`predefined-people-${index}-${oi}`}>
                    {predefinedPeople.map((p, pi) => (
                      <option key={pi} value={p.name} />
                    ))}
                  </datalist>
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
                {oo.name?.trim() && (
                  <div>
                    <label className={labelClass}>Are there additional owners?</label>
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
                          onChange={() => handleOtherOwnerChange(oi, 'hasMore', 'no')}
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
              <button
                type="button"
                onClick={handleAddOtherOwner}
                className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300"
              >
                <Plus size={16} /> Add other owner
              </button>
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
                  {client1Name}
                  {c1Pct ? ` (${c1Pct}%)` : ''}
                  {hasSpouse && client2Name ? ` and ${client2Name}${c2Pct ? ` (${c2Pct}%)` : ''}` : ''}
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
                    <label key={`pb-oo-${oi}`} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={purchasedByOwners.includes(oo.name)}
                        onChange={(e) => handlePurchasedByOwnerToggle(oo.name, e.target.checked)}
                      className="mr-2"
                    />
                    <span className="text-white">{oo.name || `Other ${oi + 1}`}</span>
                  </label>
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
                        <input
                          type="text"
                          list={`purchasedBy-predefined-people-${index}-${oi}`}
                          value={oo.name}
                          onChange={(e) => handlePurchasedByOtherOwnerChange(oi, 'name', e.target.value)}
                          placeholder="Enter name or select from list"
                          className={inputClass}
                        />
                        <datalist id={`purchasedBy-predefined-people-${index}-${oi}`}>
                          {predefinedPeople.map((p, pi) => (
                            <option key={pi} value={p.name} />
                          ))}
                        </datalist>
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
                      {oo.name?.trim() && (
                        <div>
                          <label className={labelClass}>Are there additional purchasers?</label>
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
                                onChange={() => handlePurchasedByOtherOwnerChange(oi, 'hasMore', 'no')}
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
                    <button
                      type="button"
                      onClick={handleAddPurchasedByOtherOwner}
                      className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300"
                    >
                      <Plus size={16} /> Add other purchaser
                    </button>
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

          {/* Inhabited annually */}
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
        </div>
      )}
    </div>
  );
}
