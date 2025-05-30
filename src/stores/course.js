import { defineStore } from "pinia";

export const useCourseStore = defineStore("course", {
  state: () => ({
    course: ref({}),
    isLoading: ref(false),
  }),
  actions: {
    setCourse(nm) {
      this.course = nm;
    },
    setLoading(nm){
        this.course = nm;
    }
  },
});
