import { StoreIcon, ProductIcon, CartIcon } from '../components/svg-icons';

export default function Dashboard() {
  return (
    <>
      <div className='bg-[#EAEAEA] min-h-screen px-4 py-4'>
        <div>
          <div className='mb-4'>
            <div className='text-xl font-medium mb-1'>Dashboard Overview</div>
            <div className='text-gray-400 text-xs'>Welcome back to your delivery admin panel</div>
          </div>

          <div className='space-y-4'>
            <div className='border border-gray-300 shadow-sm flex justify-between items-center p-4 rounded-md'>
              <div>
                <div className='text-xs text-gray-500'>Total Merchants</div>
                <div className='text-base font-medium'>5</div>
              </div>

              <div className='size-8 bg-gray-300 p-1.5 text-violet-600 rounded-md'>
                <StoreIcon className='size-full' />
              </div>
            </div>

            <div className='border border-gray-300 shadow-sm flex justify-between items-center p-4 rounded-md'>
              <div>
                <div className='text-xs text-gray-500'>Total Products</div>
                <div className='text-base font-medium'>12</div>
              </div>

              <div className='size-8 bg-blue-100 p-1.5 text-blue-500 rounded-md'>
                <ProductIcon className='size-full' />
              </div>
            </div>

            <div className='border border-gray-300 shadow-sm flex justify-between items-center p-4 rounded-md'>
              <div>
                <div className='text-xs text-gray-500'>Total Orders</div>
                <div className='text-base font-medium'>8</div>
              </div>

              <div className='size-8 bg-green-50 p-1.5 text-green-700 rounded-md'>
                <CartIcon className='size-full' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
