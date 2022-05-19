<template>
  <div class="pa-4">
    <h1 class="mb-3">All Products</h1>
    <div>
        <v-container>
          <v-row>
            <v-col
              v-for="(item, key) in allProducts"
              :key="key"
              cols="12"
              sm="4"
            >
              <ProductCard :data="item" />
            </v-col>
          </v-row>
        </v-container>
    </div>
  </div>
</template>

<script>
  import ProductCard from '../components/ProductCard.vue'
  import axios from 'axios'
  export default {
    name: 'Home',
    components: {
      ProductCard
    },
    data() {
      return {
        allProducts: []
      }
    },
    created() {
      this.getProducts()
    },
    methods: {
      getProducts() {
        axios.get('http://localhost:5000/products/getProducts').then((res) => {
          const data  = res.data.products.data
          const all = []
          for (const key in data) {
            const innerData =  data[key]
            const id = key
            const innerKeys = {}
            for (const key in innerData) { 
              innerKeys[key] = innerData[key];
            }
            all.push({ id, ...innerKeys })
          }
          this.allProducts = all.filter((res)=> res.isPublish === true)
          console.log(all)
        }).catch((err)=> {
          console.log(err)
        })
      },
    }
  }
</script>
