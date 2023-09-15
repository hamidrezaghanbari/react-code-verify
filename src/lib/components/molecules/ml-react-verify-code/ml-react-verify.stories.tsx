import React from 'react'
import { ReactVerifyCode, ReactVerifyCodeProps } from '.'
import { objectValuesToControls } from '../../../storybook-utils'
import { useVerifyCode } from '../../../hooks/use-verify-code'
import { Meta } from '@storybook/react'
import { StoryFn } from '@storybook/react'

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof ReactVerifyCode> = {
  title: 'Molecules/ReactVerifyCode',
  component: ReactVerifyCode,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  // argTypes: {
  //   label: { control: 'text' },
  //   variant: objectValuesToControls(AT_BUTTON_VARIANT),
  //   onClick: { action: 'clicked' },
  // },
}
export default meta

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof ReactVerifyCode> = (args: any) => {
  const props = useVerifyCode({ codeLength: args?.codeLength })

  return <ReactVerifyCode {...props} />
}

export const Primary = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  label: 'ReactVerifyCodeProps',
  codeLength: 4,
  onClick: () => alert('clicking primary'),
}
