import React, { useState } from "react";
import dayjs from "dayjs";

const DateTimeInput = () => {
  const [hasCustomDate, setHasCustomDate] = useState<boolean>(false);
  const [dateValue, setDateValue] = useState<string>(
    dayjs().format("YYYY-MM-DD")
  );
  const [time, setTime] = useState<string>(dayjs().format("hh:mm"));
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
            onChange={(e) => {
              const date = dayjs(new Date(e.target.value)).format("YYYY-MM-DD");
              setDateValue(() => date.toString() as any);
            }}
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
            onChange={(e) =>
              setTime(dayjs(`${dateValue} ${e.target.value}`).format("hh:mm"))
            }
            value={time}
            style={{ display: "block" }}
          />
        </>
      )}
    </div>
  );
};

export default DateTimeInput;
