<template>
    <div class="image-container">
        <div class="flex flex-col justify-start">
            <h2 class="text-xl font-bold mb-2.5">Train the Model</h2>
            <div class="mb-2">
                <ul class="space-y-1 list-disc list-inside dark:text-gray-400">
                    <li>If you need to refresh the image, click the <span class="font-bold text-gray-800">Reload Image</span> button. </li>
                    <li>Select parking slots directly on the image by clicking the <span class="font-bold text-gray-800">Add Panel</span> button.</li>
                    <li><span class="font-bold text-gray-800">Right-click</span> on each slot to mark it as empty or full.</li>
                    <li>After selecting the parking slots, click the <span class="font-bold text-gray-800">Train</span> button to initiate the training process.</li>
                </ul>
            </div>
            <div class="flex items-center">
                <button @click="fetchMedia()"
                    class="m-2 flex items-center rounded-md border border-slate-300 py-2 px-4 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800"
                    type="button">
                    Reload Image
                </button>
                <button type="button" :disabled="loading"
                    class="m-2 flex items-center text-white font-bold py-2 px-4 rounded-md border border-slate-300 text-center text-sm transition-all duration-200 ease-in-out shadow-sm hover:shadow-lg hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
                    :class="[loading ?'bg-blue-400 dark:bg-blue-500' : 'bg-blue-500 hover:bg-blue-600' ]"
                    @click="sendSelectedSlots()">
                    Train
                </button>
            </div>
        </div>
        <div class="mb-4">
            <p>Selected Image Id: {{ this.mediaId }}</p>
            <div v-if="message" class="text-green-500">{{ message }}</div>
        </div>
        <div class="flex flex-col items-center justify-center p-4 border rounded shadow-md">
            <div v-if="error" class="text-red-500">{{ error.message }}</div>
            <div v-if="pending" class="text-gray-500">Loading...</div>
            <TrainingStepImagePanel ref="TrainingStepImagePanel" :uploadedImageUrl="uploadedImageUrl" :parkingSlotInfos="parkingSlotInfos"/>
        </div>
    </div>
    <div class="container mx-auto pt-6">
        <ul v-if="model" class="space-y-4">
            <li v-if="model" :key="model.id"
                class="flex justify-between items-center p-4 border rounded shadow">
                <div class="flex items-center">
                    <a @click="selectModel(model)" class="cursor-pointer text-blue-500 hover:underline">{{ model.name }}</a>
                </div>
                <button @click="deleteMedia(model.id)"
                    class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition">
                    Delete
                </button>
            </li>
        </ul>
    </div>
</template>

<script>
import TrainingStepImagePanel from './TrainingStepImagePanel.vue'
import { EnumMediaType } from '@/enums/EnumMediaType';

export default {
    name: 'TrainModelStep',
    components: {
        TrainingStepImagePanel,
    },
    props: {
        mediaId: {
            type: Number,
            required: true,
        },
    },
    emits: ['set-model-id'],
    data() {
        return {
            uploadedImageUrl: null,
            error: null,
            message: null,
            pending: true,
            loading: false,
            parkingSlotInfos: null,
            model: null,
            EnumMediaType,
        };
    },
    async created() {
        await this.fetchMedia();
        await this.fetchModel();
    },
    methods: {
        async fetchMedia() {
            try {
                const response = await $fetch(`/api/media/${this.mediaId}`);
                this.uploadedImageUrl = response.path;
                this.parkingSlotInfos = response.parkingSlotInfos;
                this.error = null;
            } catch (err) {
                this.error = err;
            } finally {
                this.pending = false;
            }
        },
        async fetchModel() {
            try {
                const response = await $fetch(`/api/media/getMediaByRefIdAndMediaTypeId?refId=${this.mediaId}&mediaTypeId=${EnumMediaType.MODEL}`);
                this.model = Array.isArray(response) && response.length > 0 ? response[0] : null;
            } catch (err) {
                console.error(err);
            }
        },
        async deleteMedia(id) {
            try {
                const response = await $fetch(`/api/media/${id}/disable`, {
                    method: 'PUT',
                });
                if (response.id === 1) {
                    this.model = null;
                    this.$emit('set-model-id', null);
                } else {
                    console.error("Media record not found.");
                }
            } catch (err) {
                console.error(err);
            }
        },
        selectModel(model) {
            this.$emit('set-model-id', model.id);
            this.$parent.nextStep();
        },
        async sendSelectedSlots() {
            try {
                this.loading = true;
                const panelData = this.$refs.TrainingStepImagePanel.getPanelData();

                const requestBody = {
                    mediaId: this.mediaId,
                    slotDetails: panelData.map((slot) => ({
                        index: slot.index,
                        points: slot.points.map(point => ({
                            id: point.order,
                            x: point.x,
                            y: point.y,
                            realX: point.realX,
                            realY: point.realY
                        })),
                        isEmpty: slot.isEmpty
                    }))
                };

                const response = await $fetch('/api/parking-slot/generateModelFile', {
                    method: 'POST',
                    body: JSON.stringify(requestBody),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.id > 0) {
                    this.$emit('set-model-id', response.id);
                    await this.fetchModel();
                    this.message = response.message;
                    this.error = null;
                } else {
                    this.error = response.message;
                }
            } catch (err) {
                this.message = null;
                this.$emit('set-model-id', null);
                this.error = err;
            } finally {
                this.loading = false;
            }
        },
    },
}
</script>