// Shared Pagefind UI setup for the search dialog and the /search/ page.
// The index only exists after `yarn build`, so search does nothing under `astro dev`.

declare global {
  interface Window {
    PagefindUI: any;
  }
}

const STYLESHEET = '/pagefind/pagefind-ui.css';
const SCRIPT = '/pagefind/pagefind-ui.js';

const translations = {
  placeholder: '輸入關鍵字搜尋...',
  clear_search: '清除',
  load_more: '載入更多結果',
  search_label: '搜尋此網站',
  filters_label: '篩選',
  zero_results: '找不到符合「[SEARCH_TERM]」的結果',
  many_results: '找到 [COUNT] 個符合「[SEARCH_TERM]」的結果',
  one_result: '找到 1 個符合「[SEARCH_TERM]」的結果',
  searching: '搜尋中...',
};

let scriptLoad: Promise<void> | undefined;

// The Pagefind script only needs to load once per visit; ClientRouter keeps `window` alive
const loadScript = () => {
  if (window.PagefindUI) return Promise.resolve();
  scriptLoad ??= new Promise<void>((resolve, reject) => {
    const script = document.createElement('script');
    script.src = SCRIPT;
    script.onload = () => resolve();
    script.onerror = () => {
      scriptLoad = undefined;
      reject(new Error(`Failed to load ${SCRIPT}`));
    };
    document.head.appendChild(script);
  });
  return scriptLoad;
};

// Pagefind UI writes the result count into a plain <p> that screen readers never hear about,
// so mirror it into a polite live region once the results settle
const announceResults = (container: HTMLElement) => {
  const status = document.createElement('p');
  status.className = 'sr-only';
  status.setAttribute('role', 'status');
  container.after(status);

  let timer: number | undefined;
  new MutationObserver(() => {
    clearTimeout(timer);
    timer = window.setTimeout(() => {
      const message = container.querySelector('.pagefind-ui__message')?.textContent?.trim() ?? '';
      if (message === translations.searching) return;
      if (status.textContent !== message) status.textContent = message;
    }, 500);
  }).observe(container, { childList: true, subtree: true, characterData: true });
};

// "Load more" drops keyboard focus once it's pressed, so move it to the first newly loaded result.
// Listens in the capture phase: Pagefind adds the new, still empty items in its own click handler
const focusLoadedResults = (container: HTMLElement) => {
  container.addEventListener('click', (event) => {
    if (!(event.target as Element).closest('.pagefind-ui__button')) return;
    // Results fill in as each one's data arrives, not in order, so wait on the item by position
    const items = () => container.querySelectorAll('.pagefind-ui__result');
    const before = items().length;
    const observer = new MutationObserver(() => {
      const next = items()[before]?.querySelector<HTMLAnchorElement>('.pagefind-ui__result-link');
      if (!next) return;
      observer.disconnect();
      next.focus();
    });
    observer.observe(container, { childList: true, subtree: true });
    setTimeout(() => observer.disconnect(), 5000);
  }, true);
};

/**
 * Mounts Pagefind UI into `container` and returns its search input.
 * `labelledBy` is the id of visible text that names the input; Pagefind only gives it a title.
 * `styleParent` is where the stylesheet goes: <head> is replaced on every ClientRouter
 * navigation, so anything that outlives the page must keep its own copy.
 */
export async function mountSearch(
  container: HTMLElement,
  { labelledBy, autofocus = false, styleParent = document.head }: { labelledBy: string; autofocus?: boolean; styleParent?: Element },
) {
  if (!document.querySelector(`link[href="${STYLESHEET}"]`)) {
    const style = document.createElement('link');
    style.rel = 'stylesheet';
    style.href = STYLESHEET;
    styleParent.appendChild(style);
  }
  await loadScript();

  new window.PagefindUI({
    element: container,
    resetStyles: false,
    showImages: false,
    autofocus,
    translations,
  });
  const input = container.querySelector<HTMLInputElement>('.pagefind-ui__search-input');
  input?.setAttribute('aria-labelledby', labelledBy);
  announceResults(container);
  focusLoadedResults(container);
  return input;
}
