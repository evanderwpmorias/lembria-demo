<template>
  <footer class="border-t  px-2 py-4 text-center">
        <div>
        <p class="mt-2">&copy; {{ currentYear }} Lembria. All rights reserved.</p>
      </div>
  </footer>
</template>

<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>