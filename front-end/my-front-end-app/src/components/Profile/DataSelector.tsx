import React, { useState } from "react";

const DateSelector: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>("");

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
  };

  return (
    <div className="w-2/3 mx-auto">
      <input
        type="date"
        id="date"
        value={selectedDate}
        onChange={handleDateChange}
        className="flex-1 p-[3px] block w-full border border-gray-300 rounded"
      />
    </div>
  );
};

export default DateSelector;
