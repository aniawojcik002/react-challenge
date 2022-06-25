import React from 'react';

import { NoContent } from '../ui';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Zadanie 1/NoContent',
  component: NoContent,
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = () => <NoContent />;

export const Playground = Template.bind({});
