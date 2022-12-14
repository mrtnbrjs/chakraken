// Button.stories.ts|tsx

import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import KCheckbox from "./KCheckbox";

export default {
  title: "Kraken+ChakraUI/CheckBox",
  component: KCheckbox,
} as ComponentMeta<typeof KCheckbox>;

const Template: ComponentStory<typeof KCheckbox> = (args) => (
  <KCheckbox {...args} />
);

export const Checkbox1 = Template.bind({});
Checkbox1.args = {
  title: "option 1",
  colorScheme: "green",
};
