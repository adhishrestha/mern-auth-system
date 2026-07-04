export const getNavClass = ({ isActive }) =>
  `relative text-sm font-medium transition
   after:absolute after:-bottom-1 after:left-0 after:h-[2px]
   after:w-0 after:bg-black after:transition-all hover:after:w-full ${
     isActive ? 'text-black after:w-full' : 'text-gray-600'
   }`;
