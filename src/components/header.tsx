import Image from "next/image";

const Header = () => {
  return (
    <div className="fixed top-0 inset-x-0 bg-background shadow-sm border-b z-50">
      <div className="flex items-center justify-between max-w-screen-xl h-[65px] mx-auto px-3 sm:px-5 lg:px-10">
        <Image src="/logo.svg" alt="Logo" height={70} width={150} />
        Login
      </div>
    </div>
  );
};

export default Header;
