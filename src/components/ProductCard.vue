<template>
  <v-card hover shaped>
    <v-card-text style="background-color: 'red'">
      <p class="text-h4 text--primary">
        {{ data.name && data.name }}
      </p>
      <p> {{ data.price && data.price }}</p>
      <div class="text--primary">
        {{ data.description && data.description  }}
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    name: 'ProductCard',
    props: ['data'],
    data: () => ({
      
    }),
  }
</script>
