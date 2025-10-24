interface CardProps {
  icon: string;
  title: string;
  description: string;
}

const Card = ({ icon, title, description }: CardProps) => {
  return (
    <div className="bg-slate-800/95 backdrop-blur-md p-8 rounded-2xl text-center shadow-xl hover:-translate-y-2 transition-transform duration-300 border border-slate-700">
      <div className="text-5xl mb-4">{icon}</div>
      <h4 className="text-lg sm:text-xl md:text-2xl font-semibold text-white mb-4">{title}</h4>
      <p className="text-slate-300 leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default Card;
