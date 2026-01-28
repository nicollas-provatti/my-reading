function ImageWithFallback({ src, alt, className }) {
  return (
    <img
      src={src || "/covers/placeholder.svg"}
      alt={alt}
      className={className}
      onError={(e) => {
        e.currentTarget.src = "/covers/placeholder.svg";
      }}
    />
  );
}

export default ImageWithFallback;