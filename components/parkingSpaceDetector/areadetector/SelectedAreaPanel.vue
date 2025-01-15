<template>
  <div class="point_panel" ref="panel" :title="'slot Index: ' + index" :style="{
    width: panelWidth + 'px',
    height: panelHeight + 'px',
    left: `${panelOffset.x}px`,
    top: `${panelOffset.y}px`
  }">
    <svg class="line_svg_panel">
      <line v-for="(line, index) in lines" :key="index" :x1="line.x1" :y1="line.y1" :x2="line.x2" :y2="line.y2"
        class="se_line" />
      <polygon class="polygon_panel" :class="isEmpty ? 'is-empty' : 'is-filled'" :points="polygonPoints" @click="openModal">
      </polygon>
    </svg>

    <span class="fixed_point" @mousedown="startPanelDrag($event)"></span>
    <span v-for="point in filteredPoints" :key="point.order" :class="['se_point', point.class]"
      :style="{ left: `${point.x}px`, top: `${point.y}px` }" @mousedown="startDrag(point, $event)"></span>

    <ToggleModal v-if="showModal" :initial-value="isEmpty" @update-value="updatePolygonStatus" />
  </div>
</template>

<script>
import ToggleModal from './ToggleModal.vue';

export default {
  name: "SelectedAreaPanel",
  components: { ToggleModal },
  props: {
    index: Number,
    panelData: Object,
    scaleX: Number, 
    scaleY: Number
  },
  data() {
    return {
      points: [
        { order: 1, x: 0, y: 0, realX: 0, realY: 0 },
        { order: 2, x: 50, y: 0, realX: 0, realY: 0 },
        { order: 3, x: 50, y: 50, realX: 0, realY: 0 },
        { order: 4, x: 0, y: 50, realX: 0, realY: 0 },
      ],
      draggingPoint: null,
      offsetX: 0,
      offsetY: 0,
      panelOffset: { x: 0, y: 0 },
      isEmpty: false,
      showModal: false,
    };
  },
  mounted() {
    this.calculatePoints();
    if (this.panelData) {
      this.isEmpty = this.panelData.isEmpty;
    }
  },
  computed: {
    filteredPoints() {
      return this.points.filter(point => point.order !== 1);
    },
    panelWidth() {
      const maxX = Math.max(...this.points.map(p => p.x));
      const minX = Math.min(...this.points.map(p => p.x));
      return maxX - minX + 10;
    },
    panelHeight() {
      const maxY = Math.max(...this.points.map(p => p.y));
      const minY = Math.min(...this.points.map(p => p.y));
      return maxY - minY + 10;
    },
    polygonPoints() {
      return this.points
        .map((p) => `${p.x + 5},${p.y + 5}`)
        .join(" ");
    },
    lines() {
      return this.points.map((point, index) => {
        const nextPoint = this.points[(index + 1) % this.points.length];
        return {
          x1: point.x + 5,
          y1: point.y + 5,
          x2: nextPoint.x + 5,
          y2: nextPoint.y + 5,
        };
      });
    },
  },
  methods: {
    calculatePoints() {
      this.panelData.points.forEach((point, order) => {
        if (point.pointOrder === 1) {
          this.panelOffset.x = (point.realX / this.scaleX) - point.x;
          this.panelOffset.y = (point.realY / this.scaleY) - point.y;
        }
        this.points[order].x = point.x;
        this.points[order].y = point.y;
        this.points[order].realX = point.realX;
        this.points[order].realY = point.realY;
      });
    },
    startDrag(point, event) {
      this.draggingPoint = point;
      this.offsetX = event.clientX - point.x;
      this.offsetY = event.clientY - point.y;
      document.addEventListener("mousemove", this.drag);
      document.addEventListener("mouseup", this.stopDrag);
    },
    drag(event) {
      if (!this.draggingPoint) return;

      let newX = event.clientX - this.offsetX;
      let newY = event.clientY - this.offsetY;

      const parentRect = this.$refs.panel.parentNode.getBoundingClientRect();
      // newX = Math.max(0, Math.min(parentRect.width - 10, newX));
      // newY = Math.max(0, Math.min(parentRect.height - 10, newY));
      newX = Math.min(parentRect.width - 10, newX);
      newY = Math.min(parentRect.height - 10, newY);

      this.draggingPoint.x = newX;
      this.draggingPoint.y = newY;
    },
    startPanelDrag(event) {
      // Get initial mouse position and panel offset
      const initialMouseX = event.clientX;
      const initialMouseY = event.clientY;
      const initialPanelX = this.panelOffset.x;
      const initialPanelY = this.panelOffset.y;

      const onMouseMove = (e) => {
        const dx = e.clientX - initialMouseX;
        const dy = e.clientY - initialMouseY;

        let newPanelX = initialPanelX + dx;
        let newPanelY = initialPanelY + dy;

        // Constrain the panel within its parent's bounds
        const parentRect = this.$refs.panel.parentNode.getBoundingClientRect();
        newPanelX = Math.max(0, Math.min(parentRect.width - this.panelWidth, newPanelX));
        newPanelY = Math.max(0, Math.min(parentRect.height - this.panelHeight, newPanelY));

        // Update position of the panel
        this.panelOffset.x = newPanelX;
        this.panelOffset.y = newPanelY;
      };

      const onMouseUp = () => {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
      };

      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    },
    stopDrag() {
      this.draggingPoint = null;

      document.removeEventListener("mousemove", this.drag);
      document.removeEventListener("mouseup", this.stopDrag);
    },
    openModal() {
      this.showModal = true;
    },
    updatePolygonStatus(newValue) {
      this.isEmpty = newValue;
      this.showModal = false;
    },
    updateRealCoordinates() {
        this.points.forEach(point => {
            point.realX = Math.round((point.x + this.panelOffset.x) * this.scaleX);
            point.realY = Math.round((point.y + this.panelOffset.y) * this.scaleY);
        });
    },
  },
};
</script>