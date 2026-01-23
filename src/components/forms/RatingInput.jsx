function RatingInput({ rating, onClick }) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor="rating" className="font-semibold">
        Avaliação:{" "}
      </label>
      <div className="rating rating-sm border border-zinc-300 rounded-md p-2">
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
