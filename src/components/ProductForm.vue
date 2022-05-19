<template>
  <div class="main-wrpper">
    <div class="d-flex align-center justify-space-between">
      <h1>{{ !!data ? 'Edit' : 'Add'}} product</h1>
    </div>
    <div>
      <div class="primary--text mt-3 mb-2">Product Name</div>
      <v-text-field v-model="productName" outlined hide-details dense />
      <div class="primary--text mt-3 mb-2">Product Price</div>
      <v-text-field v-model="productPrice" outlined hide-details dense />
      <div class="primary--text mt-3 mb-2">Product Description</div>
      <v-textarea v-model="productDescription" outlined hide-details dense />
      <center>
        <v-btn @click="!!data ? updateProduct() : createProduct()" class="mt-3 mr-4" elevation="2" color="primary">Submit</v-btn>
        <v-btn @click="$emit('onClose')" class="mt-3" elevation="2" color="secondary">Cancel</v-btn>
      </center>
    </div>
  </div>
</template>

<script>

import axios from 'axios'

export default {
  name: 'ProductForm',
  props: ['type', 'data'],
  data() {
    return {
      productName : '',
      productDescription: '',
      productPrice: ''
    }
  },
  mounted() {
    if(this.data) {
      this.productName = this.data.name
      this.productDescription = this.data.description
      this.productPrice = this.data.price
    }
  },
  methods: {
    createProduct() {
      const data = {
        name: this.productName,
        price: this.productPrice,
        description: this.productDescription
      }
      axios.post('http://localhost:5000/products/createProduct', data).then((res) => {
        this.$emit('refresh')
        this.$emit('onClose')
      }).catch((err)=> {
        console.log(err)
      })
    },
    updateProduct() {
      const newData = {
        name: this.productName,
        price: this.productPrice,
        description: this.productDescription,
        isPublish: false
      }
      const req = {
        newData: newData, 
        oldData: this.data
      }
      axios.put('http://localhost:5000/products/updateWithActivity', req).then((res) => {
        this.$emit('refresh')
        this.$emit('onClose')
      }).catch((err)=> {
        console.log(err)
      })
    },
    handleRowClick(val) {
      this.editData = val
    }

  }
  
}
</script>

<style  scoped>
  .main-wrpper {
    padding: 20px
  }
</style>
