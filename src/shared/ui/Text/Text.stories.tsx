import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Text } from './Text';
import { Theme } from '@/shared/const/theme';

export default {
    title: 'shared/Text',
    component: Text,
    argTypes: { backgroundColor: { control: 'color' } },
} as ComponentMeta<typeof Text>;

const Template: ComponentStory<typeof Text> = (args) => <Text {...args} />;

export const TitleAndText = Template.bind({});
TitleAndText.args = {
    title: 'Lorem ipsum dolor.',
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
};

export const OnlyTitle = Template.bind({});
OnlyTitle.args = { title: 'Lorem ipsum dolor.' };

export const OnlyText = Template.bind({});
OnlyText.args = {
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
};

export const TitleAndTextDark = Template.bind({});
TitleAndTextDark.args = {
    title: 'Lorem ipsum dolor.',
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
};
TitleAndTextDark.decorators = [ThemeDecorator(Theme.DARK)];

export const OnlyTitleDark = Template.bind({});
OnlyTitleDark.args = { title: 'Lorem ipsum dolor.' };
OnlyTitleDark.decorators = [ThemeDecorator(Theme.DARK)];

export const OnlyTextDark = Template.bind({});
OnlyTextDark.args = {
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
};
OnlyTextDark.decorators = [ThemeDecorator(Theme.DARK)];

export const Error = Template.bind({});
Error.args = {
    title: 'Lorem ipsum dolor.',
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
    theme: 'error',
};

export const ErrorDark = Template.bind({});
ErrorDark.args = {
    title: 'Lorem ipsum dolor.',
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
    theme: 'error',
};
ErrorDark.decorators = [ThemeDecorator(Theme.DARK)];

export const Size_S = Template.bind({});
Size_S.args = {
    title: 'Lorem ipsum dolor.',
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
    size: 'size_s',
};

export const Size_M = Template.bind({});
Size_M.args = {
    title: 'Lorem ipsum dolor.',
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
    size: 'size_m',
};

export const Size_L = Template.bind({});
Size_L.args = {
    title: 'Lorem ipsum dolor.',
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
    size: 'size_l',
};
