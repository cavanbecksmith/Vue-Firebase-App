export default {
  //The child has a prop named 'value'. v-model will automatically bind to this prop
  props: ['value'],
  data: function() {
    return {
      internalValue: ''
    }
  },
  watch: {
    'internalValue': function() {
      // When the internal value changes, we $emit an event. Because this event is 
      // named 'input', v-model will automatically update the parent value
      // console.log('LOL', this.internalValue)
      this.$emit('input', this.internalValue);
    }
  },
  created: function() {
    // We initially sync the internalValue with the value passed in by the parent
    this.internalValue = this.value;
  }
}