<script setup></script>

<template>
  <header>
    <h1>Oh for <code>fs</code> sake...</h1>
  </header>

  <main>
    <h1>Upload Image</h1>
    <form>
      <input type="file" name="newFile" accept="image/*, .md" />
      <button type="submit">UPLOAD</button>
    </form>
  </main>
</template>

<style scoped></style>
