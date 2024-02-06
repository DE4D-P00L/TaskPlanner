function Header({ text, bg, count }) {
  return (
    <div
      className={`${bg} flex items-center h-12 rounded-md uppercase text-md text-white px-4 justify-between select-none`}>
      {text}
      <span className="bg-white text-black w-5 h-5 rounded-full grid place-content-center">
        {count}
      </span>
    </div>
  );
}

export default Header;
