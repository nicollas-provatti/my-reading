function Spinner({ text }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-10">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-200 border-t-blue-500" />
      {text && <p className="text-zinc-600 text-sm">{text}</p>}
    </div>
  );
}

export default Spinner;