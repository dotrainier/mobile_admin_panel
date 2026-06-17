# UI Snippets

A structural reference for patterns that are easy to forget. These snippets define **structure only** — size, color, and spacing are always set inline, so change them freely per instance.

Class names like `btn`, `input`, `select`, `badge`, `label`, and `field` come from the `@layer components` block in `index.css`. That file defines what each class already includes by default; this file shows them in real markup, with the inline classes that complete each one.

**Mobile-first:** every tappable element is built to the **44×44px minimum tap target** standard ([Apple HIG](https://developer.apple.com/design/human-interface-guidelines/buttons) / [Material Design](https://m3.material.io/foundations/accessibility/patterns)).

- **Buttons, inputs, and selects** carry `min-h-11` directly on the element.
- **Checkboxes and toggles** keep their small visual size, but sit inside a `min-h-11` wrapping `label` — the label is the real tap target, not the visible box.

---

## Button

**Basic**

```jsx
<button className='btn min-h-11 bg-blue-500 text-white px-4 py-2 text-sm focus:ring-blue-400'>
  Submit
</button>
```

**With leading icon**

```jsx
<button className='btn min-h-11 bg-blue-500 text-white px-4 py-2 text-sm focus:ring-blue-400'>
  <svg className='w-4 h-4'>{/* icon */}</svg>
  Save
</button>
```

**Full width** (common on mobile)

```jsx
<button className='btn w-full min-h-11 bg-blue-500 text-white px-4 py-3 text-base focus:ring-blue-400'>
  Continue
</button>
```

**Outline variant**

```jsx
<button className='btn min-h-11 border border-gray-300 text-gray-700 bg-white px-4 py-2 text-sm focus:ring-gray-300'>
  Cancel
</button>
```

**Disabled** — handled by `@layer`, just add the `disabled` prop

```jsx
<button className='btn min-h-11 bg-blue-500 text-white px-4 py-2 text-sm' disabled>
  Loading...
</button>
```

---

## Input

**Basic**

```jsx
<input
  type='text'
  className='input w-full min-h-11 px-3 py-2 text-sm border border-gray-300 focus:ring-blue-400 focus:border-blue-400'
  placeholder='Enter value'
/>
```

**Error state**

```jsx
<input
  type='text'
  className={`input w-full min-h-11 px-3 py-2 text-sm border focus:ring-2 ${
    hasError ? 'border-red-400 focus:ring-red-400' : 'border-gray-300 focus:ring-blue-400'
  }`}
/>
```

**With label** — uses `.field` and `.label` from `@layer`

```jsx
<div className='field'>
  <label className='label text-gray-700'>Email</label>
  <input
    type='email'
    className='input w-full min-h-11 px-3 py-2 text-sm border border-gray-300 focus:ring-blue-400'
    placeholder='you@email.com'
  />
  {hasError && <span className='text-xs text-red-500'>Required</span>}
</div>
```

---

## Custom Checkbox

The real `<input>` is hidden with `sr-only`. The visible box is the next sibling `div`, which reacts to checked state via `peer-checked:`. The wrapping `label` is the full tap target.

**With checkmark icon**

```jsx
<label className='inline-flex items-center gap-2 min-h-11 cursor-pointer select-none'>
  <input type='checkbox' className='sr-only peer' />
  <div className='w-5 h-5 rounded border-2 border-gray-300 flex items-center justify-center transition-colors duration-150 peer-checked:bg-blue-500 peer-checked:border-blue-500'>
    <svg
      className='w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity duration-150'
      viewBox='0 0 20 20'
      fill='currentColor'
    >
      <path
        fillRule='evenodd'
        d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
        clipRule='evenodd'
      />
    </svg>
  </div>
  <span className='text-sm text-gray-700'>Label</span>
</label>
```

**Without checkmark icon** (filled box only)

```jsx
<label className='inline-flex items-center gap-2 min-h-11 cursor-pointer select-none'>
  <input type='checkbox' className='sr-only peer' />
  <div className='w-5 h-5 rounded border-2 border-gray-300 transition-colors duration-150 peer-checked:bg-blue-500 peer-checked:border-blue-500' />
  <span className='text-sm text-gray-700'>Label</span>
</label>
```

> ⚠️ **Watch out:** `sr-only peer` on the input and `peer-checked:` on the sibling only works when they are **direct siblings** — nothing between them in the DOM.

---

## Toggle (Switch)

The `input` is the track (full width, `appearance-none`). The dot is a `label` pointing at the input via `htmlFor` — it sits absolutely on top and moves via `peer-checked:translate-x-6`. The outer `label` wraps everything as the 44px tap target.

**Basic**

```jsx
<label htmlFor='toggle-1' className='inline-flex items-center min-h-11 cursor-pointer'>
  <div className='relative inline-block w-11 h-5'>
    <input
      id='toggle-1'
      type='checkbox'
      className='peer appearance-none w-11 h-5 bg-gray-200 rounded-full checked:bg-blue-500 cursor-pointer transition-colors duration-300'
    />
    <label
      htmlFor='toggle-1'
      className='absolute top-0 left-0 w-5 h-5 bg-white rounded-full border border-gray-300 shadow-sm transition-transform duration-300 peer-checked:translate-x-6 peer-checked:border-blue-500 cursor-pointer'
    />
  </div>
</label>
```

**With label text**

```jsx
<label
  htmlFor='toggle-2'
  className='inline-flex items-center gap-3 min-h-11 cursor-pointer select-none'
>
  <div className='relative inline-block w-11 h-5'>
    <input
      id='toggle-2'
      type='checkbox'
      className='peer appearance-none w-11 h-5 bg-gray-200 rounded-full checked:bg-blue-500 cursor-pointer transition-colors duration-300'
    />
    <label
      htmlFor='toggle-2'
      className='absolute top-0 left-0 w-5 h-5 bg-white rounded-full border border-gray-300 shadow-sm transition-transform duration-300 peer-checked:translate-x-6 peer-checked:border-blue-500 cursor-pointer'
    />
  </div>
  <span className='text-sm text-gray-700'>Enable notifications</span>
</label>
```

> ⚠️ **Watch out:** `id` on the input and `htmlFor` on both labels must match. Every toggle on the page needs a **unique `id`**. The dot `label` must be a **direct sibling** of the `peer` input for `peer-checked:` to work.

---

## Select / Dropdown

Uses `.select` from `@layer`. Wrap in a `div` for a custom arrow icon.

**Basic** — browser default arrow

```jsx
<select className='select w-full min-h-11 px-3 py-2 text-sm border border-gray-300 focus:ring-blue-400'>
  <option value=''>Choose an option</option>
  <option value='a'>Option A</option>
  <option value='b'>Option B</option>
</select>
```

**Custom arrow icon**

```jsx
<div className='relative'>
  <select className='select w-full min-h-11 px-3 py-2 pr-8 text-sm border border-gray-300 focus:ring-blue-400'>
    <option value=''>Choose an option</option>
    <option value='a'>Option A</option>
  </select>
  {/* pointer-events-none so taps pass through to the select */}
  <div className='pointer-events-none absolute inset-y-0 right-2 flex items-center'>
    <svg className='w-4 h-4 text-gray-400' viewBox='0 0 20 20' fill='currentColor'>
      <path
        fillRule='evenodd'
        d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
        clipRule='evenodd'
      />
    </svg>
  </div>
</div>
```

---

## Badge / Pill

**Basic**

```jsx
<span className='badge bg-blue-100 text-blue-700 px-2.5 py-0.5 text-xs'>Active</span>
```

**With dot indicator**

```jsx
<span className='badge bg-green-100 text-green-700 px-2.5 py-0.5 text-xs gap-1.5'>
  <span className='w-1.5 h-1.5 rounded-full bg-green-500' />
  Online
</span>
```

**Color variants** — swap `bg` and `text` per status:

| Status | Classes                         |
| ------ | ------------------------------- |
| Blue   | `bg-blue-100 text-blue-700`     |
| Green  | `bg-green-100 text-green-700`   |
| Red    | `bg-red-100 text-red-700`       |
| Yellow | `bg-yellow-100 text-yellow-700` |
| Gray   | `bg-gray-100 text-gray-600`     |

---

## Error / Helper Text

Always placed directly below an input or select.

```jsx
<span className="text-xs text-red-500 mt-0.5">This field is required.</span>
<span className="text-xs text-gray-400 mt-0.5">We'll never share your email.</span>
```

---

## Row Action Dropdown (fixed-position, escapes overflow:hidden)

Use this when the trigger is inside a table or any container with `overflow-hidden`. Instead of `position: absolute` (which gets clipped), the menu renders `position: fixed` using coordinates from `getBoundingClientRect`. The backdrop and menu live at the top of the component's JSX fragment — outside any scrolling or clipping ancestor.

**State**

```tsx
const [menuState, setMenuState] = useState<{ id: number; top: number; right: number } | null>(null);
```

**Backdrop + menu — place at the top of the component return, outside the table**

```tsx
{menuState && (
  <>
    <div className='fixed inset-0 z-10' onClick={() => setMenuState(null)} />
    <div
      className='fixed w-36 bg-white rounded-lg border border-gray-200 shadow-md z-20 py-1 overflow-hidden'
      style={{ top: menuState.top, right: menuState.right }}
    >
      <button className='w-full flex items-center gap-2 px-3 py-2 text-sm text-neutral-700 hover:bg-gray-50'>
        <EyeIcon className='size-4 text-indigo-500' />
        View
      </button>
      <button className='w-full flex items-center gap-2 px-3 py-2 text-sm text-neutral-700 hover:bg-gray-50'>
        <PencilIcon className='size-4 text-neutral-500' />
        Edit
      </button>
      <div className='border-t border-gray-100 my-1' />
      <button className='w-full flex items-center gap-2 px-3 py-2 text-sm text-red-500 hover:bg-red-50'>
        <TrashIcon className='size-4' />
        Delete
      </button>
    </div>
  </>
)}
```

**Trigger button — inside the table cell**

```tsx
<td className='px-2 py-3'>
  <button
    onClick={(e) => {
      if (menuState?.id === row.id) {
        setMenuState(null);
      } else {
        const rect = e.currentTarget.getBoundingClientRect();
        setMenuState({
          id: row.id,
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
```

> **Why `right` instead of `left`:** using `right: window.innerWidth - rect.right` pins the menu's right edge to the button's right edge, so it never overflows the screen on mobile regardless of scroll position.

**Close on scroll — add this `useEffect` alongside the state**

The fixed coords go stale when the page scrolls, so close the menu instead of chasing the position. The `true` capture flag catches scroll on any ancestor (including horizontal scroll on the table), not just `window`.

```tsx
useEffect(() => {
  if (!menuState) return;
  const close = () => setMenuState(null);
  window.addEventListener('scroll', close, true);
  return () => window.removeEventListener('scroll', close, true);
}, [menuState]);
```
