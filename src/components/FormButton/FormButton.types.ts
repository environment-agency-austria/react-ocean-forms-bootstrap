import {FormButton, PropsOf, Subtract } from 'react-ocean-forms';
import { ButtonProps } from 'reactstrap';

type TUpstreamButtonProps = ButtonProps & JSX.LibraryManagedAttributes<typeof FormButton, PropsOf<typeof FormButton>>;

/**
 * Props for the FormButton component
 */
export interface IFormButtonProps extends Subtract<TUpstreamButtonProps, { component: string }> { }
