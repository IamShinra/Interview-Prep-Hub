import React, { useState } from 'react';

function FormTextArea({
    label,
    placeholder,
    value,
    onChange,
    inputStyle,
    labelStyle,
  }) {
  // State to manage the text content of the text area
  const [text, setText] = useState('');

  // Event handler to update the text when the user types
  
  return (
    <div className='flex flex-col'>
      <label className={`text-sm mb-3 ${labelStyle}`}>{label}</label>
      <textarea
        rows="4" // Adjust the number of rows as needed
        cols="50" // Adjust the number of columns as needed
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`h-16 border-2 rounded-lg p-2 mb-4 focus:outline-orange-400 ${inputStyle}`}
      />
    </div>
  );
}

export default FormTextArea;