interface RadioOption {
  id: string;
  icon?: string;
  label: string;
}

interface RadioButtonsProps {
  options: RadioOption[];
  onChange: Function;
  value: string;
}

function RadioButtons({ options, onChange, value }: RadioButtonsProps) {
  return (
    <div className="inline-flex flex-col w-60 md:w-80">
      <ul className="flex items-center rounded-lg border border-input text-center">
        {options.map((item, i) => {
          return (
            <li
              onClick={() => onChange(item.id)}
              className={
                'flex items-center justify-center flex-1 cursor-pointer py-2 border-input hover:bg-input hover:bg-opacity-50 transition delay-900 ease-in-out ' +
                (i === options.length - 1 ? '' : 'border-r') +
                (value === item.id ? ' bg-input bg-opacity-50' : '')
              }
              key={i}
            >
              {item.icon && (
                <img className="mr-1.5" src={item.icon} alt={item.label} />
              )}
              {item.label}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default RadioButtons;
