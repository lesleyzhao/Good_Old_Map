import { useState } from "react";

const NavBar = ({children}) => {
  const [navHidden, setNavHidden] = useState("")
  let lastScrollY = window.scrollY;
  window.addEventListener("scroll", () => {
    if (lastScrollY < window.scrollY) setNavHidden("translate-y-[-100%]")
    else setNavHidden("")
    lastScrollY = window.scrollY;
  })
  return (
    <>
    <div className="h-[calc(3vh+3rem)]">
      <nav className={`bg-white fixed pt-[2vh] pb-[1vh] px-[10%] h-[calc(3vh+3rem)] w-full duration-700 ${navHidden}`}>
        <div className="flex flex-row justify-between">
          {children}
        </div>
      </nav>
    </div>
    </>
  )
}

export default NavBar;