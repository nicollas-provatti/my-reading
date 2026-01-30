function Input({ label, id, textarea, ...props }) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-medium text-zinc-700">
        {label}
      </label>

      {textarea ? (
        <textarea
          {...props}
          id={id}
          className="
            rounded-lg
            border border-zinc-300
            bg-zinc-50
            px-3 py-2
            text-sm
            resize-none
            focus:outline-none
            focus:border-blue-500
            focus:ring-2 focus:ring-blue-100
            transition
          "
        />
      ) : (
        <input
          {...props}
          id={id}
          className="
            rounded-lg
            border border-zinc-200
            bg-zinc-50
            px-3 py-2
            text-sm
            focus:outline-none
            focus:border-blue-500
            focus:ring-2 focus:ring-blue-100
            transition
          "
        />
      )}
    </div>
  );
}

export default Input;