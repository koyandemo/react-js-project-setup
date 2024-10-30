type Props = {
    label?: string;
    checked: boolean;
    callBack: (value: boolean) => void;
  };
  
  const ToggleChecked = ({ label, checked, callBack }: Props) => {
    return (
      <div className="inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={checked}
          className="sr-only peer"
          name={label}
          id={label}
        />
        <div
          onClick={() => {
            callBack(!checked);
          }}
          className="relative w-11 h-6 bg-[#6D3DF5] peer-focus:outline-none   rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-primary"
        ></div>
        {label && (
          <label htmlFor={label} className="ms-2 text-sm font-semibold">
            {label}
          </label>
        )}
      </div>
    );
  };
  
  export default ToggleChecked;
  