import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { useLocation, Routes, Route, Link } from 'react-router-dom';
import { AppShell, Burger, NavLink, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { AnimatePresence } from 'framer-motion';
import { PageWrapper } from './components/Motion/PageWrapper';

import Home from './pages/Home';
import ReactBitsPage from './pages/ReactBits';
import MotionPage from './pages/Motion';
import GsapLenisPage from './pages/GsapLenis';

export default function App() {
  const [opened, { toggle }] = useDisclosure();
  const location = useLocation();   // get current path

  return (
    <MantineProvider>
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

        <AppShell.Main>
          {/* mode="wait" -> wait until disappear previous page */}
          <AnimatePresence mode="wait">
            {/* To pass the location, invokes animation as changing the path */}
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
              <Route path="/react-bits" element={<PageWrapper><ReactBitsPage /></PageWrapper>} />
              <Route path="/motion" element={<PageWrapper><MotionPage /></PageWrapper>} />
              <Route path="/gsap-lenis" element={<PageWrapper><GsapLenisPage /></PageWrapper>} />
            </Routes>
          </AnimatePresence>
        </AppShell.Main>
      </AppShell>
    </MantineProvider>
  );
}
