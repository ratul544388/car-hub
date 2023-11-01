import Image from "next/image";

const Header = () => {
  return (
    <div className="fixed top-0 inset-x-0 h-[65px] bg-background shadow-sm border-b flex items-center justify-between px-10 z-50">
      <Image src="/logo.svg" alt="Logo" height={70} width={150} />
      Login
    </div>
  );
};

export default Header;
