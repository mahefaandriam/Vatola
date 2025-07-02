import { useState } from "react";

type MultiSelectDropdownProps = {
  options: string[];
  selected: string[];
  setSelected: React.Dispatch<React.SetStateAction<string[]>>;
  placeholder?: string;
};

export default function MultiSelectDropdown({
  options,
  selected,
  setSelected,
  placeholder = "Options",
}: MultiSelectDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [focusOptions, setFocusOptions] = useState(false);


  const toggleOption = (option: any) => {
    setIsOpen(false);
    setSelected((prev) =>
      prev.includes(option) ? prev.filter((v) => v !== option) : [...prev, option]
    );
  };

  return (
    <div className="relative w-full" onMouseEnter={() =>setFocusOptions(true)} onMouseLeave={() =>setFocusOptions(false)}>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        onBlur={() => {
          if (!focusOptions) {
            setIsOpen(false);
          }
        }}
        className="w-full px-4 py-2 text-left bg-white text-nowrap"
      >
        {selected.length > 0 ? selected.join(", ") : placeholder}
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 -left-8 w-90 bg-white border border-gray-300 rounded-md shadow-lg max-h-48 overflow-y-auto">
          {options.map((option) => (
            <label
              key={option}
              className="block px-4 py-2 text-sm cursor-pointer hover:bg-blue-50"
            >
              <input
                type="checkbox"
                checked={selected.includes(option)}
                onChange={() => toggleOption(option)}
                className="mr-2"
              />
              {option}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
