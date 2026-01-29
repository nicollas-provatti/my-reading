function Input({ label, id, textarea, ...props }) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="font-semibold">
        {label}{" "}
      </label>
      {textarea ? (
        <textarea
          {...props}
          id={id}
          className="border border-zinc-300 rounded-md p-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition"
        ></textarea>
      ) : (
        <input
          {...props}
          id={id}
          className="border border-zinc-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition"
        />
      )}
    </div>
  );
}

export default Input;
