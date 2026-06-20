import { useState, useMemo } from 'react';
import Icon from '@/components/ui/icon';

const CAT_IMG = 'https://cdn.poehali.dev/projects/14f8b3cc-a2a8-4798-ad3b-8da4afbbc7e1/files/2942d415-ecd3-40af-889f-7791bea70901.jpg';

const PREDICTIONS = [
  'Сегодня тебя ждёт волшебная встреча с новым другом! 🐾',
  'Звёзды шепнули мне: тебя ждёт сладкий сюрприз! 🍭',
  'Закрой глаза и загадай желание — оно обязательно сбудется! ✨',
  'Завтра будет день, полный смеха и приключений! 🎈',
  'Скоро ты узнаешь маленький, но очень добрый секрет! 🤫',
  'Твоя улыбка сегодня зажжёт целую галактику! 🌟',
  'Мой хвост чует: тебя ждёт удача в любой игре! 🎲',
  'Сегодня волшебство спрятано в самой обычной вещи. Найди его! 🔮',
  'Тебе придёт послание от того, кто очень тебя любит! 💌',
  'Если поделишься добротой — она вернётся к тебе вдвойне! 💜',
  'Скоро сбудется то, о чём ты давно мечтал! 🌙',
  'Сегодня ты станешь настоящим героем для кого-то рядом! 🦸',
];

const Star = ({ top, left, size, delay }: { top: string; left: string; size: number; delay: string }) => (
  <span
    className="absolute animate-twinkle text-secondary"
    style={{ top, left, fontSize: size, animationDelay: delay }}
  >
    ✦
  </span>
);

const Index = () => {
  const [prediction, setPrediction] = useState<string | null>(null);
  const [spinning, setSpinning] = useState(false);

  const stars = useMemo(
    () =>
      Array.from({ length: 22 }).map((_, i) => ({
        top: `${Math.random() * 95}%`,
        left: `${Math.random() * 95}%`,
        size: 8 + Math.random() * 18,
        delay: `${Math.random() * 3}s`,
      })),
    []
  );

  const conjure = () => {
    setSpinning(true);
    setPrediction(null);
    setTimeout(() => {
      const next = PREDICTIONS[Math.floor(Math.random() * PREDICTIONS.length)];
      setPrediction(next);
      setSpinning(false);
    }, 1400);
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {stars.map((s, i) => (
        <Star key={i} {...s} />
      ))}

      <div className="relative z-10 container mx-auto px-4 py-10 flex flex-col items-center">
        <header className="text-center mb-6 animate-reveal">
          <p className="text-secondary font-semibold tracking-widest uppercase text-sm mb-2">
            ✨ Магия и предсказания ✨
          </p>
          <h1 className="font-magic text-5xl md:text-7xl text-glow text-primary leading-tight">
            Кот-волшебник<br />Рыжик
          </h1>
          <p className="text-muted-foreground mt-4 text-lg max-w-md mx-auto">
            Загляни в волшебный шар Рыжика и узнай, что приготовила тебе судьба сегодня!
          </p>
        </header>

        <button
          onClick={conjure}
          className="relative mt-2 mb-10 rounded-full focus:outline-none group"
          aria-label="Получить предсказание"
        >
          <div
            className={`relative w-60 h-60 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-primary/60 animate-glow ${
              spinning ? '' : 'animate-float'
            }`}
          >
            <img
              src={CAT_IMG}
              alt="Рыжий кот-волшебник Рыжик"
              className={`w-full h-full object-cover transition-transform duration-500 ${
                spinning ? 'scale-110 rotate-3 blur-[1px]' : 'group-hover:scale-105'
              }`}
            />
            {spinning && (
              <div className="absolute inset-0 flex items-center justify-center bg-background/40 backdrop-blur-[2px]">
                <Icon name="Sparkles" className="text-secondary animate-spin" size={64} />
              </div>
            )}
          </div>
          <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap bg-accent text-accent-foreground font-bold px-6 py-2 rounded-full shadow-lg group-hover:scale-110 transition-transform">
            {spinning ? 'Колдую...' : 'Нажми на меня! 🔮'}
          </span>
        </button>

        <div className="w-full max-w-xl min-h-[120px] flex items-center justify-center">
          {prediction && (
            <div
              key={prediction}
              className="animate-reveal bg-card/80 backdrop-blur border-2 border-primary/40 rounded-3xl p-8 text-center shadow-2xl"
            >
              <Icon name="Stars" className="text-secondary mx-auto mb-3" size={36} />
              <p className="text-xl md:text-2xl font-semibold text-foreground leading-relaxed">
                {prediction}
              </p>
              <button
                onClick={conjure}
                className="mt-5 text-secondary font-semibold hover:underline inline-flex items-center gap-1"
              >
                <Icon name="RefreshCw" size={16} /> Ещё предсказание
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12 w-full max-w-3xl">
          {[
            { icon: 'Moon', title: 'Тайны звёзд', text: 'Рыжик читает послания ночного неба' },
            { icon: 'Wand2', title: 'Добрая магия', text: 'Каждое предсказание дарит улыбку' },
            { icon: 'Cat', title: 'Верный друг', text: 'Самый волшебный кот во вселенной' },
          ].map((f, i) => (
            <div
              key={f.title}
              className="animate-reveal bg-card/50 border border-border rounded-2xl p-5 text-center"
              style={{ animationDelay: `${0.2 + i * 0.15}s`, opacity: 0 }}
            >
              <Icon name={f.icon} className="text-secondary mx-auto mb-2" size={28} />
              <h3 className="font-bold text-primary">{f.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{f.text}</p>
            </div>
          ))}
        </div>

        <footer className="mt-12 text-muted-foreground/70 text-sm">
          🐱 Рыжик · Школа волшебных предсказаний
        </footer>
      </div>
    </div>
  );
};

export default Index;
