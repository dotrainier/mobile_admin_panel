import { PlusIcon, SearchIcon } from '../components/svg-icons';
import { useState, useMemo } from 'react';

const initialData = [
  {
    id: 1,
    name: 'Green Bowl Kitchen',
    category: 'Healthy',
    distance: '2.5',
    active: true,
  },
  {
    id: 2,
    name: 'Corner Market',
    category: 'Groceries',
    distance: '1.8',
    active: true,
  },
  {
    id: 3,
    name: 'Spice Route Express',
    category: 'Asian',
    distance: '3.2',
    active: true,
  },

  {
    id: 5,
    name: 'Burger Haven',
    category: 'Fast Food',
    distance: '4',
    active: true,
  },

  {
    id: 6,
    name: 'Daily Fresh Mart',
    category: 'Groceries',
    distance: '1.2',
    active: true,
  },
];

const categoryColors: Record<string, string> = {
  Healthy: 'bg-green-100/90 text-green-400',
  Groceries: 'bg-orange-100/9 text-orange-400',
  Asian: 'bg-red-100/90 text-red-400',
  'Fast Food': 'bg-orange-100/90 text-orange-400',
};

interface Merchant {
  id: number;
  name: string;
  category: string;
  distance: string;
  active: boolean;
}

export default function Merchants() {
  const [searchValue, setSearchValue] = useState('');
  const [openAddModal, setOpenAddModal] = useState(false);
  const [merchantsData, setMerchantsData] = useState<Merchant[]>(initialData);

  const merchants = useMemo(() => {
    if (!searchValue) return merchantsData;

    return merchantsData.filter((m) => m.name.toLowerCase().includes(searchValue.toLowerCase()));
  }, [searchValue, merchantsData]);

  const addMerchant = (newMerchant: Merchant) => {
    setMerchantsData((prev) => [...prev, newMerchant]);
  };

  const currentLength = merchantsData.length;

  return (
    <>
      {openAddModal && (
        <AddMerchant
          close={() => setOpenAddModal(false)}
          onAdd={addMerchant}
          currentLength={currentLength}
        />
      )}
      <div className='bg-[#EAEAEA] min-h-screen px-4 py-4'>
        <div>
          <div className='mb-4'>
            <div className='text-xl font-medium mb-1'>Merchants</div>
            <div className='text-gray-400 text-xs'>Manage registered merchant partners</div>
          </div>
        </div>

        <div className='space-y-4 '>
          <button
            onClick={() => setOpenAddModal(true)}
            className='px-4 py-2 rounded-md bg-indigo-600 w-full text-white hover:opacity-80 flex items-center justify-center text-sm'
          >
            <div className='size-5'>
              <PlusIcon />
            </div>
            Add New Merchant
          </button>

          <div className='group border border-gray-400 focus-within:border-indigo-400 rounded-md shadow-sm outline-indigo-400  py-1.5 w-full px-2 flex flex-row-reverse items-center gap-1'>
            <input
              onChange={(e) => setSearchValue(e.target.value)}
              type='text'
              className='outline-none bg-transparent flex-1 text-base peer'
            />
            <div className='size-4 peer-focus-within:text-indigo-400 transition-colors text-gray-400'>
              <SearchIcon />
            </div>
          </div>

          <div className='rounded-lg border border-gray-400/70 overflow-hidden'>
            <div className='overflow-x-auto'>
              <table className='w-full border-separate border-spacing-0 min-w-[450px]'>
                <thead>
                  <tr>
                    <th className='px-2 py-3 text-left text-sm font-medium text-gray-500 border-b border-gray-200 whitespace-normal w-full'>
                      Merchant Name
                    </th>
                    <th className='px-2 py-3 text-left text-sm font-medium text-gray-500 border-b border-gray-200 whitespace-normal w-32'>
                      Category
                    </th>
                    <th className='px-2 py-3 text-left text-sm font-medium text-gray-500 border-b border-gray-200 whitespace-nowrap w-32'>
                      Distance (km)
                    </th>
                    <th className='px-2 py-3 text-left text-sm font-medium text-gray-500 border-b border-gray-200 whitespace-normal w-32'>
                      Active
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {merchants.map((merchant) => (
                    <tr className='hover:bg-gray-50' key={merchant.name}>
                      <td className='px-2 py-3 text-sm text-neutral-700'>{merchant.name}</td>
                      <td className='px-2 py-3 text-sm'>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-light ${
                            categoryColors[merchant.category] ?? 'bg-gray-100 text-gray-700'
                          }`}
                        >
                          {merchant.category}
                        </span>
                      </td>
                      <td className='px-2 py-3 text-sm text-neutral-700'>2.5 km</td>
                      <td>
                        <Toggle defaultChecked={merchant.active} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function AddMerchant({
  close,
  onAdd,
  currentLength,
}: {
  close: () => void;
  onAdd: (merchant: Merchant) => void;
  currentLength: number;
}) {
  const [merchantValue, setMerchantValue] = useState<{
    name: string;
    category: string;
    distance: string;
  }>({
    name: '',
    category: '',
    distance: '',
  });

  const [statusActive, setStatusActive] = useState(false);

  const handleValueChange = (key: string, value: string) => {
    setMerchantValue({
      ...merchantValue,
      [key]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      id: currentLength + 1,
      name: merchantValue.name,
      category: merchantValue.category,
      distance: merchantValue.distance,
      active: statusActive,
    });

    close();
  };

  const isDisable = !merchantValue.name || !merchantValue.category || !merchantValue.distance;

  return (
    <div className='inset-0 bg-[#EAEAEA] fixed z-50'>
      <div className='size-4 absolute right-2 top-2 text-gray-700' onClick={close}>
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'>
          <path
            fill='currentColor'
            d='M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94z'
          ></path>
        </svg>
      </div>

      <div className='flex justify-center items-center px-2 py-4 flex-col border-b border-b-gray-400 mb-6'>
        <span className='font-medium text-base text-neutral-700'>Add New Merchant</span>
        <span className='text-center text-xs text-neutral-500'>
          Fill in the detail to register a new merchant partner
        </span>
      </div>

      <div className='px-4 py-4'>
        <form className='space-y-4 mb-4'>
          <div className='flex flex-col'>
            <label htmlFor='name' className='text-sm mb-1 text-neutral-700'>
              Merchant Name
            </label>
            <input
              onChange={(e) => handleValueChange('name', e.target.value)}
              type='text'
              id='name'
              name='name'
              placeholder='Enter your merchant'
              className='w-full border-2 rounded-md border-gray-300 px-4 py-1 text-sm outline-indigo-400'
              autoComplete='off'
            />
          </div>

          <div>
            <label htmlFor='category' className='text-sm mb-1 text-neutral-700'>
              Category
            </label>
            <input
              type='text'
              id='category'
              name='category'
              placeholder='Enter your category'
              className='w-full border-2 rounded-md border-gray-300 px-4 py-1 text-sm outline-indigo-400'
              onChange={(e) => handleValueChange('category', e.target.value)}
              autoComplete='off'
            />
          </div>

          <div>
            <label htmlFor='distance' className='text-sm mb-1 text-neutral-700'>
              Distance (km)
            </label>
            <input
              type='text'
              id='distance'
              name='distance'
              placeholder='Enter your distance'
              className='w-full border-2 rounded-md border-gray-300 px-4 py-1 text-sm outline-indigo-400'
              onChange={(e) => handleValueChange('distance', e.target.value)}
              autoComplete='off'
            />
          </div>

          <Toggle onChange={() => setStatusActive(!statusActive)} label='Active from start' />

          <div className='flex gap-4 mt-8'>
            <button
              type='button'
              className='px-4 py-2 rounded-md border border-gray-400 w-full text-neutral-600 hover:opacity-80'
            >
              Cancel
            </button>
            <button
              type='submit'
              disabled={isDisable}
              onClick={handleSubmit}
              className='px-4 py-2 rounded-md bg-blue-900 w-full text-white hover:opacity-80 disabled:opacity-40'
            >
              Add Merchant
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

type Props = {
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
};

function Toggle({ defaultChecked = false, onChange, label }: Props) {
  const [enabled, setEnabled] = useState(defaultChecked);

  return (
    <label className='flex items-center gap-2 cursor-pointer'>
      <button
        type='button'
        onClick={() => {
          const next = !enabled;
          setEnabled(next);
          onChange?.(next);
        }}
        className={`relative inline-flex items-center w-9 h-5 rounded-full transition-colors duration-300
          ${enabled ? 'bg-indigo-600' : 'bg-gray-300'}`}
      >
        <span
          className={`inline-block w-3.5 h-3.5 bg-white rounded-full shadow transition-transform duration-300
            ${enabled ? 'translate-x-5' : 'translate-x-0.5'}`}
        />
      </button>

      {label && <span className='text-sm text-gray-700'>{label}</span>}
    </label>
  );
}
