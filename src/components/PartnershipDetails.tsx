export type PartnershipData = {
  registeredName: string;
  natureOfBusiness: string;
  partnershipType: string;
  hasWrittenAgreement: string;
  agreementDocLocation: string;
  agreementHasDeathProvisions: string;
};

type Props = {
  index: number;
  data: Partial<PartnershipData>;
  onChange: (field: keyof PartnershipData, value: string) => void;
  onMultiChange: (updates: Partial<PartnershipData>) => void;
  clientName: string;
};

const inputClass =
  'w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all';

const labelClass = 'block text-sm font-medium text-gray-300 mb-2';

export default function PartnershipDetails({ index, data, onChange, onMultiChange, clientName }: Props) {
  const handleAgreementChange = (value: string) => {
    if (value === 'no') {
      onMultiChange({
        hasWrittenAgreement: 'no',
        agreementDocLocation: undefined,
        agreementHasDeathProvisions: undefined,
      });
    } else {
      onChange('hasWrittenAgreement', value);
    }
  };

  return (
    <div className="border border-gray-600 rounded-xl p-6 bg-gray-800 space-y-6">
      <h3 className="text-lg font-semibold text-white">
        {clientName}'s Partnership {index + 1}
      </h3>

      <div className="border-t border-gray-600 pt-4">
        <h4 className="text-base font-semibold text-blue-300 mb-4 uppercase tracking-wide">
          Business Identification and Records
        </h4>

        <div className="space-y-4">
          <div>
            <label className={labelClass}>Registered Name of the Business:</label>
            <input
              type="text"
              value={data.registeredName || ''}
              onChange={(e) => onChange('registeredName', e.target.value)}
              placeholder="Enter registered business name"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Nature of the Business:</label>
            <input
              type="text"
              value={data.natureOfBusiness || ''}
              onChange={(e) => onChange('natureOfBusiness', e.target.value)}
              placeholder="Describe the nature of the business"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Type of Partnership:</label>
            <div className="space-y-2">
              {[
                { value: 'general', label: 'General Partner (with unlimited personal liability)' },
                { value: 'limited', label: 'Limited Partner (with limited liability)' },
              ].map((opt) => (
                <label
                  key={opt.value}
                  className="flex items-center p-3 border border-gray-600 bg-gray-700 rounded-lg hover:bg-gray-600 cursor-pointer"
                >
                  <input
                    type="radio"
                    name={`partnershipType-${index}`}
                    value={opt.value}
                    checked={data.partnershipType === opt.value}
                    onChange={() => onChange('partnershipType', opt.value)}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-3 text-gray-300">{opt.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className={labelClass}>Do you have a written partnership agreement?</label>
            <div className="space-y-2">
              {[
                { value: 'yes', label: 'Yes' },
                { value: 'no', label: 'No' },
              ].map((opt) => (
                <label
                  key={opt.value}
                  className="flex items-center p-3 border border-gray-600 bg-gray-700 rounded-lg hover:bg-gray-600 cursor-pointer"
                >
                  <input
                    type="radio"
                    name={`hasWrittenAgreement-${index}`}
                    value={opt.value}
                    checked={data.hasWrittenAgreement === opt.value}
                    onChange={() => handleAgreementChange(opt.value)}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-3 text-gray-300">{opt.label}</span>
                </label>
              ))}
            </div>
          </div>

          {data.hasWrittenAgreement === 'yes' && (
            <>
              <div>
                <label className={labelClass}>Where is the original document located?</label>
                <input
                  type="text"
                  value={data.agreementDocLocation || ''}
                  onChange={(e) => onChange('agreementDocLocation', e.target.value)}
                  placeholder="Enter location of original document"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>
                  Does it contain specific provisions for the death or incapacity of a partner?
                </label>
                <div className="space-y-2">
                  {[
                    { value: 'yes', label: 'Yes' },
                    { value: 'no', label: 'No' },
                    { value: 'unsure', label: "I'm not sure" },
                  ].map((opt) => (
                    <label
                      key={opt.value}
                      className="flex items-center p-3 border border-gray-600 bg-gray-700 rounded-lg hover:bg-gray-600 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name={`agreementHasDeathProvisions-${index}`}
                        value={opt.value}
                        checked={data.agreementHasDeathProvisions === opt.value}
                        onChange={() => onChange('agreementHasDeathProvisions', opt.value)}
                        className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-3 text-gray-300">{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
