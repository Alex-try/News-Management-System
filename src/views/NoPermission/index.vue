<template>
  <div>
    <h1>No Permission</h1>
    <p>You have no access to visit the page.</p>
    <hr />
    <address>http://localhost:8081/#/</address>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
div {
  display: block;
  margin: 50px;
  h1 {
    display: block;
    font-size: 4em;
    margin-block-start: 0.67em;
    margin-block-end: 0.67em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
  }
  p {
    font-size: 2em;
    display: block;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
  }
  hr {
    font-size: 1em;
    display: block;
    unicode-bidi: isolate;
    margin-block-start: 0.5em;
    margin-block-end: 0.5em;
    margin-inline-start: auto;
    margin-inline-end: auto;
    overflow: hidden;
    border-style: inset;
    border-width: 1px;
  }
  address {
    display: block;
    font-style: italic;
  }
}
</style>
