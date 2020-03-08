<template>
  <v-layout row wrap class="px-1">
    <v-flex v-for="product in products" :key="product" xs2 class="px-2">
      <router-link class="hyperlink" :to="{name: 'ProductDetailPage', params: {id: product.id}}">
        <v-card :title="product.name">
          <v-img class="white--text align-end" height="240" :src="product.preview_image.path">
            <v-card-actions>
              <!-- <v-btn icon flat >
                <v-icon>mdi-heart</v-icon>
              </v-btn> -->
              <v-btn icon flat color="yellow darken-2" v-if="product.id % 2 == 0 " >
                <v-icon>mdi-star</v-icon>
              </v-btn>
            </v-card-actions>
          </v-img>

          <!-- <v-card-title>Top western road trips</v-card-title> -->
          <!-- <v-card-subtitle>1,000 miles of wonder</v-card-subtitle> -->
        </v-card>
        <!-- 
      <v-card class="ma-2">
        
        {{product.name}}
        </v-card>-->
      </router-link>
    </v-flex>
  </v-layout>
</template>

<script>
import axios from "axios";
import Constant from "@/constant";
export default {
  props: {
    filter: {
      active: Boolean,
      sort: {
        type: String,
        required: false
      },
      limit: {
        type: Number,
        default: 10
      }
    }
  },
  data() {
    return {
      products: []
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      axios
        .post(
          Constant.API_PRODUCT_URL,
          {
            active: this.filter.active,
            limit: this.filter.limit
          },
          {
            headers: {
              "X-Requested-With": "XMLHttpRequest",
              "X-OCTOBER-REQUEST-HANDLER": "onGetAllProducts",
              "X-OCTOBER-REQUEST-PARTIALS": ""
              // 'Host': 'localhost',
              // 'Connection': 'keep-alive',
              // 'Content-Length': 0,
              // 'DNT': 1,
              // 'Origin':'http://localhost',
              // 'Sec-Fetch-Site': 'same-origin',
              // 'Sec-Fetch-Mode': 'cors'
            }
          }
        )
        .then(response => {
          //   alert(JSON.stringify(response.data))
          this.products = response.data;
        })
        .catch(() => {
          //bus.$emit('flash', 'I could not retrieve your user profile from the server.', 'danger')
        });
    }
  }
};
</script>