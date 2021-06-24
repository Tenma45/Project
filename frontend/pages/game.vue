<template>
  <div>
    <b-container class="my-5">
      <b-row>
        <b-col cols="12">
          <h1 class="b">เกมส์ตอบคําถาม</h1>
          <hr class="my-3" />
        </b-col>
        <b-col cols="12" class="text-center">
          <b-embed
            type="iframe"
            aspect="16by9"
            src="/game/index.html"
          ></b-embed>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  layout: 'headerguest',
}
</script>

<style>
.b {
  color: darkslategray;
  font-family: 'K2D', sans-serif;
  font-size: 45px;
  text-align: center;
}
</style>
