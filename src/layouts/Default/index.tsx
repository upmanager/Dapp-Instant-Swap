import Main from 'app/components/Main'
import Popups from 'app/components/Popups'

// @ts-ignore TYPE NEEDS FIXING
const Layout = ({ children }) => {
  return (
    <div className="z-0 flex flex-col items-center w-full h-screen" style={{ height: 'min-content' }}>
      <Main>{children}</Main>
      <Popups />
    </div>
  )
}

export default Layout
