import { Link as Linkscroll } from "react-scroll";
const Navbar = () => {
  return (
    <div className="p-5 flex justify-between bg-transparent fixed top-0 left-0 right-0">
      <h1 className="text-[#87255B] font-semibold text-[24px]">GiveHope</h1>
      <nav>
        <ul className="flex gap-10 text-[#1E1E1E] text-lg font-medium">
          <li className="hover:text-[#87255B] cursor-pointer"><Linkscroll to="home" smooth={true} duration={500}>Home</Linkscroll ></li>
          <li className="hover:text-[#87255B] cursor-pointer"><Linkscroll to="tutorial" smooth={true} duration={500}>Tutorial</Linkscroll></li>
          <li className="hover:text-[#87255B] cursor-pointer"><Linkscroll to="footer" smooth={true} duration={500}>Contact Us</Linkscroll></li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
