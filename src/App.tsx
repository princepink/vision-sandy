import '@mantine/core/styles.css'; // スタイルのインポートも忘れずに！
import { MantineProvider } from '@mantine/core';
import { useLocation, /*BrowserRouter,*/ Routes, Route, Link } from 'react-router-dom';
import { AppShell, Burger, NavLink, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

// import { useLocation, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { PageWrapper } from './components/Motion/PageWrapper';

// 各ページコンポーネント（後ほど作成）
import Home from './pages/Home';
import ReactBitsPage from './pages/ReactBits';
import MotionPage from './pages/Motion';
import GsapLenisPage from './pages/GsapLenis';
// import LenisPage from './pages/Lenis';

export default function App() {
  const [opened, { toggle }] = useDisclosure();
  const location = useLocation(); // 現在のパスを取得

  return (
    <MantineProvider>
      {/* <BrowserRouter> */}

        <AppShell
          header={{ height: 60 }}
          navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
          padding="md"
        >
          <AppShell.Header p="md">
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
            <div>Dynamic UI Lab</div>
          </AppShell.Header>
  
          <AppShell.Navbar p="md">
            <Stack gap="sm">
              <NavLink component={Link} to="/" label="Home" />
              <NavLink component={Link} to="/react-bits" label="React Bits" />
              <NavLink component={Link} to="/motion" label="Framer Motion" />
              <NavLink component={Link} to="/gsap-lenis" label="GSAP + Lenis" />
            </Stack>
          </AppShell.Navbar>
        {/* AppShellなどのレイアウト */}
        <AppShell.Main>
          {/* mode="wait" は「前のページが消えてから次を出す」設定 */}
          <AnimatePresence mode="wait">
            {/* locationを渡すことで、パスが変わるたびにアニメーションが発動する */}
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
              <Route path="/react-bits" element={<PageWrapper><ReactBitsPage /></PageWrapper>} />
              <Route path="/motion" element={<PageWrapper><MotionPage /></PageWrapper>} />
              <Route path="/gsap-lenis" element={<PageWrapper><GsapLenisPage /></PageWrapper>} />
            </Routes>
          </AnimatePresence>
        </AppShell.Main>
        </AppShell>
      {/* </BrowserRouter> */}
    </MantineProvider>
  );
}
