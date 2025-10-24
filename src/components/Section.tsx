interface SectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  id?: string;
}

const Section = ({ title, children, className = "", id }: SectionProps) => {
  return (
    <section className={className} id={id}>
      <div className="max-w-6xl mx-auto px-8">
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center mb-12">{title}</h3>
        <div className="max-w-4xl mx-auto">
          {children}
        </div>
      </div>
    </section>
  );
};

export default Section;
