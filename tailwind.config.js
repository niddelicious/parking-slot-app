/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {},
    plugins: [require('@tailwindcss/forms'),],
  },
  safelist: [
    'bg-green-500',
    'bg-red-500',
    'bg-yellow-500',
    'bg-blue-500',
    'bg-purple-500',
    'bg-orange-500',
    'bg-neutral-800',
  ] // For tailwind colors to work properly they need to be safelisted, otherwise they will not be rendered,
}
