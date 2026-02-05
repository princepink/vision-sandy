import { useEffect, useRef } from 'react';
import { Box, Title, Text, Container, Center, Paper, SimpleGrid, Badge } from '@mantine/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ReactLenis } from 'lenis/react';

gsap.registerPlugin(ScrollTrigger);

export default function GsapLenisPage() {
  const scrollBoxRef = useRef(null);
  const bgRef = useRef(null);
  const floatCardRef = useRef(null);

  // 水平スクロール用のRef
  const sectionRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    // 1. 回転・拡大アニメーション (スクロール同期)
    gsap.to(scrollBoxRef.current, {
      rotate: 360,
      scale: 3,
      borderRadius: '50%',
      scrollTrigger: {
        trigger: scrollBoxRef.current,
        start: "top 80%", 
        end: "bottom 20%",
        scrub: 1, // 1秒遅れて追従する滑らかな同期
      },
    });

    // 2. 背景のパララックス (ゆっくり動く)
    gsap.to(bgRef.current, {
      y: -100,
      ease: "none",
      scrollTrigger: {
        trigger: bgRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    // 3. 前面のカードパララックス (速く動く + 少し遅れる)
    gsap.to(floatCardRef.current, {
      y: -250,
      scrollTrigger: {
        trigger: floatCardRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 2, 
      },
    });
  }, []);

  return (
    <ReactLenis root options={{ lerp: 0.05, duration: 1.5 }}>
      <Box style={{ position: 'relative', overflow: 'hidden' }}>
        
        {/* パララックス背景要素 */}
        <Box
          ref={bgRef}
          style={{
            position: 'absolute',
            top: '20vh',
            right: '-5%',
            width: '40%',
            height: '100vh',
            backgroundColor: '#e7f5ff',
            zIndex: -1,
            borderRadius: '100px 0 0 100px',
          }}
        />

        <Container size="md">
          {/* Section 1: Hero */}
          <Center style={{ height: '100vh', flexDirection: 'column' }}>
            <Badge size="lg" variant="filled" mb="md">Scroll Experience</Badge>
            <Title order={1} style={{ fontSize: '3.5rem' }}>GSAP + Lenis</Title>
            <Text size="xl" c="dimmed" mt="md">重厚なスクロールと多層レイヤーの融合</Text>
          </Center>

          {/* Section 2: Transform & Parallax */}
          <SimpleGrid cols={{ base: 1, sm: 2 }} spacing={100} style={{ minHeight: '100vh', alignItems: 'center' }}>
            <Box>
              <Title order={2} mb="xl">Transform Sync</Title>
              <Paper 
                ref={scrollBoxRef}
                shadow="xl"
                style={{ 
                  width: 200, height: 200, 
                  backgroundColor: '#228be6', 
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'white', fontSize: '1.2rem', fontWeight: 'bold'
                }}
              >
                Sync Box
              </Paper>
            </Box>

            <Box style={{ position: 'relative' }}>
              <Title order={2} mb="xl">Floating Layer</Title>
              <Text mb="lg">右側の青いカードは、スクロールに対して敏感に反応し、浮き上がるように動きます。</Text>
              
              <Paper 
                ref={floatCardRef}
                p="xl" shadow="dark-md" withBorder
                style={{ 
                  backgroundColor: '#333', color: 'white',
                  position: 'absolute', top: 0, right: 0, width: '100%',
                  zIndex: 10
                }}
              >
                <Title order={3} c="blue.4">Parallax Card</Title>
                <Text mt="sm" size="sm">Scrub値を変えることで、物体ごとに重さを演出できます。</Text>
              </Paper>
            </Box>
          </SimpleGrid>

          <Center style={{ height: '80vh' }}>
            <Text c="dimmed">--- End of Lab ---</Text>
          </Center>
        </Container>
      </Box>
    </ReactLenis>
  );
}
