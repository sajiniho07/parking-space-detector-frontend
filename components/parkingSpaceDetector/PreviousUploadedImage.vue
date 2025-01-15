<template>
    <div class="container mx-auto pt-6">
        <div class="flex items-center mb-3">
            <h2 class="text-xl font-bold">Submitted Medias</h2>
            <button @click="fetchMedia()"
                class="m-2 flex items-center rounded-md border border-slate-300 py-2 px-4 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800"
                type="button">
                reload
            </button>
            <button @click="selectMedia(null)"
                class="m-2 flex items-center rounded-md border border-slate-300 py-2 px-4 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800"
                type="button">
                deselect
            </button>
        </div>
        <div v-if="error" class="text-red-500">{{ error.message }}</div>
        <div v-if="pending" class="text-gray-500">Loading...</div>
        <ul v-if="mediaList && mediaList.length > 0" class="space-y-4">
            <li v-for="media in mediaList" :key="media.id"
                class="flex justify-between items-center p-4 border rounded shadow">
                <div class="flex items-center">
                    <a @click="selectMedia(media)" class="cursor-pointer text-blue-500 hover:underline">{{ media.name }}</a>
                    <img v-if="!media.refId" :src="media.path" alt="Uploaded Image" class="m-1 size-16 rounded shadow-md" />
                </div>
                <button @click="deleteMedia(media.id)"
                    class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition">
                    Delete
                </button>
            </li>
        </ul>
        <div v-if="mediaList && mediaList.length === 0 && !pending" class="text-gray-500">No media submitted before.</div>
    </div>
</template>
  
<script>
export default {
    props: {
        refId: Number,
        mediaTypeId: {
            type: Number,
            required: true,
        },
    },
    emits: ['media-selected'],
    data() {
        return {
            mediaList: [],
            error: null,
            pending: true,
        };
    },
    async created() {
        await this.fetchMedia();
    },
    methods: {
        async fetchMedia() {
            try {
                const response = await this.fetchMediaData();
                this.mediaList = response || [];
                this.error  = null;
            } catch (err) {
                this.error = err;
            } finally {
                this.pending = false;
            }
        },
        async fetchMediaData() {
            const url = this.refId 
                ? `/api/media/getMediaByRefIdAndMediaTypeId?refId=${this.refId}&mediaTypeId=${this.mediaTypeId}`
                : `/api/media/type/${this.mediaTypeId}`;
            
            return await $fetch(url);
        },
        async deleteMedia(mediaId) {
            try {
                const response = await $fetch(`/api/media/${mediaId}/disable`, {
                    method: 'PUT',
                });
                if (response.id === 1) {
                    this.mediaList = this.mediaList.filter(media => media.id !== mediaId);
                    this.fetchMedia();
                } else {
                    this.error = "Media record not found.";
                }
            } catch (err) {
                this.error = err;
            }
        },
        selectMedia(media) {
            this.$emit('media-selected', media);
        },
    },
};
</script>