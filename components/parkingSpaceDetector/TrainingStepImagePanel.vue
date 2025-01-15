<template>
    <div class="flex w-full items-start">
        <button @click="addPanel"
            class="m-2 flex items-center rounded-md border border-slate-300 py-2 px-4 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800"
            type="button">
            Add Panel
        </button>
    </div>
    <div class="m-2 se_container">
        <img v-if="uploadedImageUrl" ref="image" :src="uploadedImageUrl" alt="Uploaded Image" @load="onImageLoaded"
            class="w-full max-w-2xl rounded shadow-md" />
        <div class="se_box">
            <SelectedAreaPanel 
                v-for="(panel, index) in panels" 
                :key="index" 
                :index="index" 
                :ref="'panel-' + index" 
                :panelData="panel"
                :scaleX=this.scaleX
                :scaleY=this.scaleY />
        </div>
    </div>
</template>

<script>
import SelectedAreaPanel from "./areadetector/SelectedAreaPanel.vue";

export default {
    name: "TrainingStepImagePanel",
    components: {
        SelectedAreaPanel,
    },
    props: {
        uploadedImageUrl: String, 
        parkingSlotInfos: Array
    },
    data() {
        return {
            originalWidth: 0,
            originalHeight: 0,
            panels: [],
            scaleX: 0, 
            scaleY: 0,
        };
    },
    methods: {
        onImageLoaded() {
            const img = this.$refs.image;
            const rect = img.getBoundingClientRect();

            this.originalWidth = rect.width;
            this.originalHeight = rect.height;
            
            const naturalWidth = img.naturalWidth;
            const naturalHeight = img.naturalHeight;
            const clientWidth = this.originalWidth;
            const clientHeight = this.originalHeight;
            this.scaleX = naturalWidth / clientWidth;
            this.scaleY = naturalHeight / clientHeight;

            if (this.parkingSlotInfos) {
                this.generatePanelsFromParkingSlots();
            }
        },
        generatePanelsFromParkingSlots() {
            this.parkingSlotInfos.forEach(slot => {
                const coordinates = slot.coordinatesInfos;
                const panelData = coordinates.map(coord => ({
                    pointOrder: coord.pointOrder,
                    x: coord.x,
                    y: coord.y,
                    realX: coord.realX,
                    realY: coord.realY,
                }));
                this.panels.push({ points: panelData, isEmpty: slot.isEmpty });
            });
        },
        confirmDelete(index) {
            const confirmDelete = window.confirm("Are you sure you want to delete this panel?" + index);
            if (confirmDelete) {
                this.panels.splice(index, 1);
            }
        },
        addPanel() {
            this.panels.push({ isEmpty: false, points: [] });
        },
        getPanelData() {
            const panelDataArray = [];

            this.panels.forEach((panel, index) => {
                const selectedAreaPanel = this.$refs[`panel-${index}`];
                if (selectedAreaPanel && selectedAreaPanel[0]) {
                    selectedAreaPanel[0].updateRealCoordinates();

                    panelDataArray.push({
                        index: index,
                        points: selectedAreaPanel[0].points,
                        isEmpty: selectedAreaPanel[0].isEmpty,
                    });
                }
            });
            return panelDataArray;
        },
    },
};
</script>

<style src="~/assets/css/TrainingStepImagePanel.css" lang="css"></style>