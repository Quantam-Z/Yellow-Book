<template>
    <div class="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center" @click.self="closeModal">
        
        <div class="relative w-full max-w-lg mx-auto p-6">
            
            <div class="relative rounded-2xl bg-white flex flex-col items-center p-6 box-border gap-6 text-center text-[16px] text-gray font-plus-jakarta-sans">
                
                <button 
                    class="absolute top-4 right-4 text-gray-500 hover:text-gray-900" 
                    @click="closeModal"
                    aria-label="Close"
                >
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>

                <b class="self-stretch relative text-num-18 leading-[160%] capitalize text-black">Review Details</b>

                <div class="w-full [filter:drop-shadow(0px_0px_14px_rgba(0,_0,_0,_0.12))] rounded-2xl border-whitesmoke border-solid border-[1px] box-border flex flex-col items-center py-6 px-num-16 gap-4 text-left">
                    
                    <div class="self-stretch flex items-start gap-4">
                        <div class="w-[212px] flex items-center gap-4">
                            <div class="flex-1 relative leading-[130%] capitalize font-semibold">Reviewer Name</div>
                            <b class="relative text-num-18 leading-[160%] capitalize text-center">:</b>
                        </div>
                        <div class="flex-1 relative leading-[160%] capitalize text-darkslategray">John Doe</div>
                    </div>
                    
                    <div class="self-stretch h-px relative border-whitesmoke border-dashed border-t-[1px] box-border" />
                    
                    <div class="self-stretch flex items-start gap-4">
                        <div class="w-[211px] flex items-center gap-4">
                            <div class="flex-1 relative leading-[130%] capitalize font-semibold">Email</div>
                            <b class="relative text-num-18 leading-[160%] capitalize text-center">:</b>
                        </div>
                        <div class="flex-1 relative leading-[160%] text-darkslategray">john.doe@example.com</div>
                    </div>
                    
                    <div class="self-stretch h-px relative border-whitesmoke border-dashed border-t-[1px] box-border" />
                    
                    <div class="self-stretch flex items-start gap-4">
                        <div class="w-[211px] flex items-center gap-4">
                            <div class="flex-1 relative leading-[130%] capitalize font-semibold">Company </div>
                            <b class="relative text-num-18 leading-[160%] capitalize text-center">:</b>
                        </div>
                        <div class="flex-1 relative leading-[160%] capitalize text-darkslategray">Tech Solution LTD</div>
                    </div>
                    
                    <div class="self-stretch h-px relative border-whitesmoke border-dashed border-t-[1px] box-border" />
                    
                    <div class="self-stretch flex items-center gap-4">
                        <div class="w-[211px] flex items-center gap-4">
                            <div class="flex-1 relative leading-[130%] capitalize font-semibold">Rating</div>
                            <b class="relative text-num-18 leading-[160%] capitalize text-center">:</b>
                        </div>
                        <div class="flex items-center gap-1">
                            <img class="h-6 w-6 relative text-yellow-400" alt="Star" />
                            <img class="h-6 w-6 relative text-yellow-400" alt="Star" />
                            <img class="h-6 w-6 relative text-yellow-400" alt="Star" />
                            <img class="h-6 w-6 relative text-yellow-400" alt="Star" />
                        </div>
                    </div>
                    
                    <div class="self-stretch h-px relative border-whitesmoke border-dashed border-t-[1px] box-border" />
                    
                    <div class="self-stretch flex items-start gap-4">
                        <div class="w-[211px] flex items-center gap-4">
                            <div class="flex-1 relative leading-[130%] capitalize font-semibold">Review</div>
                            <b class="relative text-num-18 leading-[160%] capitalize text-center">:</b>
                        </div>
                        <div class="flex-1 relative leading-[160%] capitalize text-darkslategray">Great experience working with this company. They were professional and helpful throughout.</div>
                    </div>
                </div>

                <div class="self-stretch flex items-center gap-4">
                    <div class="flex-1 rounded bg-gold flex items-center justify-center py-num-16 px-8">
                        <div class="relative leading-[130%] capitalize font-semibold">Approved</div>
                    </div>
                    <div class="flex-1 rounded bg-firebrick flex items-center justify-center py-num-16 px-8 text-white">
                        <div class="relative leading-[130%] capitalize font-semibold">Reject</div> </div>
                    <div class="flex-1 rounded border-gainsboro border-solid border-[1px] flex items-center justify-center py-num-16 px-8">
                        <div class="relative leading-[130%] capitalize font-semibold">On-Hold</div>
                    </div>
                    <div class="flex-1 rounded border-gainsboro border-solid border-[1px] flex items-center justify-center py-num-16 px-8">
                        <div class="relative leading-[130%] capitalize font-semibold">Ban Reviewer</div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup>
// Assuming you are using Vue 3 Composition API

/**
 * Emits an event to notify the parent component that the modal should be closed.
 */
const emit = defineEmits(['close']);

const closeModal = () => {
  emit('close');
};
</script>