<template>
  <div class="console mdl-shadow--4dp mb-8 relative z-1">
    <div class="console__head">
      <div class="console__dot console__dot--red"></div>
      <div class="console__dot console__dot--yellow"></div>
      <div class="console__dot console__dot--green"></div>
    </div>
    <div class="console__body">
      <kbd class="console__prompt"><span class="text-green-600">[2020-10-31T09:52:16.714] [INFO ] [TSED]</span> - Call hook $beforeListen</kbd>
      <kbd class="console__prompt"><span class="text-orange-600">[2020-10-31T09:52:16.718] [DEBUG] [TSED]</span> - Listen server on <span class="text-blue underline">http://0.0.0.0:8083</span></kbd>
      <kbd class="console__prompt"><span class="text-red-600">[2020-10-31T09:52:16.718] [ERROR] [TSED]</span> - Call hook $afterListen</kbd>
    </div>
  </div>
</template>
<style>
.console {
  max-width: 500px;
  text-align: left;
  border-radius: 5px;
  box-shadow: 0 4px 5px 0 rgba(0, 0, 0, .14), 0 1px 10px 0 rgba(0, 0, 0, .12), 0 2px 4px -1px rgba(0, 0, 0, .2);
  color: #fff;
}

.console__head {
  overflow: hidden;
  background-color: #d5d5d5;
  padding: 8px 15px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}

.console__dot {
  float: left;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: 7px;
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, .2);
}

.console__dot--red {
  background-color: #ff6057;
}

.console__dot--yellow {
  background-color: #ffc22e;
}

.console__dot--green {
  background-color: #28ca40;
}

.console__body {
  background-color: #1e1e1e;
  padding: 30px 17px 20px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}

.console__prompt {
  display: block;
  margin-bottom: 15px;
  font-family: "Source Code Pro", monospace;
  font-size: 13px;
  background: 0;
  border: 0;
}

</style>
