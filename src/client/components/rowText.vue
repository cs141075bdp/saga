<template>
  <div class="row-text">
    <i v-if="!editing && isEmpty && hover" class="fa fa-pencil-square-o new-text-icon" aria-hidden="true" @click="editing = true" />
    <span v-show="!editing && !isEmpty">
      {{ value }}
      <i v-if="editable" class="fa fa-pencil-square-o right-icon" aria-hidden="true" @click="editing = true" />
    </span>
    <span v-if="editing" class="editor" style="width: 100%">
      <input
        v-model="data"
        v-focus
        type="text"
        class="form-control"
        @keydown.enter="save"
        @keyup.esc="editing = false"
      >
      <i class="fa fa-floppy-o right-icon" aria-hidden="true" @click="save" />
    </span>
  </div>
</template>

<script>
  import { isEmpty } from 'lodash';

  export default {
    props: {
      value: {
        type: String,
        default: null,
      },
      editable: {
        type: Boolean,
        default: true,
      },
      hover: {
        type: Boolean,
        required: true,
      },
    },

    data() {
      return {
        editing: false,
        data: this.value,
      };
    },

    computed: {
      isEmpty() {
        return isEmpty(this.data);
      },
    },

    watch: {
      value: {
        handler(value) {
          this.data = value;
        },
        immediate: true,
      },
    },

    methods: {
      save() {
        this.$emit('input', this.data);
        this.editing = false;
      },
    },
  };
</script>
<style lang="less">
  .row-text {
    display: flex;
    width: 100%;
    position: relative;

    .right-icon {
      position: absolute;
      right: 5px;
      top: 2px;
      display: none;
      cursor: pointer;
    }

    &:hover {
      .right-icon {
        display: inline-block;
      }
    }

    .editor {
      .fa {
        display: inline-block;
        font-size: 1.6em;
        margin-top: 4px;
      }
    }

    .new-text-icon {
      margin-top: 2px;
    }
  }
</style>
