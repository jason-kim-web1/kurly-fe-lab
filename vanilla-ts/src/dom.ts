export default function dom(tagName: string) {
  const elem = document.createElement(tagName);
  const wrapper = {
    get: () => elem,
    attr: (key: string, value: string) => {
      elem.setAttribute(key, value);
      return wrapper;
    },
    children: (...nodes: (Node | string)[]) => {
      elem.append(...nodes);
      return wrapper;
    },
    on: (key: keyof HTMLElementEventMap, listener: (ev: Event) => any) => {
      elem.addEventListener(key, listener);
      return wrapper;
    },
  };

  return wrapper;
}