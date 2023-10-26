# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# style so far

page width:
- text pages: content-width: 80%, margin-left: 10%, margin-right: 10%
- pop-up, login/register pages: content-width: 60%, margin-left: 20%, margin-right: 20%
- height: min 100vh for pages need scrolling, 100vh for pages does not need scrolling (h-screen in tailwind)

component sizing:
- width: 100%, resize components on page implementation
- input fields: padding-top: 0.5rem, padding-bottom: 0.5rem (py-2 in tailwind)
- buttons: padding-top: 0.5rem, padding-bottom: 0.5rem (py-2 in tailwind)
- logos: height & width both 2.75rem (h-11 in tailwind)
- navbar: padding-top: 2vh, padding-bottom: 1vh, total height: calc(3vh+3rem)