import { Title, Text, Container, Space, Box, SimpleGrid } from '@mantine/core';
import SplitText from '../components/ReactBits/SplitText';
import SpotlightCard from '../components/ReactBits/SpotlightCard';
import Waves from '../components/ReactBits/Waves'; // GSAPを使用

export default function ReactBitsPage() {
  return (
    <Box style={{ position: 'relative', overflow: 'hidden', minHeight: '200vh' }}>
      {/* 1. 背景全体にWavesを配置 */}
      <Box style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, opacity: 0.3 }}>
        <Waves
          lineColor="#228be6"
          backgroundColor="transparent"
          waveSpeedX={0.02}
          waveSpeedY={0.01}
          waveAmpX={40}
          waveAmpY={20}
          friction={0.9}
          tension={0.01}
          maxCursorMove={120}
        />
      </Box>

      <Container size="md" py="xl">
        <div style={{ height: '50vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Title order={1}>Dynamic Layout Test</Title>
          <Text c="dimmed">背景で波が動き、カードがマウスに反応します</Text>
        </div>

        {/* 2. SpotlightCardの中にSplitTextを配置 */}
        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="xl">
          <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(0, 122, 255, 0.2)">
            <div style={{ padding: '2rem' }}>
              <SplitText
                text="Dynamic Experience"
                delay={100}
                animationFrom={{ opacity: 0, transform: 'translate3d(0,40px,0)' }}
                animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
              />
              <Space h="md" />
              <Text size="sm">
                カードの上にマウスを乗せてみてください。
                光が追従し、テキストがスクロールで出現します。
              </Text>
            </div>
          </SpotlightCard>

          <SpotlightCard className="custom-spotlight-card">
            <div style={{ padding: '2rem' }}>
              <Title order={3} mb="sm">Mantine + React Bits</Title>
              <Text size="sm">
                Mantineのレイアウト力とReact Bitsの演出力を組み合わせることで、
                Tailwindなしでもここまでリッチになります。
              </Text>
            </div>
          </SpotlightCard>
        </SimpleGrid>

        <div style={{ height: '100vh' }} />
      </Container>
    </Box>
  );
}
