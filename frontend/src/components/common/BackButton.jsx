import { ArrowLeft } from "lucide-react";

const BackButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="h-10 w-10 rounded-full flex items-center justify-center bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-slate-700 transition-colors border border-blue-200 dark:border-slate-700 shadow-sm"
      aria-label="Go back"
    >
      <ArrowLeft className="h-5 w-5" />
    </button>
  );
};

export default BackButton;
