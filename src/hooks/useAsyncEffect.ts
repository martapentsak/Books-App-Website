import { useEffect } from "react";

function useAsyncEffect(
  effect: () => Promise<void>,
  deps: React.DependencyList
) {
  useEffect(() => {
    const executeEffect = async () => {
      await effect();
    };
    executeEffect();
  }, deps);
}

export default useAsyncEffect;
