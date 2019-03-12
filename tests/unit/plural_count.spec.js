import { shallowMount } from '@vue/test-utils';

import PluralCount from '@/app/components/PluralCount.vue';


const createWrapper = propsData => shallowMount(PluralCount, { propsData });

describe('PluralCount component', () => {
  it('Pluralizes the first form', () => {
    const wrapper = createWrapper({
      count: 1,
      pluralVariants: ['сепулька', 'сепульки', 'сепулек'],
    });

    expect(wrapper.html()).toContain('1 сепулька');
  });

  it('Pluralizes the second form', () => {
    const wrapper = createWrapper({
      count: 2,
      pluralVariants: ['сепулька', 'сепульки', 'сепулек'],
    });

    expect(wrapper.html()).toContain('2 сепульки');
  });

  it('Pluralizes the third form', () => {
    const wrapper = createWrapper({
      count: 8,
      pluralVariants: ['сепулька', 'сепульки', 'сепулек'],
    });

    expect(wrapper.html()).toContain('8 сепулек');
  });

  it('Renders plural form within <span> by default', () => {
    const wrapper = createWrapper({
      count: 8,
      pluralVariants: ['сепулька', 'сепульки', 'сепулек'],
    });

    expect(wrapper.html()).toContain('<span class="plural-count">8 сепулек</span>');
  });

  it('Renders plural form within custom tag if asked', () => {
    const wrapper = createWrapper({
      count: 8,
      pluralVariants: ['сепулька', 'сепульки', 'сепулек'],
      countTag: 'b',
    });

    expect(wrapper.html()).toContain('<span class="plural-count"><b>8 </b>сепулек</span>');
  });
});
