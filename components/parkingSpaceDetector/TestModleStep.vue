<template>
    <div>
        <h2 class="text-2xl font-bold mb-2.5">Upload a Video</h2>
        <p class="mb-2">Once your video is uploaded and selected, you can proceed to the next step in your workflow.</p>
        <p class="mb-2">Selected Model ID: {{ this.modelId }}</p>
        <UploaderZone ref="uploaderZone" :isImageType="false" :refId="refId" @file-uploaded="setMediaId" />
        <PreviousUploadedImage :mediaTypeId="EnumMediaType.VIDEO" @media-selected="updateFileViewPanel" :refId="refId" />
    </div>
</template>
  
<script>
import PreviousUploadedImage from './PreviousUploadedImage.vue';
import UploaderZone from './UploaderZone.vue';
import { EnumMediaType } from '@/enums/EnumMediaType';
export default {
    name: 'TestModleStep',
    components: {
        UploaderZone,
        PreviousUploadedImage
    },
    emits: ['set-media-id'],
    props: {
        modelId: {
            type: Number,
            required: true,
        },
        refId: {
            type: Number,
            required: true,
        },
    },
    data() {
        return {
            EnumMediaType,
        };
    },
    methods: {
        updateFileViewPanel(media) {
            this.$refs.uploaderZone.updateFileViewPanel(media);
        },
        setMediaId(mediaId) {
            this.$emit('set-media-id', mediaId);
        },
    }
}
</script>