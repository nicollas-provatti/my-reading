function Header() {
  return (
    <header className="relative py-3 min-h-50 md:min-h-65 bg-[url(libary.jpg)] bg-center bg-cover shadow-md">
      {/* overlay gradient */}
      <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/40 to-transparent" />

      <div className="relative h-full flex items-end">
        <div className="w-full max-w-7xl mx-auto px-4 pb-4 ">
          <h1 className="text-2xl md:text-3xl font-bold text-white tracking-wide">
            Minhas Leituras
          </h1>
        </div>
      </div>
    </header>
  );
}

export default Header;
