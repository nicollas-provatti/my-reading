import { useAuth } from "../store/auth/use-auth";

function Header() {
  const { logout } = useAuth();
  return (
    <header className="relative py-3 min-h-50 md:min-h-65 bg-[url('/library.jpg')] bg-center bg-cover shadow-md">
      {/* overlay gradient */}
      <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/40 to-transparent" />

      <div className="relative h-full flex items-end">
        <div className="flex justify-between items-center w-full max-w-7xl mx-auto px-4 py-4 ">
          <h1 className="text-2xl md:text-3xl font-bold text-white tracking-wide">
            Minhas Leituras
          </h1>
          <button
            className="bg-white/90 px-4 py-2 rounded-full font-medium cursor-pointer transition hover:bg-white"
            onClick={logout}
          >
            Sair
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
