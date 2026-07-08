import LoginCard from './LoginCard';

const BrowserMockup = () => {
  return (
    <div className="w-full max-w-xl overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-2xl">
      {/* Browser Header */}
      <div className="flex items-center gap-2 border-b border-gray-200 bg-gray-100 px-4 py-3">
        <div className="h-3 w-3 rounded-full bg-red-400" />

        <div className="h-3 w-3 rounded-full bg-yellow-400" />

        <div className="h-3 w-3 rounded-full bg-green-400" />

        <div className="ml-4 rounded-md bg-white px-4 py-1 text-xs text-gray-500">
          localhost:5173/login
        </div>
      </div>

      {/* App Preview */}
      <div className="bg-gray-50 p-10">
        <LoginCard />
      </div>
    </div>
  );
};

export default BrowserMockup;
