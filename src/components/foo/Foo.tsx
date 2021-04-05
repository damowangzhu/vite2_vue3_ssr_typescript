import { defineComponent } from 'vue';
import './foo.scss';
export const Foo = defineComponent({
  name: 'Foo',
  setup() {
    return () => <div class="jsx">from JSX</div>;
  }
});
