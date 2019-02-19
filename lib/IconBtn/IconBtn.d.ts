import { ReactChild } from 'react';
import { IconButtonProps } from '@material-ui/core/IconButton';
interface Props extends IconButtonProps {
    loading?: boolean;
    children: ReactChild;
}
export declare const IconBtn: ({ loading, children, disabled, ...props }: Props) => JSX.Element;
export {};
