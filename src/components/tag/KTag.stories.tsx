// Button.stories.ts|tsx

import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import KTag from "./KTag";

export default {
	title: "Kraken+ChakraUI/Tag",
	component: KTag,
} as ComponentMeta<typeof KTag>;

const Template: ComponentStory<typeof KTag> = (args) => <KTag />;

export const Default = Template.bind({});