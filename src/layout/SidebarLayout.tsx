import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { useState } from 'react';
import {
  DashboardIcon,
  StoreIcon,
  ProductIcon,
  CartIcon,
  SettingIcon,
} from '../components/svg-icons';

const navItems = [
  {
    label: 'Dashboard Overview',
    path: '/dashboard',
    icon: DashboardIcon,
  },
  {
    label: 'Merchants',
    path: '/merchants',
    icon: StoreIcon,
  },
  {
    label: 'Product Catalog',
    path: '/product',
    icon: ProductIcon,
  },
  {
    label: 'Orders',
    path: '/order',
    icon: CartIcon,
  },
  {
    label: 'System Settings',
    path: 'settings',
    icon: SettingIcon,
  },
];

export default function SidebarLayout() {
  const [isOpen, setIsOpen] = useState(false);

  const toogle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='bg-[#EAEAEA]'>
      <div className='border-b px-4 py-4 border-gray-400 flex items-center justify-between'>
        <div className='flex gap-2 items-center'>
          <div className='aspect-square size-6 rounded-full bg-blue-900 text-white p-1'>
            <TruckIcon />
          </div>
          <div>
            <div className='font-medium text-[10px]'>Delivery</div>
            <div className='text-[10px] text-gray-500'>Admin Portal</div>
          </div>
        </div>

        <button onClick={toogle} className='size-4'>
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
            <path
              fill='currentColor'
              d='M4 18q-.425 0-.712-.288T3 17t.288-.712T4 16h16q.425 0 .713.288T21 17t-.288.713T20 18zm0-5q-.425 0-.712-.288T3 12t.288-.712T4 11h16q.425 0 .713.288T21 12t-.288.713T20 13zm0-5q-.425 0-.712-.288T3 7t.288-.712T4 6h16q.425 0 .713.288T21 7t-.288.713T20 8z'
            ></path>
          </svg>
        </button>
      </div>

      <Sidebar isOpen={isOpen} toogle={toogle} />
      <Outlet />
    </div>
  );
}

export function Sidebar({ isOpen, toogle }: { isOpen: boolean; toogle: () => void }) {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div
      className={`inset-0 bg-neutral-900/80 fixed ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'} transition-opacity duration-200`}
    >
      <div className='absolute inset-y-0 right-0 w-65 bg-[#EAEAEA]  flex flex-col'>
        <button
          onClick={toogle}
          className='border-2 text-gray-500 absolute right-2 top-2 rounded-full size-5 p-0.5 border-gray-400'
        >
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'>
            <path
              fill='currentColor'
              d='M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94z'
            ></path>
          </svg>
        </button>
        <div className='flex gap-2 items-center mb-8 px-2 pt-4'>
          <div className='aspect-square size-7 rounded-full bg-blue-900 text-white p-1'>
            <TruckIcon />
          </div>
          <div>
            <div className='font-medium text-sm text-gray-600'>Delivery</div>
          </div>
        </div>

        <div className='space-y-2.5 border-b-[0.5px] border-b-gray-500 flex-1 px-2'>
          {navItems.map((item) => {
            const isActive =
              currentPath === item.path || (currentPath === '/' && item.path === '/dashboard');
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={toogle}
                className={`flex items-center gap-2 px-2 py-1 rounded-md ${isActive && 'bg-gray-300'}`}
              >
                <div className={`size-5  ${isActive ? 'text-blue-700' : 'text-neutral-700'}`}>
                  <item.icon />
                </div>
                <span
                  className={`text-xs font-thin ${isActive ? 'text-neutral-800' : 'text-neutral-700'}`}
                >
                  {item.label}
                </span>
              </NavLink>
            );
          })}
        </div>

        <div className='px-4 pt-4 pb-6'>
          <div className='font-light text-xs text-neutral-400'>Sign in as</div>
          <div className='text-xs text-neutral-700 mb-4'>example@gmail.com</div>

          <NavLink to={'/auth'} className='flex items-center text-neutral-600 text-sm gap-1'>
            <div className='size-5'>
              <ExitIcon />
            </div>
            Sign Out
          </NavLink>
        </div>
      </div>
    </div>
  );
}

function TruckIcon() {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
      <g fill='none'>
        <path d='m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z'></path>
        <path
          fill='currentColor'
          d='M15 4a2 2 0 0 1 2 2v1h1.52a2 2 0 0 1 1.561.75l1.48 1.851a2 2 0 0 1 .439 1.25V15a2 2 0 0 1-2 2a3 3 0 1 1-6 0h-4a3 3 0 1 1-6 0a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zM7 16a1 1 0 1 0 0 2a1 1 0 0 0 0-2m10 0a1 1 0 1 0 0 2a1 1 0 0 0 0-2M15 6H4v9h.764a2.997 2.997 0 0 1 4.341-.138l.131.138h5.528l.115-.121l.121-.115zm3.52 3H17v5c.82 0 1.563.33 2.105.862l.131.138H20v-4.15z'
        ></path>
      </g>
    </svg>
  );
}

function ExitIcon() {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
      <path
        fill='currentColor'
        d='M5.616 20q-.691 0-1.153-.462T4 18.384V5.616q0-.691.463-1.153T5.616 4h6.403v1H5.616q-.231 0-.424.192T5 5.616v12.769q0 .23.192.423t.423.192h6.404v1zm10.846-4.461l-.702-.72l2.319-2.319H9.192v-1h8.887l-2.32-2.32l.702-.718L20 12z'
      ></path>
    </svg>
  );
}
