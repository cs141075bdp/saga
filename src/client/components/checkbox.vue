<template>
  <div class="fancy square">
    <label>
      <input v-model="data" type="checkbox">
      <span />
    </label>
  </div>
</template>

<script lang="ts">
  import Vue, { PropType } from 'vue';

  export default Vue.extend({
    props: {
      value: Boolean as PropType<boolean>,
    },

    data() {
      return {
        data: this.value,
      };
    },

    watch: {
      data: {
        handler(value) {
          this.$emit('input', value);
        },
      },
      value: {
        handler(value) {
          this.data = value;
        },
      },
    },
  });
</script>

<style lang="less">
  .fancy {
    input {
      height: 100%;
    }
  }

  .fancy label {
    display: inline-flex;
    align-items: baseline;

    input[type=checkbox],
    input[type=radio] {
      position: relative;
      appearance: none;
      width: 1em;
      margin: 0;
      outline: none;
      font-family: 'Font Awesome 5 Pro';
      transition: 300ms ease-out;
      font-size: 20px;
      color: darkgray;

      &::after {
        content: '\f111'; // circle
        display: inline-block;
        text-align: center;
        width: 1em;
      }

      &:checked::after {
        font-weight: 900;
      }
      &:active {
        transform: scale(.6);
      }

      + span {
        margin-left: .35em;
      }
    }

    input[type=checkbox]:checked::after {
      content: '\f058'; // check-circle
    }

    input[type=radio]:checked::after {
      content: '\f192'; // dot-circle
    }
  }

  .fancy.square label {
    input[type=checkbox]:after {
      content: '\f0c8'; // square
      background-color: gray;
    }
    input[type=checkbox]:checked::after {
      content: '\f14a'; // check-square
      background-color: gray;
    }
  }

  // Bonus Fanciness! Look at you, digging around here!
  // fancy range slider
  .fancy label {
    input[type="range"] {
      appearance: none;
      outline: none;
      display: block;
      padding: 0;
      border: 0;
      width: auto;
      height: .25em;
      border-radius: 1em;
      cursor: pointer;
      font-size: inherit;
      // MOZILLA
      &::-moz-range-track {
        appearance: none;
        background: #fff;
        outline: none;
      }
      &::-moz-focus-outer {
        border: 0;
      }
      &::-moz-range-thumb {
        appearance: none;
        width: 1em;
        height: 1em;
        border: none;
        box-shadow: 0 0 0 .2em #1fc2f5;
        border-radius: 1em;
        background: #fff;
        transform: scale(.7);
        transition: .3s ease-out;
      }
      &::-moz-range-thumb:focus,
      &::-moz-range-thumb:active {
        appearance: none;
        transform: scale(1.5);
      }
      // BLINK/WEBKIT
      &::-webkit-slider-thumb {
        appearance: none;
        width: 1em;
        height: 1em;
        border: none;
        box-shadow: 0 0 0 .2em #1fc2f5;
        border-radius: 1em;
        background: #fff;
        transform: scale(.8);
        transition: .3s ease-out;
      }
      &::-webkit-slider-thumb:focus,
      &::-webkit-slider-thumb:active {
        appearance: none;
        transform: scale(1.1);
      }
    }
  }
</style>
