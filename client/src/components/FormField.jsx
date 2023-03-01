import React from "react";

const FormField = ({
  labelName,
  type,
  name,
  placeholder,
  value,
  handleChange,
  isSurpriseMe,
  handleSurpriseMe,
}) => {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-900">
          {labelName}
        </label>
        {isSurpriseMe && (
          <button
            type="button"
            onClick={handleSurpriseMe}
            className="font-semibold text-xs bg-[#EcECF1] px-2 py-1 rounded-[5px] text-black hover:bg-black hover:text-white">
            SurpriseMe
          </button>
        )}
      </div>

      <input
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
        required
        placeholder="Search posts..."
        className="mt-1 py-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
      />
    </div>
  );
};

export default FormField;
