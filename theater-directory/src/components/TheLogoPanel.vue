<template>
  <div class="logos">
    <img alt="AATP logo" class="logo" src="@/assets/aatp-logo.jpeg" />
    <img alt="BLACKstage logo" class="logo" src="@/assets/blackstage-logo.png" />
    <img alt="Theater Lab logo" class="logo" src="@/assets/theaterlab-logo.png" />
  </div>
</template>

<style>
.logos {
  display: flex;
  height: 10vh;
}
.logos img {
  object-fit: contain;
}

@media (max-width: 800px) {
  .logos {
    max-height: 10vh;
  }
  .logos img {
    height: 100%;
  }
}
</style>