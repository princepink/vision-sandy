import { useEffect, useRef } from 'react';
import { Box, Title, Text, Container, Center, Paper, SimpleGrid, Badge, Flex } from '@mantine/core';
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
    // --- 1. 回転・拡大 (Sync Box) ---
    gsap.to(scrollBoxRef.current, {
      rotate: 360, scale: 1.5, borderRadius: '50%',
      scrollTrigger: {
        trigger: scrollBoxRef.current,
        start: "top 80%",
        end: "bottom 20%",
        scrub: 1,
        invalidateOnRefresh: true, // リフレッシュ時に再計算させる
      markers: true, // ★ これを追加
      id: "sync-box", // ★ 識別用
      }
    });
  
    // --- 2. 背景パララックス ---
    gsap.to(bgRef.current, {
      y: -100, ease: "none",
      scrollTrigger: { trigger: bgRef.current, start: "top bottom", end: "bottom top", scrub: true }
    });
  
    // --- 3. 水平スクロール (この pin 設定がページ高さを変える主因) ---
    const pin = gsap.fromTo(
      sectionRef.current,
      { translateX: 0 },
      {
        translateX: "-200vw",
        ease: "none",
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: "+=2000", // "2000px分" という指定の仕方に変えると安定します
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
        },
      }
    );

    // 全てのScrollTriggerをドキュメント上の位置順に並び替え、計算を同期させる
    ScrollTrigger.sort();

    // 重要：最後にすべての位置関係を再計算させる
    ScrollTrigger.refresh();
  
    return () => {
      // クリーンアップでScrollTriggerをすべて消去する
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
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

          {/* <Center style={{ height: '80vh' }}>
            <Text c="dimmed">--- End of Lab ---</Text>
          </Center> */}

        </Container>

        <Container size="md" style={{ height: '150vh' }}>
            <Center style={{ height: '100vh' }}><Title>Scroll Down for Horizontal Section</Title></Center>
            <Box ref={scrollBoxRef} style={{ width: 100, height: 100, backgroundColor: 'blue' }} />
        </Container>

        {/* --- 5. 水平スクロールセクション --- */}
        <Box ref={triggerRef} style={{ display: 'block', width: '100%' }}>
          <div style={{ height: '100vh', overflow: 'hidden' }}>
            <Flex
              ref={sectionRef}
              style={{
                width: '300vw', // 横に3画面分つなげる
                height: '100vh',
                position: 'relative',
              }}
            >
              {/* 各パネル */}
              <Center style={{ width: '100vw', backgroundColor: '#339af0' }}>
                <Title c="white" order={1}>Horizontal Panel 1</Title>
              </Center>
              <Center style={{ width: '100vw', backgroundColor: '#51cf66' }}>
                <Title c="white" order={1}>Horizontal Panel 2</Title>
              </Center>
              <Center style={{ width: '100vw', backgroundColor: '#ff922b' }}>
                <Title c="white" order={1}>Horizontal Panel 3</Title>
              </Center>
            </Flex>
          </div>
        </Box>

        <Center style={{ height: '100vh' }}>
          <Title order={2}>And we are back to vertical!</Title>
        </Center>
      </Box>
    </ReactLenis>
  );
}
