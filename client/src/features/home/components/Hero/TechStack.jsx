import { techStack } from '@/constants/techStack';

const TechStack = () => {
  return (
    <div className="mt-5 flex flex-wrap gap-3">
      {techStack.map((item) => (
        <span key={item} className="rounded-full border px-4 py-2 text-sm">
          {item}
        </span>
      ))}
    </div>
  );
};

export default TechStack;
