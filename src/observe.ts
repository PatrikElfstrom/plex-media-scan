import { log } from "./logger";

export function observe({
  target,
  selectors,
  addedNodesCallback,
  removedNodesCallback,
  options,
}: {
  target: Node;
  selectors: string;
  addedNodesCallback: (searchTarget: HTMLElement) => void;
  removedNodesCallback?: (searchTarget: HTMLElement) => void;
  options?: MutationObserverInit;
}) {
  log("Initiating mutation observer");

  const defaultOptions = { subtree: true, childList: true };

  const mutationCallback = (mutationList: MutationRecord[]): void => {
    for (const mutation of mutationList) {
      if (mutation.type !== "childList") {
        continue;
      }

      mutation.addedNodes.forEach((searchTarget: Node) => {
        if (
          searchTarget instanceof HTMLElement &&
          searchTarget.matches(selectors)
        ) {
          addedNodesCallback(searchTarget);
        }
      });

      mutation.removedNodes.forEach((searchTarget: Node) => {
        if (
          searchTarget instanceof HTMLElement &&
          searchTarget.matches(selectors)
        ) {
          removedNodesCallback && removedNodesCallback(searchTarget);
        }
      });
    }
  };

  const observer = new MutationObserver(mutationCallback);

  log(`Observing for ${selectors} on`, target);
  observer.observe(target, { ...defaultOptions, ...options });
}
