<template>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ul class="flex space-x-4 items-center justify-center">
            <li class="me-2" v-for="(step, index) in steps">
                <button :key="index" @click="setActiveStep(index)"
                    :class="['inline-block p-4 border-b-2 rounded-t-lg', activeStep === index ? 'text-blue-600 hover:text-blue-600 dark:text-blue-500 dark:hover:text-blue-500 border-blue-600 dark:border-blue-500' : 'hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 dark:border-transparent text-gray-500 dark:text-gray-400 border-gray-100 dark:border-gray-700']">
                    {{ step.label }}
                </button>
            </li>
        </ul>

        <div class="mt-6">
            <UploadImageStep v-if="activeStep === 0" @set-media-id="setMediaId" />
            <TrainModelStep v-if="activeStep === 1" :mediaId="this.mediaId" @set-model-id="setModelId" />
            <TestModleStep v-if="activeStep === 2" :modelId="this.modelId" :refId="this.mediaId" @set-media-id="setTestMediaId" />
            <ResultStep v-if="activeStep === 3" :mediaId="this.testMediaId" :modelId="this.modelId" />
        </div>

        <div class="mt-6">
            <button v-if="activeStep > 0" @click="prevStep"
                class="mr-2 bg-gray-300 text-white px-4 py-2 rounded hover:bg-gray-400 transition">
                Previous
            </button>
            <button v-if="activeStep < steps.length - 1" @click="nextStep" :disabled="!canNavigateToNextStep()"
                :class="['text-white px-4 py-2 rounded transition', canNavigateToNextStep() ? 'bg-blue-500 hover:bg-blue-600' : 'bg-blue-400 dark:bg-blue-500']">
                Next
            </button>
        </div>
    </div>
</template>
  
<script>
import UploadImageStep from './UploadImageStep.vue';
import TrainModelStep from './TrainModelStep.vue';
import TestModleStep from './TestModleStep.vue';
import ResultStep from './ResultStep.vue';

export default {
    name: 'StepTabPanel',
    components: {
        UploadImageStep,
        TrainModelStep,
        TestModleStep,
        ResultStep,
    },
    data() {
        return {
            mediaId: null,
            modelId: null,
            testMediaId: null,
            activeStep: 0,
            steps: [
                { label: 'Preparing' },
                { label: 'Training' },
                { label: 'Testing' },
                { label: 'Result' },
            ],
        };
    },
    methods: {
        nextStep() {
            if (this.activeStep < this.steps.length - 1) {
                this.activeStep++;
            }
        },
        prevStep() {
            if (this.activeStep > 0) {
                this.activeStep--;
            }
        },
        setActiveStep(index) {
            if (this.canNavigateToNextStep()) {
                this.activeStep = index;
            }
        },
        canNavigateToNextStep() {
            if (this.activeStep === 0) {
                return this.mediaId !== null;

            } else if (this.activeStep === 1) {
                return this.modelId !== null;

            } else if (this.activeStep === 2) {
                return this.testMediaId !== null;
            }
            return true;
        },
        setMediaId(mediaId) {
            this.mediaId = mediaId;
        },
        setModelId(modelId) {
            this.modelId = modelId;
        },
        setTestMediaId(testMediaId) {
            this.testMediaId = testMediaId;
        }
    },
};
</script>