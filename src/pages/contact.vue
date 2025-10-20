<template>
    <div class="p-8">
      <h1 class="text-3xl font-bold mb-4">Contact Us</h1>
      <form class="space-y-4 w-full">
        <div>
          <label class="block mb-1 font-medium">Name</label>
          <input type="text" class="w-full border rounded p-2" placeholder="Your Name" />
        </div>
        <div>
          <label class="block mb-1 font-medium">Email</label>
          <input type="email" class="w-full border rounded p-2" placeholder="Your Email" />
        </div>
        <div>
          <label class="block mb-1 font-medium">Message</label>
          <textarea class="w-full border rounded p-2" rows="5" placeholder="Your Message"></textarea>
        </div>
        <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded">
          Send
        </button>
      </form>
    </div>
  </template>
  
  <script setup>
  useHead({
    title: 'Contact Us - Yellow Book',
    meta: [{ name: 'description', content: 'Get in touch with Yellow Book Tourism' }]
  })
  </script>
  