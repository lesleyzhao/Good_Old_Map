import { useState } from "react";

const NavBar = ({children, relative}) => {
  // props: children (content in navbar)
  // optional: relative = 1 (if navbar position is relative), else fix on top
  const [navHidden, setNavHidden] = useState("")
  if (!relative) {
    let lastScrollY = window.scrollY;
    window.addEventListener("scroll", () => {
      if (lastScrollY < window.scrollY) setNavHidden("translate-y-[-100%]")
      else setNavHidden("")
      lastScrollY = window.scrollY;
    })
  }
  return (
    <>
    <div className="h-[calc(2vh+2rem)]">
      <nav className={`${relative?"relative":"fixed"} flex p-[1vh] px-[10%] h-[calc(2vh+2rem)] w-full
        bg-beige1 duration-700 ${navHidden} z-20`}>
        <div className="flex flex-row justify-between w-full max-w-[30rem] mx-auto">
          {children}
        </div>
      </nav>
    </div>
    </>
  )
}

export default NavBar;