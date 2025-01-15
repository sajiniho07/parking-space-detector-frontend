<template>
    <div class="flex flex-col items-center justify-center p-4 border rounded shadow-md">
        <input v-if="!uploadedFileUrl" type="file" :accept="isImageType ? 'image/*' : 'video/*'" @change="onFileChange"
            class="mb-4 border border-gray-300 rounded p-2" ref="fileInput" />
        <img v-if="isImageType && uploadedFileUrl" :src="uploadedFileUrl" alt="Uploaded Image"
            class="m-2 w-full max-w-xs rounded shadow-md" />
        <video v-if="!isImageType && uploadedFileUrl" controls :src="uploadedFileUrl" type="video/mp4">
            Your browser does not support HTML video.
        </video>
        <div class="mt-2">
            <button @click="uploadFile" :disabled="!selectedFile"
                :class="['text-white px-4 py-2 rounded transition', selectedFile ? 'bg-blue-500 hover:bg-blue-600' : 'bg-blue-400 dark:bg-blue-500']">
                Upload
            </button>
            <button v-if="mediaId" @click="deleteFile"
                class="ml-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">
                Delete file
            </button>
        </div>
        <p v-if="message" class="mt-4 text-center">{{ message }}</p>
    </div>
</template>

<script>
export default {
    data() {
        this.$emit('file-uploaded', null);
        return {
            selectedFile: null,
            mediaId: null,
            uploadedFileUrl: null,
            message: '',
        };
    },
    emits: ['file-uploaded'],
    props: {
        refId: Number,
        isImageType: {
            type: Boolean,
            required: true,
        },
    },
    methods: {
        onFileChange(event) {
            const file = event.target.files[0];
            if (file) {
                this.selectedFile = file;
                this.message = '';
            }
        },
        async uploadFile() {
            const formData = new FormData();
            formData.append('file', this.selectedFile);

            try {
                const result = await this.upload(formData);

                if (result.id > 0) {
                    this.mediaId = result.id;
                    this.message = `File uploaded successfully! ID: ${result.id}, Path: ${result.name}`;
                    this.uploadedFileUrl = result.name;
                    this.$refs.fileInput.value = '';
                    this.$emit('file-uploaded', result.id);
                } else {
                    this.message = result.message;
                }

                this.selectedFile = null;
            } catch (error) {
                this.message = 'Failed to upload file: ' + (error.message || 'Unknown error');
            }
        },
        async upload(formData) {
            const url = this.isImageType
                ? '/api/media/upload'
                : `/api/media/upload/${this.refId}`;

            return await $fetch(url, {
                method: 'POST',
                body: formData,
            });
        },
        async deleteFile() {
            try {
                const response = await $fetch(`/api/media/${this.mediaId}/disable`, {
                    method: 'PUT',
                });

                if (response.id === 1) {
                    this.mediaId = null;
                    this.message = response.message;
                    this.uploadedFileUrl = null;
                    this.$emit('file-uploaded', null);
                } else {
                    this.message = "Media record not found.";
                }
            } catch (error) {
                this.message = 'Failed to delete file: ' + (error.message || 'Unknown error');
            }
        },
        updateFileViewPanel(media) {
            if (media) {
                this.mediaId = media.id;
                this.uploadedFileUrl = media.path;
                this.$emit('file-uploaded', media.id);
            } else {
                this.mediaId = null;
                this.uploadedFileUrl = null;
                this.$emit('file-uploaded', null);
            }
            if (this.$refs.fileInput) {
                this.$refs.fileInput.value = '';
            }
        },
    },
};
</script>