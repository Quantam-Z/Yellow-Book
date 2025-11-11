import { onBeforeUnmount, onMounted } from 'vue';

type EventTargetResolvable<T extends EventTarget = EventTarget> =
  | T
  | null
  | undefined
  | (() => T | null | undefined);

type EventListenerOptionsWithImmediate = AddEventListenerOptions & {
  /**
   * When true, invoke the listener once immediately after the target is resolved.
   * Useful for syncing initial state that normally depends on the event.
   */
  immediate?: boolean;
};

const resolveTarget = <T extends EventTarget>(target: EventTargetResolvable<T>) => {
  if (typeof target === 'function') {
    return target() ?? null;
  }
  return target ?? null;
};

/**
 * Register a DOM event listener in a Nuxt/Vue environment with full SSR safety.
 * The listener is attached only on the client, automatically cleaned up, and
 * can optionally fire immediately after mounting to prime reactive state.
 */
export function useClientEventListener<TEvent extends Event = Event>(
  target: EventTargetResolvable,
  event: string,
  listener: (event: TEvent) => void,
  options: EventListenerOptionsWithImmediate = {},
) {
  const { immediate = false, ...listenerOptions } = options;

  onMounted(() => {
    if (!import.meta.client) return;
    const resolvedTarget = resolveTarget(target);
    resolvedTarget?.addEventListener(event, listener as EventListener, listenerOptions);
    if (immediate && resolvedTarget && typeof listener === 'function') {
      listener.call(resolvedTarget, new Event(event) as TEvent);
    }
  });

  onBeforeUnmount(() => {
    if (!import.meta.client) return;
    const resolvedTarget = resolveTarget(target);
    resolvedTarget?.removeEventListener(event, listener as EventListener, listenerOptions);
  });
}

