import {FormButton, PropsOf, Subtract } from 'react-ocean-forms';

type TUpstreamButtonProps = JSX.LibraryManagedAttributes<typeof FormButton, PropsOf<typeof FormButton>>;

/**
 * Props for the FormButton component
 */
export interface IFormButtonProps extends Subtract<TUpstreamButtonProps, { component: string }> { }
