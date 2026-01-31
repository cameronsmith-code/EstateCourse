import { StepQuestion } from '../lib/steps';

type FormFieldProps = {
  question: StepQuestion;
  value: unknown;
  onChange: (value: unknown) => void;
};

export default function FormField({ question, value, onChange }: FormFieldProps) {
  const { key, label, type, placeholder, options, required } = question;

  const commonClasses =
    'w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all';

  if (type === 'textarea') {
    return (
      <div className="mb-6">
        <label htmlFor={key} className="block text-sm font-medium text-gray-300 mb-2">
          {label}
          {required && <span className="text-red-400 ml-1">*</span>}
        </label>
        <textarea
          id={key}
          value={(value as string) || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          rows={4}
          className={commonClasses}
        />
      </div>
    );
  }

  if (type === 'select') {
    return (
      <div className="mb-6">
        <label htmlFor={key} className="block text-sm font-medium text-gray-300 mb-2">
          {label}
          {required && <span className="text-red-400 ml-1">*</span>}
        </label>
        <select
          id={key}
          value={(value as string) || ''}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          className={commonClasses}
        >
          <option value="">Select an option</option>
          {options?.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    );
  }

  if (type === 'radio') {
    return (
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-300 mb-3">
          {label}
          {required && <span className="text-red-400 ml-1">*</span>}
        </label>
        <div className="space-y-2">
          {options?.map((opt) => (
            <label key={opt.value} className="flex items-center p-3 border border-gray-600 bg-gray-700 rounded-lg hover:bg-gray-600 cursor-pointer">
              <input
                type="radio"
                name={key}
                value={opt.value}
                checked={value === opt.value}
                onChange={(e) => onChange(e.target.value)}
                required={required}
                className="w-4 h-4 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-3 text-gray-300">{opt.label}</span>
            </label>
          ))}
        </div>
      </div>
    );
  }

  if (type === 'checkbox') {
    return (
      <div className="mb-6">
        <label className="flex items-center p-3 border border-gray-600 bg-gray-700 rounded-lg hover:bg-gray-600 cursor-pointer">
          <input
            type="checkbox"
            checked={!!value}
            onChange={(e) => onChange(e.target.checked)}
            required={required}
            className="w-4 h-4 text-blue-600 focus:ring-blue-500 rounded"
          />
          <span className="ml-3 text-gray-300">
            {label}
            {required && <span className="text-red-400 ml-1">*</span>}
          </span>
        </label>
      </div>
    );
  }

  return (
    <div className="mb-6">
      <label htmlFor={key} className="block text-sm font-medium text-gray-300 mb-2">
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </label>
      <input
        type={type}
        id={key}
        value={(value as string) || ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className={commonClasses}
      />
    </div>
  );
}
