import { mount } from 'enzyme';
import * as React from 'react';

import ServiceTags from './ServiceTags';

// eslint-disable-next-line css-modules/no-unused-class
import styles from './ServiceTags.module.scss';

describe('<ServiceTags />', () => {
  it('renders all service tags', () => {
    const component = mount(
      <ServiceTags
        services={'*'}
      />
    );

    expect(
      component.find('Tag[children="Score"]')
    ).not.toHaveClassName(styles['tag--disabled']);

    expect(
      component.find('Tag[children="Insights"]')
    ).not.toHaveClassName(styles['tag--disabled']);

    expect(
      component.find('Tag[children="Factors"]')
    ).not.toHaveClassName(styles['tag--disabled']);
  });

  it('renders `score` service tag', () => {
    const component = mount(
      <ServiceTags
        services={[
          'score',
        ]}
      />
    );

    expect(
      component.find('Tag[children="Score"]')
    ).not.toHaveClassName(styles['tag--disabled']);

    expect(
      component.find('Tag[children="Insights"]')
    ).toHaveClassName(styles['tag--disabled']);

    expect(
      component.find('Tag[children="Factors"]')
    ).toHaveClassName(styles['tag--disabled']);
  });

  it('renders `insights` service tag', () => {
    const component = mount(
      <ServiceTags
        services={[
          'insights',
        ]}
      />
    );

    expect(
      component.find('Tag[children="Score"]')
    ).toHaveClassName(styles['tag--disabled']);

    expect(
      component.find('Tag[children="Insights"]')
    ).not.toHaveClassName(styles['tag--disabled']);

    expect(
      component.find('Tag[children="Factors"]')
    ).toHaveClassName(styles['tag--disabled']);
  });

  it('renders `factors` service tag', () => {
    const component = mount(
      <ServiceTags
        services={[
          'factors',
        ]}
      />
    );

    expect(
      component.find('Tag[children="Score"]')
    ).toHaveClassName(styles['tag--disabled']);

    expect(
      component.find('Tag[children="Insights"]')
    ).toHaveClassName(styles['tag--disabled']);

    expect(
      component.find('Tag[children="Factors"]')
    ).not.toHaveClassName(styles['tag--disabled']);
  });
});