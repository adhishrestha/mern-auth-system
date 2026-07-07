export const getNavButtonClass = (isActive) =>
  `relative rounded-sm text-sm font-medium transition-colors
  ${isActive ? 'text-black after:w-full' : 'text-gray-600 hover:text-black after:w-0'}
  after:absolute
  after:left-0
  after:-bottom-1
  after:h-[2px]
  after:bg-black
  after:transition-all
  hover:after:w-full
  focus-visible:outline-none
  focus-visible:ring-2
  focus-visible:ring-black`;
