import React from "react";
import { ChevronDown } from "lucide-react";

interface Option {
  label: string;
  value: string;
}

interface CustomDropdownProps {
  label?: string;
  options: Option[];
  defaultValue?: string;
  onChange?: (value: string) => void;
  className?: string;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  label,
  options,
  defaultValue,
  onChange,
  className = "",
}) => {
  const initialSelected = defaultValue ?? (options && options.length > 0 ? options[0].value : "");
  const [selected, setSelected] = React.useState(initialSelected);
  const [open, setOpen] = React.useState(false);

  // Keep internal selected in sync when parent changes defaultValue
  React.useEffect(() => {
    if (defaultValue !== undefined) {
      setSelected(defaultValue ?? "");
    }
    // if parent doesn't provide defaultValue (undefined), do not auto-select first option
  }, [defaultValue]);

  const handleSelect = (value: string) => {
    setSelected(value);
    onChange?.(value);
    setOpen(false);
  };

  const selectedLabel = options.find((opt) => opt.value === selected)?.label || "";

  return (
    <div className={`relative inline-block text-left ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      )}

      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-48 px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:border-yellow-500 transition"
      >
        <span className={`text-sm ${selectedLabel ? "text-gray-700" : "text-gray-400 italic"}`}>
          {selectedLabel || "Chọn chiến dịch"}
        </span>
        <ChevronDown size={16} className={`ml-2 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <ul className="absolute z-20 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
          {options && options.length > 0 ? (
            options.map((opt) => (
              <li
                key={opt.value}
                onClick={() => handleSelect(opt.value)}
                className={`px-4 py-2 text-sm cursor-pointer hover:bg-yellow-100 ${opt.value === selected ? "bg-yellow-50 font-medium text-yellow-700" : "text-gray-700"
                  }`}
              >
                {opt.label}
              </li>
            ))
          ) : (
            <li className={`px-4 py-2 text-sm text-gray-500`}>Không có lựa chọn</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default CustomDropdown;
