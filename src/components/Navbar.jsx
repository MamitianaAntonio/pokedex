function Navbar() {
  return (
    <nav className="flex justify-between items-center px-[4vw] py-2 bg-[#6F35FC] text-white shadow-md sticky top-0 z-1000">
      <h1 className="text-2xl font-bold">PoKédex</h1>
      <img src="https://cdn.worldvectorlogo.com/logos/pokemon-23.svg" alt="pokemon logo" className="w-20 h-10" />
    </nav>
  );
}

export default Navbar;
