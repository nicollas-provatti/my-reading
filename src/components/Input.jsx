function Input({ label, id, textarea, ...props }) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="font-semibold">{label} </label>
      {textarea ? (
        <textarea {...props} id={id} className="border p-1 border-zinc-300 rounded-sm resize-none"></textarea>
      ) : (
        <input {...props} id={id} className="border p-1 border-zinc-300 rounded-sm"/>
      )}
    </div>
  );
}

export default Input;
