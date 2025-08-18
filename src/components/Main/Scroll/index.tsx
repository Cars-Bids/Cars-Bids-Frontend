import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
const scrollPositions = new Map<string, number>();

interface ScrollManagerProps {
  restoreScroll?: boolean
}
 function ScrollManager({ restoreScroll = false }: ScrollManagerProps) {
  useEffect(() => {
    const handleScroll = () => {
      scrollPositions.set(window.location.pathname, window.scrollY)
      // дебаг: показує поточний скрол
      console.log(`[ScrollManager] Прокрутка: ${window.location.pathname} → Y=${window.scrollY}`)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (restoreScroll) {
      const y = scrollPositions.get(window.location.pathname) ?? 0;
      console.log(`[ScrollManager] Відновлюємо скрол: ${window.location.pathname} → Y=${y}`)
      window.scrollTo({ top: y, behavior: "smooth" })
    } else {
      console.log(`[ScrollManager] Скидаємо скрол на верх: ${window.location.pathname}`)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }, [restoreScroll]);

  return null;
}



 function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 200); // показуємо після 200px
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
   <button
  onClick={handleClick}
  className={`fixed bottom-8 right-8 w-14 h-14 flex items-center justify-center
    bg-red-600 text-white text-2xl rounded-full shadow-lg
    transition-all duration-300
    ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}
>
  <ArrowUp className="w-8 h-8 stroke-2" />
</button>


  );
}

export { ScrollManager, ScrollToTopButton };