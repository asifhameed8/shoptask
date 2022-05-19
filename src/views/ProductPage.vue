<template>
  <div class="main-wrpper">
    <div class="d-flex align-center justify-space-between">
      <h1>Products</h1>
      <v-btn @click="showModal = true" color="primary">Add Product</v-btn>
    </div>
    <div class="mt-4">
      <v-data-table
        @click:row="handleRowClick"
        :headers="headers"
        :items="productList"
        class="elevation-1"
      >
      <template v-slot:item="props">
        <tr>
          <td>{{ props.item.name }}</td>
          <td>{{ props.item.price }}</td>
          <td>{{ props.item.description }}</td>
          <td>{{ props.item.isPublish ? 'Approved' : props.item.changeRequest ?  'Rejected' : 'Pending' }}</td>
          <td>{{ props.item.changeRequest && props.item.changeRequest }}</td>
          <td>
            <div>
              <v-btn small color="primary" @click="editData = props.item; showModal = true">Edit</v-btn>
            </div>
          </td>
        </tr>
      </template>
      </v-data-table>
    </div>
    <v-dialog v-model="showModal" persistent>
      <v-card v-model="showModal" class="pa-5" >
        <v-card-text>
          <ProductForm :data="editData" @onClose="showModal = false; editData = null" @refresh="getProducts" />
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>

import axios from 'axios'
import ProductForm from '../components/ProductForm.vue'

export default {
  name: 'AddProduct',
  components: {
    ProductForm
  },
  data() {
    return {
      showModal: false,
      isAdd: false,
      isEdit: false,
      productList: [],
      editData: null,
      headers: [
        { text: 'name', value: 'name' },
        { text: 'price', value: 'price' },
        { text: 'description', value: 'description' },
        { text: 'Status', value: 'isPublish'},
        { text: 'Admin Remarks', value: 'changeRequest'},
        { text: 'Action', value: 'action'}
      ],
    }
  },
  created(){
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
        this.productList = all.reverse()
        console.log(all)
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
