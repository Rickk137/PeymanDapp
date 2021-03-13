interface NumericInputProps {
  value: string | number;
  onChange: Function;
  currency: string;
  label?: string;
  placeholder?: string;
  multiselect?: boolean;
}
const amountFractions = [1 / 10, 1 / 4, 1 / 2, 3 / 4, 1];

function NumericInput({
  value,
  onChange,
  currency,
  placeholder = "",
  label,
  multiselect,
}: NumericInputProps) {
  return (
    <div className="inline-flex flex-col w-80">
      {label && <label className="text-white mb-3">{label}</label>}
      <div className="flex items-center relative">
        <input
          className="focus:outline-none h-10 w-full px-12 rounded-lg text-center"
          placeholder={placeholder}
          value={value}
        />
        <span className="absolute right-5">{currency}</span>
      </div>
      {multiselect && (
        <ul className="flex items-center mt-4 rounded-lg border border-input text-input text-center">
          {amountFractions.map((item, i) => {
            return (
              <li
                className={
                  "cursor-pointer py-1 border-input " +
                  (i === amountFractions.length - 1 ? "" : "border-r")
                }
                style={{ width: `${amountFractions.length * 100}%` }}
              >
                {item * 100}%
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default NumericInput;
