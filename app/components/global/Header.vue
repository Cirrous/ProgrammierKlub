<template lang="pug">
header.site-header
  .container.site-header__inner
    Logo

    nav.site-header__nav.show-md(aria-label="Hauptnavigation")
      NuxtLink.nav-link(v-for="link in mainNav" :key="link.href" :to="link.href") {{ link.label }}

    NuxtLink.btn.show-md(to="/workshops#tickets")
      svg.icon(xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true")
        path(d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z")
        path(d="M13 5v2")
        path(d="M13 17v2")
        path(d="M13 11v2")
      | Tickets sichern

    button.btn.btn--outline.btn--icon.hide-md(
      type="button"
      aria-label="Menü öffnen"
      aria-haspopup="dialog"
      :aria-expanded="isOpen"
      @click="open"
    )
      svg.icon-lg(xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true")
        path(d="M4 6h16")
        path(d="M4 12h16")
        path(d="M4 18h16")

  Teleport(to="body")
    Transition(name="sheet")
      .sheet(v-if="isOpen" @click.self="close")
        .sheet__panel(role="dialog" aria-modal="true" aria-labelledby="sheet-title")
          .sheet__header
            #sheet-title
              Logo(@click="close")
            button.sheet__close(ref="closeButton" type="button" aria-label="Menü schließen" @click="close")
              svg.icon(xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true")
                path(d="M18 6 6 18")
                path(d="m6 6 12 12")

          nav.sheet__nav(aria-label="Hauptnavigation (mobil)")
            NuxtLink.nav-link.nav-link--lg(v-for="link in mainNav" :key="link.href" :to="link.href" @click="close") {{ link.label }}

          .sheet__footer
            NuxtLink.btn.btn--block(to="/workshops#tickets" @click="close")
              svg.icon-sm(xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true")
                path(d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z")
                path(d="M13 5v2")
                path(d="M13 17v2")
                path(d="M13 11v2")
              | Tickets sichern
</template>

<script setup lang="ts">
const isOpen = ref(false);
const closeButton = ref<HTMLButtonElement | null>(null);

function open() {
  isOpen.value = true;
}

function close() {
  isOpen.value = false;
}

function onKeydown(event: KeyboardEvent) {
  if (event.key === "Escape") close();
}

watch(isOpen, async (value) => {
  document.body.style.overflow = value ? "hidden" : "";
  if (value) {
    window.addEventListener("keydown", onKeydown);
    await nextTick();
    closeButton.value?.focus();
  } else {
    window.removeEventListener("keydown", onKeydown);
  }
});

onBeforeUnmount(() => {
  document.body.style.overflow = "";
  window.removeEventListener("keydown", onKeydown);
});
</script>

<style scoped>
.site-header {
  position: sticky;
  top: 0;
  z-index: 40;
  border-bottom: 2px solid var(--color-border);
  background-color: color-mix(
    in srgb,
    var(--color-background) 95%,
    transparent
  );
  backdrop-filter: blur(8px);
}

@supports (backdrop-filter: blur(1px)) {
  .site-header {
    background-color: color-mix(
      in srgb,
      var(--color-background) 80%,
      transparent
    );
  }
}

.site-header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  height: var(--header-height);
}

.site-header__nav {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

/* Mobile Sheet (Teleport → body, scoped Styles greifen trotzdem) */
.sheet {
  position: fixed;
  inset: 0;
  z-index: 50;
  background-color: var(--color-overlay);
}

.sheet__panel {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 20rem;
  background-color: var(--color-background);
  border-left: 2px solid var(--color-border);
  overflow-y: auto;
}

.sheet__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem;
  border-bottom: 2px solid var(--color-border);
}

.sheet__close {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.25rem;
  border: 0;
  border-radius: var(--radius-md);
  background: none;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity var(--transition-fast);
}

.sheet__close:hover {
  opacity: 1;
}

.sheet__nav {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 1rem;
}

.sheet__footer {
  margin-top: auto;
  padding: 1rem;
}

/* Transition */
.sheet-enter-active,
.sheet-leave-active {
  transition: background-color var(--transition-base);
}

.sheet-enter-active .sheet__panel,
.sheet-leave-active .sheet__panel {
  transition: transform var(--transition-base);
}

.sheet-enter-from,
.sheet-leave-to {
  background-color: transparent;
}

.sheet-enter-from .sheet__panel,
.sheet-leave-to .sheet__panel {
  transform: translateX(100%);
}

@media (prefers-reduced-motion: reduce) {
  .sheet-enter-active,
  .sheet-leave-active,
  .sheet-enter-active .sheet__panel,
  .sheet-leave-active .sheet__panel {
    transition: none;
  }
}
</style>
