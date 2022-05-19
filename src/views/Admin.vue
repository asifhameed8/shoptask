<template>
  <div class="main-wrpper">
    <h1>Products List</h1>
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
          <td>{{ props.item.isPublish ? 'Published' : 'Not Published' }}</td>
          <td>
            <div v-if="!props.item.isPublish">
              <v-btn 
                small
                class="mr-3"
                color="error" 
                @click="selectedProduct = props.item; isChangeRequest = true"
              >
                Reject
              </v-btn>
              <v-btn 
                small
                color="primary" 
                @click="updateProduct({ id: props.item.id, isPublish: !props.item.isPublish, changeRequest: '' })"
              >
                Approve
              </v-btn>
            </div>
          </td>
          <td>
            <v-btn 
                v-if="!!props.item.productChanges && !props.item.isPublish"
                small
                color="info" 
                @click="allChanges = props.item.productChanges; changesModal = true"
              >
                View Changes
              </v-btn>
          </td>
        </tr>
      </template>
    </v-data-table>
    <v-dialog v-model="isChangeRequest" width="600px">
      <v-card class="pa-5" >
        <v-card-text>
          <p>Change Request</p>
          <v-text-field autofocus v-model="changeRequest" outlined />
          <div class="d-flex mt-2 align-center">
            <v-btn class="mr-3" @click="rejectProduct">Reject</v-btn>
            <v-btn color="primary" @click="isChangeRequest = false">Cancel</v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog v-model="changesModal" width="600px">
      <v-card v-if="changesModal" class="pa-5" >
        <v-card-text>
          <h3 class="mb-1">View Changes</h3>  
          <div v-for="(item, key) in getChangesValue" :key="key">
            <div>{{ item }}</div>
          </div>
          <center>
            <v-btn class="mt-4" @click="changesModal = false" color="primary" >Cancel</v-btn>
          </center>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>

import axios from 'axios'

export default {
  name: 'Admin',
  components: {
  },
  data() {
    return {
      isChangeRequest: false,
      productList: [],
      allChanges : null,
      changesModal : false,
      changeRequest: null,
      selectedProduct: null,
      headers: [
          { text: 'name', value: 'name' },
          { text: 'price', value: 'price' },
          { text: 'description', value: 'description' },
          { text: 'Status', value: 'isPublish'},
          { text: 'Action', value: 'isPublish'},
          { text: 'Activity Log', value: 'log'}
        ],
    }
  },
  created(){
    this.getProducts()
  },
  computed: {
    getChangesValue() {
      let data = []
      console.log([this.allChanges])
      Object.keys(this.allChanges).map((key, index) => {
        data.push(`${key}: ${this.allChanges[key]}`)
      })
      return data
    },
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
        this.productList = all
        console.log(all)
      }).catch((err)=> {
        console.log(err)
      })
    },
    rejectProduct() {
      this.updateProduct({ id: this.selectedProduct.id, changeRequest: this.changeRequest})
    },
    updateProduct(data) {
      axios.put('http://localhost:5000/products/updateProduct', data).then((res) => {
        this.isChangeRequest = false,
        this.productChanges = ''
        this.getProducts()
      }).catch((err)=> {
        console.log(err)
      })
    },
    handleRowClick(val) {
      
    }

  }
  
}
</script>

<style  scoped>
  .main-wrpper {
    padding: 20px
  }
</style>
