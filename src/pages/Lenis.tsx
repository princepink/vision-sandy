// App.jsx 等で呼び出すだけ
import { ReactLenis } from 'lenis/react';

export default function LenisPage() {
  return (
    <ReactLenis root>
      {/* ここにあなたのコンテンツを書くだけで、全体がダイナミックな挙動に */}
      <section style={{ height: '100vh' }}>Section 1</section>
      <section style={{ height: '100vh' }}>Section 2</section>
    </ReactLenis>
  )
}
