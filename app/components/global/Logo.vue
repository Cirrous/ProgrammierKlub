<template lang="pug">
NuxtLink.logo(to="/")
  img.logo__img.logo__img--light(src="@/assets/logos/Logo.png" alt="" width="1162" height="1158")
  img.logo__img.logo__img--dark(src="@/assets/logos/Logo_Dark2.png" alt="" width="1162" height="1158")
  span.logo__text Programmier
    span.logo__accent Klub
</template>

<style scoped>
.logo {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-head);
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: -0.01em;
}

.logo__img {
  width: auto;
  height: 3rem;
}

.logo__img--dark {
  display: none;
}

:global(.dark) .logo__img--light {
  display: none;
}

:global(.dark) .logo__img--dark {
  display: block;
}

.logo__accent {
  color: var(--color-primary);
}
</style>
