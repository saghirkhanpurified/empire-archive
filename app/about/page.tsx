export const metadata = {
  title: 'About',
};

export default function AboutPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-24 md:py-32">
      <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 mb-8">
        About the Archive
      </h1>
      <div className="prose prose-lg prose-slate text-slate-600">
        <p className="mb-6 leading-relaxed">
          The Empire Archive is a sovereign database dedicated to uncovering untouched digital strategies, Web3 ecosystems, and modern tech paradigms.
        </p>
        <p className="mb-6 leading-relaxed">
          Built for the modern student and digital builder, this repository focuses on highly actionable, text-based intelligence. We strip away the noise of traditional tech media to provide pure, weaponized knowledge—ranging from zero-cost crypto airdrop hunting to advanced academic AI workflows.
        </p>
        <p className="leading-relaxed">
          Everything documented here is designed to give you a strategic and financial edge in an increasingly automated world.
        </p>
      </div>
    </main>
  );
}