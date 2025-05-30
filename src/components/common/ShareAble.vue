<template>
    <div>
        <div class="my-2">
            <div class="mb-2">
                <button class="mr-2" @click="shareRedirect('facebook')">
                    <Icon size="30" color="#1877F2" name="mdi-facebook"></Icon>
                </button>
                <button class="mr-2" @click="shareRedirect('messenger')">
                    <Icon size="30" color="#1DA1F2" name="mdi-facebook-messenger"></Icon>
                </button>
                <button class="mr-2" @click="shareRedirect('linkedin')">
                    <Icon size="30" color="#0A66C2" name="mdi-linkedin"></Icon>
                </button>
                <button class="mr-2" @click="shareRedirect('whatsapp')">
                    <Icon size="30" color="#25D366" name="mdi-whatsapp"></Icon>
                </button>
            </div>
        </div>
    </div>
</template>
<script setup>
const props = defineProps({
    title: { type: String, default: "" },
});
const shareableLink = computed(() => {
    return window.location.origin + "/giantdevs/" + props.title;
});

const shareRedirect = (type) => {
    let url = "";

    if (type === "facebook")
        url = `https://www.facebook.com/sharer.php?u=${shareableLink}`;
    else if (type === "twitter")
        url = `https://twitter.com/share?url=${shareableLink}&text=${props.title}`;
    else if (type === "linkedin")
        url = `https://www.linkedin.com/shareArticle?url=${shareableLink}&title=${props.title}`;
    else if (type === "whatsapp")
        url = `https://wa.me/?text=${props.title} ${shareableLink}`;
    else if (type === "messenger")
        url = `fb-messenger://share/?link=${props.title} ${shareableLink}`;
    if (url) window.open(url, "_blank");
};
</script>