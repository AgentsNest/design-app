<template>
  <Layout>
    <div class="my-pdfs w-full relative pb-6">
      <div class="mb-2 grid grid-cols-2 gap-4">
        <Suspense>
          <template #default>
            <div
              class="bg-white shadow rounded-md h-36"
              v-for="graphic in graphics"
              :key="graphic"
            >
              <Card />
            </div>
          </template>
          <template #fallback>
            <Skeleton />
          </template>
        </Suspense>
      </div>
    </div>
  </Layout>
</template>

<script setup>
import Card from "./Card.vue";
import Skeleton from "./Skeleton.vue";
import Layout from "../../Layout/layout.vue";
</script>
