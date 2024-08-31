export default function Loader() {
  return (
    <div className="html fixed inset-0">
      <div className="w-full h-screen flex flex-col items-center justify-center backdrop-blur-sm">
        <div className="loader"></div>
        <p className="mt-2">Please wait a moment..</p>
      </div>
    </div>
  );
}
