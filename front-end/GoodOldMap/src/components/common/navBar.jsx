import { useState } from "react";

const NavBar = ({children}) => {
  // nave bar has fiexed size of 15% + 2.75rem
  // TODO: add calc(15%+2.75rem) to config file
  const [navHidden, setNavHidden] = useState("")
  let lastScrollY = window.scrollY;
  window.addEventListener("scroll", () => {
    if (lastScrollY < window.scrollY) setNavHidden("translate-y-[-100%]")
    else setNavHidden("")
    lastScrollY = window.scrollY;
  })
  return (
    <>
    <nav className={`bg-white fixed py-[10%] pb-[5%] px-[10%] w-full duration-700 ${navHidden}`}>
      <div className="flex flex-row justify-between">
        {children}
      </div>
    </nav>
    </>
  )
}

export default NavBar;