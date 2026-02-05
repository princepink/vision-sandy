import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, Button, Center, SimpleGrid, Paper, Title } from '@mantine/core';

export default function MotionPage() {
  const [items, setItems] = useState([1, 2, 3, 4]);

  // アイテムをシャッフルする関数
  const shuffleItems = () => {
    setItems([...items].sort(() => Math.random() - 0.5));
  };

  // アイテムを削除する関数
  const removeItem = (id: number) => {
    setItems(items.filter(item => item !== id));
  };

  return (
    <Center style={{ minHeight: '100vh', flexDirection: 'column' }} p="xl">
      <Title order={2} mb="xl">Framer Motion: Layout Animation</Title>
      
      <Button onClick={shuffleItems} mb="md">並び替える</Button>

      <SimpleGrid cols={2} spacing="md" style={{ width: '100%', maxWidth: 600 }}>
        {/* AnimatePresence は要素が消える時の動きを制御する */}
        <AnimatePresence>
          {items.map((item) => (
            <motion.div
              key={item} // ReactとMotionにとって超重要！
              layout    // これを書くだけで、並び替えが自動でアニメーションになる！
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <Paper 
                withBorder p="xl" shadow="md" 
                onClick={() => removeItem(item)}
                style={{ cursor: 'pointer', textAlign: 'center' }}
              >
                Item {item}
              </Paper>
            </motion.div>
          ))}
        </AnimatePresence>
      </SimpleGrid>

      <Box mt="xl">
        <p>カードをクリックすると消えます。残りのカードが「自動でシュッと移動」するのを見てください。</p>
      </Box>
    </Center>
  );
}
