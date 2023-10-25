import { useState } from "react";

const NavBar = ({children}) => {
  // nave bar has fiexed size of 3vh + 3rem
  // TODO: add calc(3vh+3rem) to config file
  const [navHidden, setNavHidden] = useState("")
  let lastScrollY = window.scrollY;
  window.addEventListener("scroll", () => {
    if (lastScrollY < window.scrollY) setNavHidden("translate-y-[-100%]")
    else setNavHidden("")
    lastScrollY = window.scrollY;
  })
  return (
    <>
    <nav className={`bg-white fixed pt-[2vh] pb-[1vh] px-[10%] w-full duration-700 ${navHidden}`}>
      <div className="flex flex-row justify-between">
        {children}
      </div>
    </nav>
    </>
  )
}

export default NavBar;