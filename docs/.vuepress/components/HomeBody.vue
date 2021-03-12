<template>
  <div class="home-body relative">
    <div class="w-full max-w-site mx-auto px-5 py-5 md:py-10">
      <p class="text-center font-normal text-xl m-auto max-w-lg">Here are some of the libraries and technologies
        that we
        use or support with this <strong>framework</strong></p>

      <div class="mt-5 pt-5">
        <Frameworks />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "HomeBody"
};
</script>
<style>
.content__default h2.preview-title {
  @apply text-center text-4xl normal-case p-0 m-0 text-blue;
}
.bg-gradient:after {
  content: "";
  background-image: radial-gradient(#eef2f5 0, #f4f7f8 40%, transparent 75%);
  position: absolute;
  top: 0;
  right: 0;
  width: 60%;
  height: 100%;
  z-index: 0;
}
.sandbox-logo {
  @apply absolute flex items-center justify-center left-0 top-0 h-full w-full;

  svg {
    min-width: 800px;
    transform: translateX(3px);
    fill: theme('colors.white');
  }
}
</style>