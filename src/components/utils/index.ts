import { ClickType } from "./types";

function getClickType(event: MouseEvent): ClickType {
  return event.shiftKey ? 'shift' : (event.ctrlKey || event.metaKey) ? 'ctrl' : 'single';
}

function genIndexesFromRange(range: [number, number]): number[] {
  const result = [];
  if (range[0] < range[1]) {
    for (let a = range[0]; a <= range[1]; a++) {
      result.push(a);
    }
  } else {
    for (let a = range[0]; a >= range[1]; a--) {
      result.push(a);
    }
  }
  return result;
}

export { getClickType, genIndexesFromRange };
