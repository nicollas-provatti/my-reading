function RatingInput({ rating, onClick }) {
  return (
    <div className="flex flex-col gap-1 ">
      <label htmlFor="rating" className="text-sm font-medium text-zinc-700">
        Avaliação:{" "}
      </label>
      <div className="rating rating-sm rounded-lg
            border border-zinc-200
            bg-zinc-50
            px-3 py-2
            text-sm
            focus:outline-none
            focus:border-blue-500
            focus:ring-2 focus:ring-blue-100
            transition">
        <input
          type="radio"
          name="rating-6"
          id="rating"
          defaultChecked={rating === 1}
          className="mask mask-star-2 bg-orange-400"
          aria-label="1 star"
          onClick={() => onClick(1)}
        />
        <input
          type="radio"
          name="rating-6"
          defaultChecked={rating === 2}
          className="mask mask-star-2 bg-orange-400"
          aria-label="2 star"
          onClick={() => onClick(2)}
        />
        <input
          type="radio"
          name="rating-6"
          defaultChecked={rating === 3}
          className="mask mask-star-2 bg-orange-400"
          aria-label="3 star"
          onClick={() => onClick(3)}
        />
        <input
          type="radio"
          name="rating-6"
          defaultChecked={rating === 4}
          className="mask mask-star-2 bg-orange-400"
          aria-label="4 star"
          onClick={() => onClick(4)}
        />
        <input
          type="radio"
          name="rating-6"
          defaultChecked={rating === 5}
          className="mask mask-star-2 bg-orange-400"
          aria-label="5 star"
          onClick={() => onClick(5)}
        />
      </div>
    </div>
  );
}

export default RatingInput;
