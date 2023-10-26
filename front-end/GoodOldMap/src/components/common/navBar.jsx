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
    <div className="h-[calc(3vh+3rem)]">
      <nav className={`${relative?"relative":"fixed"} pt-[2vh] pb-[1vh] px-[10%] h-[calc(3vh+3rem)] w-full
        bg-white duration-700 ${navHidden}`}>
        <div className="flex flex-row justify-between">
          {children}
        </div>
      </nav>
    </div>
    </>
  )
}

export default NavBar;