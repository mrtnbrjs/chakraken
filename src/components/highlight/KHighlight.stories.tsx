import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import KHighlight from "./KHighlight";

export default {
	title: "Kraken+ChakraUI/Highlight",
	component: KHighlight,
} as ComponentMeta<typeof KHighlight>;

const Template: ComponentStory<typeof KHighlight> = (args) => (
	<KHighlight />
);

export const Default = Template.bind({});
