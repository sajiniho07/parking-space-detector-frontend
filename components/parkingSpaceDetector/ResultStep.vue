<template>
    <div>
        <h2 class="text-2xl font-bold mb-2.5">Result</h2>
        <p>Selected Test Media ID: {{ this.mediaId }}</p>
        <div v-if="error" class="text-red-500">{{ error.message }}</div>
        <div v-if="pending" class="text-gray-500">Loading...</div>
        <div v-if="uploadedFileUrl" class="flex flex-col items-center justify-center p-4 border rounded shadow-md mt-2">
            <video v-if="uploadedFileUrl" controls :src="uploadedFileUrl" type="video/mp4">
                Your browser does not support HTML video.
            </video>
        </div>
    </div>
</template>
<script>
export default {
    name: 'ResultStep',
    props: {
        mediaId: {
            type: Number,
            required: true,
        },
        modelId: {
            type: Number,
            required: true,
        },
    },
    data() {
        return {
            uploadedFileUrl: null,
            pending: true,
            error: null,
        }
    },
    async created() {
        await this.fetchMedia();
    },
    methods: {
        async fetchMedia() {
            try {
                const response = await $fetch(`/api/media/getParkingSlotDetectorResult?mediaId=${this.mediaId}&modelId=${this.modelId}`);
                
                if (response.id > 0) {
                    this.uploadedFileUrl = response.name;
                    this.error = null;
                } else {
                    this.uploadedFileUrl = null;
                    this.error = result.message;
                }
                    
            } catch (err) {
                this.error = err;
            } finally {
                this.pending = false;
            }
        },
    }
}
</script>