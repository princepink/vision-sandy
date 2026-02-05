import '@mantine/core/styles.css'; // スタイルのインポートも忘れずに！
import { MantineProvider } from '@mantine/core';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { AppShell, Burger, NavLink, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

// 各ページコンポーネント（後ほど作成）
import Home from './pages/Home';
import ReactBitsPage from './pages/ReactBits';
// import MotionPage from './pages/Motion';
import GsapLenisPage from './pages/GsapLenis';
// import LenisPage from './pages/Lenis';

export default function App() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <MantineProvider>
      <BrowserRouter>
{/*
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
*/}
              {/* <NavLink component={Link} to="/motion" label="Framer Motion" /> */}
{/*
              <NavLink component={Link} to="/gsap-lenis" label="GSAP + Lenis" />
            </Stack>
          </AppShell.Navbar>
  
          <AppShell.Main>
*/}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/react-bits" element={<ReactBitsPage />} />
              {/* <Route path="/motion" element={<MotionPage />} /> */}
              <Route path="/gsap-lenis" element={<GsapLenisPage />} />
            </Routes>
{/*
          </AppShell.Main>
        </AppShell>
*/}
      </BrowserRouter>
    </MantineProvider>
  );
}
