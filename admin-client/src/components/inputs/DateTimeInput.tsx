import React, { ChangeEvent, FC, useState } from "react";

interface DateTimeInputProps {
  timeValue?: string;
  dateValue?: string;
  setDateTime: (e: ChangeEvent<HTMLInputElement>) => void;
}

const DateTimeInput: FC<DateTimeInputProps> = ({
  timeValue,
  dateValue,
  setDateTime,
}) => {
  const [hasCustomDate, setHasCustomDate] = useState<boolean>(false);

  return (
    <div className="add-articles__datetime-input-container">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <input
          id="checkboxx"
          name="checkboxx"
          type="checkbox"
          style={{ marginRight: "10px", marginTop: "4px" }}
          onClick={() => setHasCustomDate((prevState) => !prevState)}
        />
        <label className="add-articles__category-label" htmlFor="checkboxx">
          Add custom date and time instead?
        </label>
      </div>
      {hasCustomDate && (
        <>
          <label className="add-articles__category-label" htmlFor="date">
            Date
          </label>
          <input
            name="date"
            className="add-articles__input-field"
            type="date"
            onChange={setDateTime}
            value={dateValue}
            style={{ display: "block" }}
          />
          <label className="add-articles__category-label" htmlFor="time">
            Time
          </label>
          <input
            name="time"
            type="time"
            className="add-articles__input-field"
            onChange={setDateTime}
            value={timeValue}
            style={{ display: "block" }}
          />
        </>
      )}
    </div>
  );
};

export default DateTimeInput;
