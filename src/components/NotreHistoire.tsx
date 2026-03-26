import FadeIn from "./FadeIn";

interface NotreHistoireProps {
  content: string;
}

export default function NotreHistoire({ content }: NotreHistoireProps) {
  return (
    <section id="histoire" className="px-5 py-16 bg-bg">
      <FadeIn>
        <h2 className="font-display text-3xl font-semibold text-center mb-2">
          Notre Histoire
        </h2>
        <div className="w-12 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto mb-8" />
      </FadeIn>

      <FadeIn delay={150}>
        <div className="text-text-secondary text-base max-w-lg mx-auto">
          {content.split(/\n\n+/).map((paragraph, i) => (
            <p key={i} className="mb-4 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </FadeIn>
    </section>
  );
}
