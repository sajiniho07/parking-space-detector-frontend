<template>
    <div>
        <Menu></Menu>
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 class="text-3xl font-bold text-gray-800">Parking Space Detector</h1>
            <p class="mt-4 text-gray-600">
                This dashboard is designed to guide you through a series of steps for image processing and model
                training to detect available parking slots. You will start by uploading an image, identifying the slots,
                and setting their status as empty or full. Next, you will train the model, upload your video file, and
                finally view the results in the last step. Feel free to let me know if you need any further adjustments!
            </p>
            <StepTabPanel />
        </div>

    </div>
</template>

<script>
import Menu from '~/components/Menu.vue';
import StepTabPanel from '~/components/parkingSpaceDetector/StepTabPanel.vue';

export default {
    components: {
        Menu,
        StepTabPanel,
    },
}
</script>