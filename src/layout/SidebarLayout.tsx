import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { useState } from 'react';
import {
  DashboardIcon,
  StoreIcon,
  ProductIcon,
  CartIcon,
  SettingIcon,
  ExitIcon,
  MenuIcon,
  CloseIcon,
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
          <img src='/icon.svg' alt='logo' className='size-6 rounded-full' />
          <div>
            <div className='font-medium text-[10px]'>Delivery</div>
            <div className='text-[10px] text-gray-500'>Admin Portal</div>
          </div>
        </div>

        <button onClick={toogle}>
          <MenuIcon className='size-4' />
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
      className={`inset-0 bg-neutral-900/80 z-50 fixed ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'} transition-opacity duration-200`}
    >
      <div className='absolute inset-y-0 right-0 w-65 bg-[#EAEAEA] flex flex-col'>
        <button
          onClick={toogle}
          className='border-2 text-gray-500 absolute right-2 top-2 rounded-full size-5 p-0.5 border-gray-400'
        >
          <CloseIcon className='size-full' />
        </button>
        <div className='flex gap-2 items-center mb-8 px-2 pt-4'>
          <img src='/icon.svg' alt='logo' className='size-7 rounded-full' />
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
                <item.icon
                  className={`size-5 ${isActive ? 'text-blue-700' : 'text-neutral-700'}`}
                />
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
            <ExitIcon className='size-5' />
            Sign Out
          </NavLink>
        </div>
      </div>
    </div>
  );
}
