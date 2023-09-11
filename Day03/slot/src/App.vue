<script>
  import Content from "./components/Content.vue";
  export default {
    components:{
      Content
    }
  }
</script>

<template>
  <div>
    <Content><button>按钮</button></Content>
    <Content><input></Content>

    <Content>
      <template v-slot:button><button>按钮</button></template>
      <template v-slot:input><input></template>
      <template v-slot:h2><h2>插槽</h2></template>
    </Content>

    <Content>
      <template v-slot:default="slotProps">
        <ul>
          <li v-for="item in slotProps.list" :key="item">
            {{item}}
          </li>
        </ul>
      </template>
    </Content>
    <Content>
      <template v-slot:default="slotProps">
        <ol>
          <li v-for="item in slotProps.list" :key="item">
            {{item}}
          </li>
        </ol>
      </template>
    </Content>
  </div>
</template>

<style scoped>

</style>
