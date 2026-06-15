type Props = {
  checked: boolean;
  onChange: () => void;
  label?: string;
};

function CircleCheckbox({ checked, onChange, label }: Props) {
  return (
    <label className='flex items-center gap-2 cursor-pointer'>
      <div
        onClick={onChange}
        className={`size-3 rounded-full border-2 flex items-center justify-center transition-all
          ${checked ? 'bg-blue-600 border-blue-600' : 'bg-white border-gray-400'}`}
      >
        {checked && (
          <svg
            className='w-3 h-3 text-white'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            strokeWidth={3}
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M5 13l4 4L19 7' />
          </svg>
        )}
      </div>
      {label && <span className='text-xs text-gray-700'>{label}</span>}
    </label>
  );
}

export default CircleCheckbox;
