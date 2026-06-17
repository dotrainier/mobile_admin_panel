interface IconProps {
  className?: string;
}

export function StoreIcon({ className = 'size-4' }: IconProps) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 36 36' className={className}>
      <path
        fill='currentColor'
        d='M28 30H16v-8h-2v8H8v-8H6v8a2 2 0 0 0 2 2h20a2 2 0 0 0 2-2v-8h-2Z'
        className='clr-i-outline clr-i-outline-path-1'
      ></path>
      <path
        fill='currentColor'
        d='m33.79 13.27l-4.08-8.16A2 2 0 0 0 27.92 4H8.08a2 2 0 0 0-1.79 1.11l-4.08 8.16a2 2 0 0 0-.21.9v3.08a2 2 0 0 0 .46 1.28A4.67 4.67 0 0 0 6 20.13a4.72 4.72 0 0 0 3-1.07a4.73 4.73 0 0 0 6 0a4.73 4.73 0 0 0 6 0a4.73 4.73 0 0 0 6 0a4.72 4.72 0 0 0 6.53-.52a2 2 0 0 0 .47-1.28v-3.09a2 2 0 0 0-.21-.9M30 18.13A2.68 2.68 0 0 1 27.82 17L27 15.88L26.19 17a2.71 2.71 0 0 1-4.37 0L21 15.88L20.19 17a2.71 2.71 0 0 1-4.37 0L15 15.88L14.19 17a2.71 2.71 0 0 1-4.37 0L9 15.88L8.18 17A2.68 2.68 0 0 1 6 18.13a2.64 2.64 0 0 1-2-.88v-3.08L8.08 6h19.84L32 14.16v3.06a2.67 2.67 0 0 1-2 .91'
        className='clr-i-outline clr-i-outline-path-2'
      ></path>
      <path fill='none' d='M0 0h36v36H0z'></path>
    </svg>
  );
}

export function DashboardIcon({ className = 'size-4' }: IconProps) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' className={className}>
      <path d='M0 0h24v24H0z' fill='none' />
      <path
        fill='currentColor'
        d='M13.5 9V4H20v5zM4 12V4h6.5v8zm9.5 8v-8H20v8zM4 20v-5h6.5v5zm1-9h4.5V5H5zm9.5 8H19v-6h-4.5zm0-11H19V5h-4.5zM5 19h4.5v-3H5zm4.5-3'
        strokeWidth='0.5'
        stroke='currentColor'
      />
    </svg>
  );
}

export function ProductIcon({ className = 'size-4' }: IconProps) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 28 28' className={className}>
      <path
        fill='currentColor'
        d='M15.395 2.5a3.75 3.75 0 0 0-2.786 0L3.732 6.05a2.75 2.75 0 0 0-1.728 2.553v10.792a2.75 2.75 0 0 0 1.728 2.554l8.877 3.55a3.75 3.75 0 0 0 2.786 0l8.877-3.55a2.75 2.75 0 0 0 1.729-2.554V8.604a2.75 2.75 0 0 0-1.729-2.553zm-2.229 1.392a2.25 2.25 0 0 1 1.672 0L23.23 7.25l-3.605 1.442L10.397 5zM8.378 5.808l9.23 3.692l-3.606 1.443L4.773 7.25zm-4.851 2.56l9.725 3.89V24.14l-.086-.032l-8.876-3.551a1.25 1.25 0 0 1-.786-1.16V8.603q0-.12.023-.237M14.752 24.14V12.258l9.726-3.89q.022.115.022.236v10.792c0 .511-.31.971-.785 1.16l-8.877 3.552z'
      ></path>
    </svg>
  );
}

export function CartIcon({ className = 'size-4' }: IconProps) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' className={className}>
      <path
        fill='currentColor'
        d='M2.997 3.496a.5.5 0 0 1 .5-.5h.438c.727 0 1.145.473 1.387.945c.165.323.284.717.383 1.059H16a1 1 0 0 1 .962 1.272l-1.496 5.275A2 2 0 0 1 13.542 13H8.463a2 2 0 0 1-1.93-1.473l-.642-2.355l-.01-.032l-1.03-3.498l-.1-.337c-.1-.346-.188-.652-.32-.909c-.159-.31-.305-.4-.496-.4h-.438a.5.5 0 0 1-.5-.5M6.845 8.87l.653 2.396a1 1 0 0 0 .965.736h5.08a1 1 0 0 0 .961-.727L16 6H6zM10 15.499a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0m-1 0a.5.5 0 1 0-1 0a.5.5 0 0 0 1 0m6 0a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0m-1 0a.5.5 0 1 0-1 0a.5.5 0 0 0 1 0'
      ></path>
    </svg>
  );
}

export function SettingIcon({ className = 'size-4' }: IconProps) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' className={className}>
      <path
        fill='currentColor'
        d='m10.135 21l-.362-2.892q-.479-.145-1.035-.454q-.557-.31-.947-.664l-2.668 1.135l-1.865-3.25l2.306-1.739q-.045-.27-.073-.558q-.03-.288-.03-.559q0-.252.03-.53q.028-.278.073-.626L3.258 9.126l1.865-3.212L7.771 7.03q.448-.373.97-.673q.52-.3 1.013-.464L10.134 3h3.732l.361 2.912q.575.202 1.016.463t.909.654l2.725-1.115l1.865 3.211l-2.382 1.796q.082.31.092.569t.01.51q0 .233-.02.491q-.019.259-.088.626l2.344 1.758l-1.865 3.25l-2.681-1.154q-.467.393-.94.673t-.985.445L13.866 21zM11 20h1.956l.369-2.708q.756-.2 1.36-.549q.606-.349 1.232-.956l2.495 1.063l.994-1.7l-2.189-1.644q.125-.427.166-.786q.04-.358.04-.72q0-.38-.04-.72t-.166-.747l2.227-1.683l-.994-1.7l-2.552 1.07q-.454-.499-1.193-.935q-.74-.435-1.4-.577L13 4h-1.994l-.312 2.689q-.756.161-1.39.52q-.633.358-1.26.985L5.55 7.15l-.994 1.7l2.169 1.62q-.125.336-.175.73t-.05.82q0 .38.05.755t.156.73l-2.15 1.645l.994 1.7l2.475-1.05q.589.594 1.222.953q.634.359 1.428.559zm.973-5.5q1.046 0 1.773-.727T14.473 12t-.727-1.773t-1.773-.727q-1.052 0-1.776.727T9.473 12t.724 1.773t1.776.727M12 12'
      ></path>
    </svg>
  );
}

export function PlusIcon({ className = 'size-4' }: IconProps) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' className={className}>
      <path
        fill='currentColor'
        d='M18 12.998h-5v5a1 1 0 0 1-2 0v-5H6a1 1 0 0 1 0-2h5v-5a1 1 0 0 1 2 0v5h5a1 1 0 0 1 0 2'
      ></path>
    </svg>
  );
}

export function SearchIcon({ className = 'size-4' }: IconProps) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' className={className}>
      <path
        fill='none'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={1.5}
        d='M19 11.5a7.5 7.5 0 1 1-15 0a7.5 7.5 0 0 1 15 0m-2.107 5.42l3.08 3.08'
      ></path>
    </svg>
  );
}

export function ExitIcon({ className = 'size-4' }: IconProps) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' className={className}>
      <path
        fill='currentColor'
        d='M5.616 20q-.691 0-1.153-.462T4 18.384V5.616q0-.691.463-1.153T5.616 4h6.403v1H5.616q-.231 0-.424.192T5 5.616v12.769q0 .23.192.423t.423.192h6.404v1zm10.846-4.461l-.702-.72l2.319-2.319H9.192v-1h8.887l-2.32-2.32l.702-.718L20 12z'
      ></path>
    </svg>
  );
}

export function MenuIcon({ className = 'size-4' }: IconProps) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' className={className}>
      <path
        fill='currentColor'
        d='M4 18q-.425 0-.712-.288T3 17t.288-.712T4 16h16q.425 0 .713.288T21 17t-.288.713T20 18zm0-5q-.425 0-.712-.288T3 12t.288-.712T4 11h16q.425 0 .713.288T21 12t-.288.713T20 13zm0-5q-.425 0-.712-.288T3 7t.288-.712T4 6h16q.425 0 .713.288T21 7t-.288.713T20 8z'
      ></path>
    </svg>
  );
}

export function DotsVerticalIcon({ className = 'size-4' }: IconProps) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' className={className}>
      <path
        fill='currentColor'
        d='M12 13.5a1.5 1.5 0 1 1 0-3a1.5 1.5 0 0 1 0 3m0-5a1.5 1.5 0 1 1 0-3a1.5 1.5 0 0 1 0 3m0 10a1.5 1.5 0 1 1 0-3a1.5 1.5 0 0 1 0 3'
      />
    </svg>
  );
}

export function EyeIcon({ className = 'size-4' }: IconProps) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' className={className}>
      <path
        fill='currentColor'
        d='M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5M12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5s5 2.24 5 5s-2.24 5-5 5m0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3s3-1.34 3-3s-1.34-3-3-3'
      />
    </svg>
  );
}

export function PencilIcon({ className = 'size-4' }: IconProps) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' className={className}>
      <path
        fill='currentColor'
        d='M3 17.25V21h3.75L17.81 9.94l-3.75-3.75zM20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83l3.75 3.75z'
      />
    </svg>
  );
}

export function TrashIcon({ className = 'size-4' }: IconProps) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' className={className}>
      <path
        fill='currentColor'
        d='M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6zM19 4h-3.5l-1-1h-5l-1 1H5v2h14z'
      />
    </svg>
  );
}

export function CloseIcon({ className = 'size-4' }: IconProps) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' className={className}>
      <path
        fill='currentColor'
        d='M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94z'
      ></path>
    </svg>
  );
}
