import { onBeforeUnmount } from 'vue';

const activeLocks = new Set<string>();

export function useBodyScrollLock(key = 'default') {
  const lockScroll = () => {
    if (!import.meta.client) return;
    const beforeSize = activeLocks.size;
    activeLocks.add(key);
    if (beforeSize === 0) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.setProperty('overscroll-behavior', 'contain');
    }
  };

  const unlockScroll = () => {
    if (!import.meta.client) return;
    const existed = activeLocks.delete(key);
    if (existed && activeLocks.size === 0) {
      document.body.style.removeProperty('overflow');
      document.documentElement.style.removeProperty('overscroll-behavior');
    }
  };

  onBeforeUnmount(() => {
    unlockScroll();
  });

  return {
    lockScroll,
    unlockScroll,
  };
}
