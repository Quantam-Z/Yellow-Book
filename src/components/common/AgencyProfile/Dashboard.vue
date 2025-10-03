<template>
    <div class="w-full min-h-screen bg-gray-50 p-4">
      <!-- Header Section -->
      <div
        class="w-full rounded-lg bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 p-4 mb-4"
      >
        <h1 class="text-2xl font-bold text-gray-900 mb-2">My Assigned Tasks</h1>
      </div>
  
      <!-- Stats Section -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div class="flex items-center justify-between p-5 rounded-lg bg-white border shadow-sm">
          <div>
            <p class="text-gray-600 font-medium">Total Reviews</p>
            <p class="text-3xl font-semibold">458</p>
          </div>
          <MessageSquare class="h-12 w-12 text-purple-500" />
        </div>
  
        <div class="flex items-center justify-between p-5 rounded-lg bg-white border shadow-sm">
          <div>
            <p class="text-gray-600 font-medium">Average Rating</p>
            <p class="text-3xl font-semibold">4.8</p>
          </div>
          <Star class="h-12 w-12 text-yellow-500" />
        </div>
  
        <div class="flex items-center justify-between p-5 rounded-lg bg-white border shadow-sm">
          <div>
            <p class="text-gray-600 font-medium">Verification</p>
            <p class="text-3xl font-semibold text-green-600">Verified</p>
          </div>
          <ShieldCheck class="h-12 w-12 text-green-500" />
        </div>
  
        <div class="flex items-center justify-between p-5 rounded-lg bg-white border shadow-sm">
          <div>
            <p class="text-gray-600 font-medium">Profile Complete</p>
            <p class="text-3xl font-semibold">458</p>
          </div>
          <UserCheck class="h-12 w-12 text-blue-500" />
        </div>
      </div>
  
      <!-- Review Trend Graph -->
      <div class="rounded-lg bg-white border p-6 shadow-sm mb-6">
        <h2 class="text-lg font-semibold mb-4">Review Trend</h2>
        <Line :data="chartData" :options="chartOptions" class="w-full h-64" />
      </div>
  
      <!-- Latest Review Table -->
      <div class="rounded-lg bg-white border p-6 shadow-sm">
        <h2 class="text-lg font-semibold mb-4">Latest Reviews</h2>
        <div class="overflow-x-auto">
          <table class="min-w-full border border-gray-200 text-sm">
            <thead class="bg-gray-100">
              <tr>
                <th class="px-4 py-2 text-left">Reviewer</th>
                <th class="px-4 py-2 text-left">Rating</th>
                <th class="px-4 py-2 text-left">Comment</th>
                <th class="px-4 py-2 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-t">
                <td class="px-4 py-2 font-medium text-gray-800">John Doe</td>
                <td class="px-4 py-2">
                  <div class="flex items-center gap-1">
                    <Star
                      v-for="i in 5"
                      :key="i"
                      class="h-4 w-4"
                      :class="i <= 4 ? 'text-yellow-500' : 'text-gray-300'"
                    />
                  </div>
                </td>
                <td class="px-4 py-2 text-gray-600">
                  Great experience! Very responsive.
                </td>
                <td class="px-4 py-2 text-gray-500">2 days ago</td>
              </tr>
              <tr class="border-t">
                <td class="px-4 py-2 font-medium text-gray-800">Jane Smith</td>
                <td class="px-4 py-2">
                  <div class="flex items-center gap-1">
                    <Star
                      v-for="i in 5"
                      :key="i"
                      class="h-4 w-4"
                      :class="i <= 5 ? 'text-yellow-500' : 'text-gray-300'"
                    />
                  </div>
                </td>
                <td class="px-4 py-2 text-gray-600">
                  Excellent service, exceeded expectations.
                </td>
                <td class="px-4 py-2 text-gray-500">5 days ago</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { Star, ShieldCheck, MessageSquare, UserCheck } from "lucide-vue-next";
  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    LineElement,
    PointElement,
    LinearScale,
    CategoryScale,
  } from "chart.js";
  import { Line } from "vue-chartjs";
  
  // Register Chart.js modules
  ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, LinearScale, CategoryScale);
  
  // Dummy chart data
  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Reviews",
        data: [40, 65, 80, 55, 90, 70],
        borderColor: "#4f46e5",
        backgroundColor: "rgba(79,70,229,0.2)",
        tension: 0.4,
        fill: true,
      },
    ],
  };
  
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
  };
  </script>
  
  <style scoped>
  /* optional custom styles */
  </style>
  