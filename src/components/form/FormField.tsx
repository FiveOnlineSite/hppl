import { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";

type LabelProps = {
  label: string;
  required?: boolean;
  htmlFor: string;
};

function FieldLabel({ label, required, htmlFor }: LabelProps) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-semibold text-slate-800">
      {label}
      {required && <span className="ml-0.5 text-red-600">*</span>}
    </label>
  );
}

const inputClasses =
  "w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition hover:border-slate-400 focus:border-red-600 focus:ring-4 focus:ring-red-100";

type FormInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
  required?: boolean;
};

export function FormInput({ label, name, required, ...props }: FormInputProps) {
  return (
    <div>
      <FieldLabel label={label} required={required} htmlFor={name} />
      <input id={name} name={name} required={required} className={inputClasses} {...props} />
    </div>
  );
}

type FormSelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  name: string;
  required?: boolean;
  options: string[];
  placeholder?: string;
};

export function FormSelect({
  label,
  name,
  required,
  options,
  placeholder = "Select an option",
  ...props
}: FormSelectProps) {
  return (
    <div>
      <FieldLabel label={label} required={required} htmlFor={name} />
      <select id={name} name={name} required={required} className={inputClasses} {...props}>
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

type FormTextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  name: string;
  required?: boolean;
};

export function FormTextarea({ label, name, required, ...props }: FormTextareaProps) {
  return (
    <div className="sm:col-span-2">
      <FieldLabel label={label} required={required} htmlFor={name} />
      <textarea id={name} name={name} required={required} rows={4} className={inputClasses} {...props} />
    </div>
  );
}

type RadioGroupProps = {
  label: string;
  name: string;
  options: string[];
  required?: boolean;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
};

export function FormRadioGroup({
  label,
  name,
  options,
  required,
  defaultValue,
  onValueChange,
}: RadioGroupProps) {
  return (
    <div>
      <span className="mb-1.5 block text-sm font-semibold text-slate-800">
        {label}
        {required && <span className="ml-0.5 text-red-600">*</span>}
      </span>
      <div className="flex flex-wrap gap-2 pt-1">
        {options.map((opt) => (
          <label
            key={opt}
            className="flex cursor-pointer items-center gap-2 rounded-full border border-slate-300 px-4 py-1.5 text-sm text-slate-700 transition has-[:checked]:border-red-600 has-[:checked]:bg-red-50 has-[:checked]:text-red-800 hover:border-slate-400"
          >
            <input
              type="radio"
              name={name}
              value={opt}
              required={required}
              defaultChecked={defaultValue === opt}
              onChange={onValueChange ? () => onValueChange(opt) : undefined}
              className="h-3.5 w-3.5 border-slate-300 text-red-600 focus:ring-red-600"
            />
            {opt}
          </label>
        ))}
      </div>
    </div>
  );
}

type CheckboxGroupProps = {
  label: string;
  name: string;
  options: string[];
};

export function FormCheckboxGroup({ label, name, options }: CheckboxGroupProps) {
  return (
    <div>
      <span className="mb-1.5 block text-sm font-semibold text-slate-800">{label}</span>
      <div className="flex flex-wrap gap-2 pt-1">
        {options.map((opt) => (
          <label
            key={opt}
            className="flex cursor-pointer items-center gap-2 rounded-full border border-slate-300 px-4 py-1.5 text-sm text-slate-700 transition has-[:checked]:border-red-600 has-[:checked]:bg-red-50 has-[:checked]:text-red-800 hover:border-slate-400"
          >
            <input
              type="checkbox"
              name={name}
              value={opt}
              className="h-3.5 w-3.5 rounded border-slate-300 text-red-600 focus:ring-red-600"
            />
            {opt}
          </label>
        ))}
      </div>
    </div>
  );
}

export function FormSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <legend className="mb-6 flex items-center gap-3 px-1 text-base font-bold uppercase tracking-wide text-slate-900">
        <span aria-hidden="true" className="h-5 w-1 shrink-0 rounded-full bg-red-600" />
        {title}
      </legend>
      <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">{children}</div>
    </fieldset>
  );
}
