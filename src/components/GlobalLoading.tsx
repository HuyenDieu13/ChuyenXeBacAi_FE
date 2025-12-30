import { useIsFetching, useIsMutating } from "@tanstack/react-query";

const GlobalLoading = () => {
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();

  if (isFetching + isMutating === 0) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black/30 flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-white/40 border-t-white rounded-full animate-spin" />
    </div>
  );
};

export default GlobalLoading;
