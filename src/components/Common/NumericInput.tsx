interface NumericInputProps {
  value: string | number;
  onChange: Function;
  currency: string;
  placeholder?: string;
  multiselect?: boolean;
}
const amountFractions = [1 / 10, 1 / 4, 1 / 2, 3 / 4, 1];

function NumericInput({
  value,
  onChange,
  currency,
  placeholder = '',
  multiselect,
}: NumericInputProps) {
  return (
    <div className="inline-flex flex-col w-60 md:w-80">
      <div className="flex items-center relative text-black">
        <input
          className="focus:outline-none h-10 w-full px-12 rounded-lg text-center"
          placeholder={placeholder}
          type="number"
          step="0.01"
          min="0"
        />
        <span className="absolute right-5">{currency}</span>
      </div>
      {multiselect && (
        <ul className="flex items-center mt-4 rounded-lg border border-input text-input text-center">
          {amountFractions.map((item, i) => {
            return (
              <li
                className={
                  'cursor-pointer py-1 border-input hover:bg-input hover:bg-opacity-50 transition delay-900 ease-in-out ' +
                  (i === amountFractions.length - 1 ? '' : 'border-r')
                }
                key={item * 100}
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
