<template>
    <div>
        <h2 class="text-2xl font-bold mb-2.5">Upload an Image</h2>
        <p class="mb-2">Note: Please ensure that you upload an image from the target video frames with the same width,
            height, and resolution, and complete this step before proceeding.</p>
        <UploaderZone ref="uploaderZone" @file-uploaded="setMediaId" :isImageType="true" />
        <PreviousUploadedImage :mediaTypeId="EnumMediaType.IMAGE" @media-selected="updateFileViewPanel" />
    </div>
</template>

<script>
import UploaderZone from './UploaderZone.vue';
import PreviousUploadedImage from './PreviousUploadedImage.vue';
import { EnumMediaType } from '@/enums/EnumMediaType';
export default {
    name: 'UploadImageStep',
    components: {
        UploaderZone,
        PreviousUploadedImage,
    },
    emits: ['set-media-id'],
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