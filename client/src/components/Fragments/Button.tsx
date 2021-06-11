import React from 'react';
import style from 'styled-components';

type Button = {
    size: ('small' | 'medium' | 'large');
    children: (string | null);
    color: ('red' | 'blue' | 'gray');
}

const StyledButton = style.div<Button>`
    width: ${props => 
        (props.size === 'small' && 6) ||
        (props.size === 'medium' && 12) ||
        (props.size === 'large' && 20)
    }em;
    height: ${props => 
        (props.size === 'small' && 2) ||
        (props.size === 'medium' && 3) ||
        (props.size === 'large' && 5)
    }em;
    border-radius: ${props => 
        (props.size === 'small' && 2) ||
        (props.size === 'medium' && 3) ||
        (props.size === 'large' && 6)
    }px;
    font-size: ${props => 
        (props.size === 'small' && 1) ||
        (props.size === 'medium' && 1.5) ||
        (props.size === 'large' && 2)
    }em;

    background-color: ${props => 
        (props.color === 'red' && '#ff6b6b') ||
        (props.color === 'blue' && '#339af0') ||
        (props.color === 'gray' && '#adb5bd')
    };

    cursor: pointer;

    &:hover { 
        background-color: ${props => 
            (props.color === 'red' && '#ff8787') ||
            (props.color === 'blue' && '#4dabf7') ||
            (props.color === 'gray' && '#ced4da')
        }
    }

    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const Button: React.FC<ButtonProps> = (props) => {
    return (
        <StyledButton {...props}>{props.children}</StyledButton>
    );
}