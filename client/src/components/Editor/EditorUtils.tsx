import React, { Ref, PropsWithChildren } from 'react';
import ReactDOM from 'react-dom';
import { BiBold, BiUnderline, BiItalic } from 'react-icons/bi';
import { cx, css } from '@emotion/css';
import styled from 'styled-components';

interface BaseProps {
  className: string;
  [key: string]: unknown;
}

type OrNull<T> = T | null;

type ButtonType = {
  reversed: boolean | undefined;
  active: boolean | undefined;
};

const StyledButton = styled.span<ButtonType>`
  cursor: pointer;
  color: ${(props) =>
    props.reversed
      ? props.active
        ? 'white'
        : '#aaa'
      : props.active
      ? 'black'
      : '#ccc'};
`;

export const Button = React.forwardRef(
  (
    {
      className,
      active,
      reversed,
      ...props
    }: PropsWithChildren<
      {
        active: boolean;
        reversed: boolean;
      } & BaseProps
    >,
    ref: any
  ) => <StyledButton {...props} ref={ref} reversed={reversed} active={active} />
);

export const EditorValue = React.forwardRef(
  (
    {
      className,
      value,
      ...props
    }: PropsWithChildren<
      {
        value: any;
      } & BaseProps
    >,
    ref: any
  ) => {
    const textLines = value.document.nodes
      .map((node: any) => node.text)
      .toArray()
      .join('\n');
    return (
      <div
        ref={ref}
        {...props}
        className={cx(
          className,
          css`
            margin: 30px -20px 0;
          `
        )}
      >
        <div
          className={css`
            font-size: 14px;
            padding: 5px 20px;
            color: #404040;
            border-top: 2px solid #eeeeee;
            background: #f8f8f8;
          `}
        >
          Slate's value as text
        </div>
        <div
          className={css`
            color: #404040;
            font: 12px monospace;
            white-space: pre-wrap;
            padding: 10px 20px;
            div {
              margin: 0 0 0.5em;
            }
          `}
        >
          {textLines}
        </div>
      </div>
    );
  }
);

export const Icon = React.forwardRef(
  ({ className, ...props }: PropsWithChildren<BaseProps>, ref: any) => {
    let icon = <></>;
    switch (props.children) {
      case 'format_bold':
        icon = <BiBold />;
        break;
      case 'format_italic':
        icon = <BiItalic />;
        break;
      case 'format_underlined':
        icon = <BiUnderline />;
        break;
    }
    return (
      <span {...props} ref={ref}>
        {icon}
      </span>
    );
  }
);

export const Instruction = React.forwardRef(
  ({ className, ...props }: PropsWithChildren<BaseProps>, ref: any) => (
    <div
      {...props}
      ref={ref}
      className={cx(
        className,
        css`
          white-space: pre-wrap;
          margin: 0 -20px 10px;
          padding: 10px 20px;
          font-size: 14px;
          background: #f8f8e8;
        `
      )}
    />
  )
);

const StyledMenu = styled.div`
  & > * {
    display: inline-block;
  }
  & > * + * {
    margin-left: 15px;
  }
`;

export const Menu = React.forwardRef(
  ({ className, ...props }: PropsWithChildren<BaseProps>, ref: any) => (
    <StyledMenu {...props} ref={ref} className={className} />
  )
);

export const Portal = ({ children }: any) => {
  return typeof document === 'object'
    ? ReactDOM.createPortal(children, document.body)
    : null;
};

export const Toolbar = React.forwardRef(
  (
    { className, ...props }: PropsWithChildren<BaseProps>,
    ref: Ref<OrNull<HTMLDivElement>>
  ) => (
    <Menu
      {...props}
      ref={ref}
      className={cx(
        className,
        css`
          position: relative;
          padding: 1px 18px 17px;
          margin: 0 -20px;
          border-bottom: 2px solid #eee;
          margin-bottom: 20px;
        `
      )}
    />
  )
);
