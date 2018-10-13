import {FormButton, PropsOf, Subtract } from 'react-ocean-forms';

type TUpstreamButtonProps = PropsOf<typeof FormButton>;

/**
 * Props for the FormButton component
 */
export interface IFormButtonProps extends Subtract<TUpstreamButtonProps, { component: string }> { }
