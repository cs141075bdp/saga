<template>
  <div class="row-text">
    <span v-show="!editing">
      {{ value }}
      <i v-if="editable" class="fa fa-pencil-square-o" aria-hidden="true" @click="editing = true" />
    </span>
    <span v-show="editing" class="editor" style="width: 100%">
      <input v-model="data" type="text" class="form-control" @keydown.enter="save" @keyup.esc="editing = false">
      <i class="fa fa-floppy-o" aria-hidden="true" @click="save" />
    </span>
  </div>
</template>

<script>
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
    },

    data() {
      return {
        editing: false,
        data: this.value,
      };
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

    .fa {
      position: absolute;
      right: 5px;
      top: 2px;
      display: none;
      cursor: pointer;
    }

    &:hover {
      .fa {
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
  }
</style>
