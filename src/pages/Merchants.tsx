import {
  PlusIcon,
  SearchIcon,
  CloseIcon,
  DotsVerticalIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  StoreIcon,
} from '../components/svg-icons';
import { useState, useMemo, useEffect } from 'react';
import { useFetch } from '../hooks/useFetch';
import { useMutation } from '../hooks/useMutation';
import { toast } from 'sonner';

interface Merchant {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
}

function MerchantsLoadingBody() {
  return (
    <>
      {Array.from({ length: 5 }).map((_, i) => (
        <tr key={i} className='animate-pulse'>
          <td className='px-2 py-3'>
            <div className='h-4 bg-gray-200 rounded w-3/4' />
          </td>
          <td className='px-2 py-3'>
            <div className='h-4 bg-gray-200 rounded w-32' />
          </td>
          <td className='px-2 py-3'>
            <div className='h-4 bg-gray-200 rounded w-24' />
          </td>
          <td className='px-2 py-3'>
            <div className='h-4 bg-gray-200 rounded w-28' />
          </td>
          <td className='px-2 py-3'>
            <div className='h-6 bg-gray-200 rounded w-6 mx-auto' />
          </td>
        </tr>
      ))}
    </>
  );
}

function MerchantsErrorBody({ error }: { error: Error }) {
  return (
    <tr>
      <td colSpan={5} className='px-2 py-10 text-center'>
        <p className='text-sm font-medium text-neutral-700'>Failed to load merchants</p>
        <p className='text-xs text-gray-400 mt-1'>{error.message}</p>
      </td>
    </tr>
  );
}

export default function Merchants() {
  const [searchValue, setSearchValue] = useState('');
  const [openAddModal, setOpenAddModal] = useState(false);
  const [viewMerchant, setViewMerchant] = useState<Merchant | null>(null);
  const [editMerchant, setEditMerchant] = useState<Merchant | null>(null);
  const [deleteMerchant, setDeleteMerchant] = useState<Merchant | null>(null);
  const [menuState, setMenuState] = useState<{ id: number; top: number; right: number } | null>(
    null,
  );
  const [localMerchants, setLocalMerchants] = useState<Merchant[] | null>(null);

  useEffect(() => {
    if (!menuState) return;
    const close = () => setMenuState(null);
    window.addEventListener('scroll', close, true);
    return () => window.removeEventListener('scroll', close, true);
  }, [menuState]);

  const {
    data: merchantsData,
    loading: merchantsListLoading,
    error: merchantsListError,
  } = useFetch<Merchant[]>('https://dapdash.onrender.com/api/merchants/all');

  useEffect(() => {
    if (merchantsData) setLocalMerchants(merchantsData);
  }, [merchantsData]);

  const filteredMerchants = useMemo(() => {
    if (!localMerchants) return null;
    if (!searchValue) return localMerchants;
    return localMerchants.filter((m) => m.name.toLowerCase().includes(searchValue.toLowerCase()));
  }, [searchValue, localMerchants]);

  const handleAdd = (merchant: Merchant) =>
    setLocalMerchants((prev) => [...(prev ?? []), merchant]);

  const handleEdit = (merchant: Merchant) =>
    setLocalMerchants((prev) => prev?.map((m) => (m.id === merchant.id ? merchant : m)) ?? null);

  const handleDelete = (id: number) =>
    setLocalMerchants((prev) => prev?.filter((m) => m.id !== id) ?? null);

  return (
    <>
      {openAddModal && <AddMerchantModal close={() => setOpenAddModal(false)} onAdd={handleAdd} />}
      {viewMerchant && (
        <ViewMerchantModal merchant={viewMerchant} close={() => setViewMerchant(null)} />
      )}
      {editMerchant && (
        <EditMerchantModal
          merchant={editMerchant}
          close={() => setEditMerchant(null)}
          onEdit={handleEdit}
        />
      )}
      {deleteMerchant && (
        <DeleteMerchantModal
          merchant={deleteMerchant}
          close={() => setDeleteMerchant(null)}
          onDelete={handleDelete}
        />
      )}
      {menuState && (
        <>
          <div className='fixed inset-0 z-10' onClick={() => setMenuState(null)} />
          <div
            className='fixed w-36 bg-white rounded-lg border border-gray-200 shadow-md z-20 py-1 overflow-hidden'
            style={{ top: menuState.top, right: menuState.right }}
          >
            <button
              onClick={() => {
                const m = localMerchants?.find((m) => m.id === menuState.id);
                if (m) setViewMerchant(m);
                setMenuState(null);
              }}
              className='w-full flex items-center gap-2 px-3 py-2 text-sm text-neutral-700 hover:bg-gray-50'
            >
              <EyeIcon className='size-4 text-indigo-500' />
              View
            </button>
            <button
              onClick={() => {
                const m = localMerchants?.find((m) => m.id === menuState.id);
                if (m) setEditMerchant(m);
                setMenuState(null);
              }}
              className='w-full flex items-center gap-2 px-3 py-2 text-sm text-neutral-700 hover:bg-gray-50'
            >
              <PencilIcon className='size-4 text-neutral-500' />
              Edit
            </button>
            <div className='border-t border-gray-100 my-1' />
            <button
              onClick={() => {
                const m = localMerchants?.find((m) => m.id === menuState.id);
                if (m) setDeleteMerchant(m);
                setMenuState(null);
              }}
              className='w-full flex items-center gap-2 px-3 py-2 text-sm text-red-500 hover:bg-red-50'
            >
              <TrashIcon className='size-4' />
              Delete
            </button>
          </div>
        </>
      )}

      <div className='bg-[#EAEAEA] min-h-screen px-4 py-4'>
        <div>
          <div className='mb-4'>
            <div className='text-xl font-medium mb-1'>Merchants</div>
            <div className='text-gray-400 text-xs'>Manage registered merchant partners</div>
          </div>
        </div>

        <div className='space-y-4'>
          <button
            onClick={() => setOpenAddModal(true)}
            className='btn min-h-11 px-4 py-2 rounded-md bg-indigo-600 w-full text-white hover:opacity-80 text-sm'
          >
            <PlusIcon className='size-5' />
            Add New Merchant
          </button>

          <div className='group border border-gray-400 focus-within:border-indigo-400 rounded-md shadow-sm outline-indigo-400 py-1.5 w-full px-2 flex flex-row-reverse items-center gap-1'>
            <input
              onChange={(e) => setSearchValue(e.target.value)}
              type='text'
              placeholder='Search a merchant name'
              className='outline-none bg-transparent flex-1 text-base peer'
            />
            <SearchIcon className='size-4 peer-focus:text-indigo-400 transition-colors text-gray-400' />
          </div>

          <div className='rounded-lg border border-gray-400/70 overflow-hidden'>
            <div className='overflow-x-auto'>
              <table className='w-full border-separate border-spacing-0 min-w-112.5'>
                <thead>
                  <tr>
                    <th className='px-2 py-3 text-left text-sm font-medium text-gray-500 border-b border-gray-200 whitespace-normal w-full'>
                      Merchant Name
                    </th>
                    <th className='px-2 py-3 text-left text-sm font-medium text-gray-500 border-b border-gray-200 whitespace-nowrap w-40'>
                      Email
                    </th>
                    <th className='px-2 py-3 text-left text-sm font-medium text-gray-500 border-b border-gray-200 whitespace-nowrap w-32'>
                      Phone
                    </th>
                    <th className='px-2 py-3 text-left text-sm font-medium text-gray-500 border-b border-gray-200 whitespace-normal w-40'>
                      Address
                    </th>
                    <th className='px-2 py-3 border-b border-gray-200 w-10' />
                  </tr>
                </thead>
                <tbody>
                  {merchantsListLoading ? (
                    <MerchantsLoadingBody />
                  ) : merchantsListError ? (
                    <MerchantsErrorBody error={merchantsListError} />
                  ) : (
                    filteredMerchants?.map((merchant) => (
                      <tr className='hover:bg-gray-50' key={merchant.id}>
                        <td className='px-2 py-3 text-sm text-neutral-700'>{merchant.name}</td>
                        <td className='px-2 py-3 text-sm text-neutral-700'>{merchant.email}</td>
                        <td className='px-2 py-3 text-sm text-neutral-700'>{merchant.phone}</td>
                        <td className='px-2 py-3 text-sm text-neutral-700'>{merchant.address}</td>
                        <td className='px-2 py-3'>
                          <button
                            onClick={(e) => {
                              if (menuState?.id === merchant.id) {
                                setMenuState(null);
                              } else {
                                const rect = e.currentTarget.getBoundingClientRect();
                                setMenuState({
                                  id: merchant.id,
                                  top: rect.bottom + 4,
                                  right: window.innerWidth - rect.right,
                                });
                              }
                            }}
                            className='flex items-center justify-center size-8 rounded-md hover:bg-gray-100 text-gray-500'
                          >
                            <DotsVerticalIcon className='size-5' />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// ──────────────────────────────────────────
// Add Modal
// ──────────────────────────────────────────

function AddMerchantModal({
  close,
  onAdd,
}: {
  close: () => void;
  onAdd: (merchant: Merchant) => void;
}) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '' });
  const { mutate, loading, error } = useMutation<Merchant>();

  useEffect(() => {
    if (error) toast.error(error.message);
  }, [error]);

  const handleChange = (key: string, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await mutate('POST', 'https://dapdash.onrender.com/api/merchants/add', form);
    if (result !== undefined) {
      toast.success('Merchant added successfully');
      onAdd(result);
      close();
    }
  };

  const isDisabled = !form.name || !form.email || !form.phone || !form.address || loading;

  return (
    <div className='inset-0 bg-[#EAEAEA] fixed z-50 overflow-y-auto'>
      <button
        type='button'
        onClick={close}
        className='absolute right-3 top-3 size-8 flex items-center justify-center rounded-full hover:bg-black/10 text-white z-10'
      >
        <CloseIcon className='size-4' />
      </button>

      <div className='bg-indigo-600 px-4 pt-10 pb-6 flex flex-col items-center gap-2 text-white'>
        <div className='size-12 bg-white/20 rounded-full flex items-center justify-center mb-1'>
          <PlusIcon className='size-6' />
        </div>
        <span className='font-semibold text-base'>Add New Merchant</span>
        <span className='text-xs text-indigo-200 text-center'>
          Fill in the details to register a new merchant partner
        </span>
      </div>

      <div className='px-4 py-5'>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div className='field'>
            <label className='label text-neutral-700' htmlFor='add-name'>
              Merchant Name
            </label>
            <input
              id='add-name'
              type='text'
              autoComplete='off'
              placeholder='Enter merchant name'
              value={form.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className='input w-full min-h-11 px-3 py-2 text-sm border border-gray-300 focus:ring-indigo-400 focus:border-indigo-400'
            />
          </div>

          <div className='field'>
            <label className='label text-neutral-700' htmlFor='add-email'>
              Email
            </label>
            <input
              id='add-email'
              type='email'
              autoComplete='off'
              placeholder='Enter email address'
              value={form.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className='input w-full min-h-11 px-3 py-2 text-sm border border-gray-300 focus:ring-indigo-400 focus:border-indigo-400'
            />
          </div>

          <div className='field'>
            <label className='label text-neutral-700' htmlFor='add-phone'>
              Phone
            </label>
            <input
              id='add-phone'
              type='text'
              autoComplete='off'
              placeholder='Enter phone number'
              value={form.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              className='input w-full min-h-11 px-3 py-2 text-sm border border-gray-300 focus:ring-indigo-400 focus:border-indigo-400'
            />
          </div>

          <div className='field'>
            <label className='label text-neutral-700' htmlFor='add-address'>
              Address
            </label>
            <input
              id='add-address'
              type='text'
              autoComplete='off'
              placeholder='Enter address'
              value={form.address}
              onChange={(e) => handleChange('address', e.target.value)}
              className='input w-full min-h-11 px-3 py-2 text-sm border border-gray-300 focus:ring-indigo-400 focus:border-indigo-400'
            />
          </div>

          <div className='flex gap-3 pt-2'>
            <button
              type='button'
              onClick={close}
              className='btn min-h-11 w-full border border-gray-400 text-neutral-600 px-4 py-2 text-sm hover:opacity-80'
            >
              Cancel
            </button>
            <button
              type='submit'
              disabled={isDisabled}
              className='btn min-h-11 w-full bg-indigo-600 text-white px-4 py-2 text-sm hover:opacity-80 disabled:opacity-40'
            >
              {loading ? 'Adding…' : 'Add Merchant'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className='px-4 py-3'>
      <p className='text-xs text-gray-400 mb-0.5'>{label}</p>
      <p className='text-sm text-neutral-700 font-medium break-all'>{value}</p>
    </div>
  );
}

function ViewMerchantModal({ merchant, close }: { merchant: Merchant; close: () => void }) {
  return (
    <div className='inset-0 bg-[#EAEAEA] fixed z-50 overflow-y-auto'>
      <button
        type='button'
        onClick={close}
        className='absolute right-3 top-3 size-8 flex items-center justify-center rounded-full hover:bg-black/10 text-white z-10'
      >
        <CloseIcon className='size-4' />
      </button>

      <div className='bg-indigo-600 px-4 pt-10 pb-8 flex flex-col items-center gap-2 text-white'>
        <div className='size-16 bg-white/20 rounded-full flex items-center justify-center mb-1'>
          <StoreIcon className='size-8' />
        </div>
        <span className='font-semibold text-lg text-center'>{merchant.name}</span>
        <span className='badge bg-indigo-500 text-indigo-100 px-2.5 py-0.5 text-xs'>
          Merchant Partner
        </span>
      </div>

      <div className='px-4 py-5 space-y-3'>
        <div className='bg-white rounded-xl border border-gray-200 overflow-hidden divide-y divide-gray-100'>
          <DetailRow label='Email' value={merchant.email} />
          <DetailRow label='Phone' value={merchant.phone} />
          <DetailRow label='Address' value={merchant.address} />
        </div>

        <button
          onClick={close}
          className='btn min-h-11 w-full border border-gray-400 text-neutral-600 px-4 py-2 text-sm hover:opacity-80'
        >
          Close
        </button>
      </div>
    </div>
  );
}

function EditMerchantModal({
  merchant,
  close,
  onEdit,
}: {
  merchant: Merchant;
  close: () => void;
  onEdit: (merchant: Merchant) => void;
}) {
  const [form, setForm] = useState({
    name: merchant.name,
    email: merchant.email,
    phone: merchant.phone,
    address: merchant.address,
  });
  const { mutate, loading, error } = useMutation<Merchant>();

  useEffect(() => {
    if (error) toast.error(error.message);
  }, [error]);

  const handleChange = (key: string, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await mutate(
      'PUT',
      `https://dapdash.onrender.com/api/merchants/update/${merchant.id}`,
      form,
    );
    if (result !== undefined) {
      toast.success('Merchant updated successfully');
      onEdit(result);
      close();
    }
  };

  const isDisabled = !form.name || !form.email || !form.phone || !form.address || loading;

  return (
    <div className='inset-0 bg-[#EAEAEA] fixed z-50 overflow-y-auto'>
      <button
        type='button'
        onClick={close}
        className='absolute right-3 top-3 size-8 flex items-center justify-center rounded-full hover:bg-black/10 text-white z-10'
      >
        <CloseIcon className='size-4' />
      </button>

      <div className='bg-indigo-600 px-4 pt-10 pb-6 flex flex-col items-center gap-2 text-white'>
        <div className='size-12 bg-white/20 rounded-full flex items-center justify-center mb-1'>
          <PencilIcon className='size-6' />
        </div>
        <span className='font-semibold text-base'>Edit Merchant</span>
        <span className='text-xs text-indigo-200 text-center'>
          Update the details for <span className='font-semibold text-white'>{merchant.name}</span>
        </span>
      </div>

      <div className='px-4 py-5'>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div className='field'>
            <label className='label text-neutral-700' htmlFor='edit-name'>
              Merchant Name
            </label>
            <input
              id='edit-name'
              type='text'
              autoComplete='off'
              value={form.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className='input w-full min-h-11 px-3 py-2 text-sm border border-gray-300 focus:ring-indigo-400 focus:border-indigo-400'
            />
          </div>

          <div className='field'>
            <label className='label text-neutral-700' htmlFor='edit-email'>
              Email
            </label>
            <input
              id='edit-email'
              type='email'
              autoComplete='off'
              value={form.email}
              onChange={(e) => handleChange('email', e.target.value)}
              className='input w-full min-h-11 px-3 py-2 text-sm border border-gray-300 focus:ring-indigo-400 focus:border-indigo-400'
            />
          </div>

          <div className='field'>
            <label className='label text-neutral-700' htmlFor='edit-phone'>
              Phone
            </label>
            <input
              id='edit-phone'
              type='text'
              autoComplete='off'
              value={form.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              className='input w-full min-h-11 px-3 py-2 text-sm border border-gray-300 focus:ring-indigo-400 focus:border-indigo-400'
            />
          </div>

          <div className='field'>
            <label className='label text-neutral-700' htmlFor='edit-address'>
              Address
            </label>
            <input
              id='edit-address'
              type='text'
              autoComplete='off'
              value={form.address}
              onChange={(e) => handleChange('address', e.target.value)}
              className='input w-full min-h-11 px-3 py-2 text-sm border border-gray-300 focus:ring-indigo-400 focus:border-indigo-400'
            />
          </div>

          <div className='flex gap-3 pt-2'>
            <button
              type='button'
              onClick={close}
              className='btn min-h-11 w-full border border-gray-400 text-neutral-600 px-4 py-2 text-sm hover:opacity-80'
            >
              Cancel
            </button>
            <button
              type='submit'
              disabled={isDisabled}
              className='btn min-h-11 w-full bg-indigo-600 text-white px-4 py-2 text-sm hover:opacity-80 disabled:opacity-40'
            >
              {loading ? 'Saving…' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function DeleteMerchantModal({
  merchant,
  close,
  onDelete,
}: {
  merchant: Merchant;
  close: () => void;
  onDelete: (id: number) => void;
}) {
  const { mutate, loading, error } = useMutation<{ message: string }>();

  useEffect(() => {
    if (error) toast.error(error.message);
  }, [error]);

  const handleDelete = async () => {
    const result = await mutate(
      'DELETE',
      `https://dapdash.onrender.com/api/merchants/delete/${merchant.id}`,
    );
    if (result !== undefined) {
      toast.success('Merchant deleted successfully');
      onDelete(merchant.id);
      close();
    }
  };

  return (
    <div className='fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4'>
      <div className='bg-white rounded-2xl shadow-xl w-full max-w-sm overflow-hidden'>
        <div className='bg-red-50 px-6 pt-8 pb-6 flex flex-col items-center gap-3'>
          <div className='size-16 bg-red-100 rounded-full flex items-center justify-center'>
            <TrashIcon className='size-8 text-red-500' />
          </div>
          <span className='font-semibold text-base text-neutral-700'>Delete Merchant</span>
          <p className='text-sm text-neutral-500 text-center'>
            Are you sure you want to delete{' '}
            <span className='font-medium text-neutral-700'>"{merchant.name}"</span>? This action
            cannot be undone.
          </p>
        </div>
        <div className='px-4 py-4 flex gap-3'>
          <button
            type='button'
            onClick={close}
            disabled={loading}
            className='btn min-h-11 w-full border border-gray-300 text-neutral-600 px-4 py-2 text-sm hover:opacity-80'
          >
            Cancel
          </button>
          <button
            type='button'
            onClick={handleDelete}
            disabled={loading}
            className='btn min-h-11 w-full bg-red-500 text-white px-4 py-2 text-sm hover:opacity-80'
          >
            {loading ? 'Deleting…' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
}
