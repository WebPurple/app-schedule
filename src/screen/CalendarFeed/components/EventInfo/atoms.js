import styled from 'styled-components';

export const EventContainer = styled.View`
    background-color: ${({ theme, bgColor }) => theme.colors[bgColor]};
    padding: 6px 10px;
    border-radius: 4px;
`;

export const EventRow = styled.View`
    flex-direction: row;
`;

export const EventTitleLimit = styled.View`
    max-width: 180px;
`;

export const EventTitle = styled.Text`
    color: #fff;
    font-size: 16px;
    font-family: 'Rubik-Regular';
`;

export const EventDescription = styled(EventTitle)`
    font-size: 14px;
`;
export const EventDuration = styled(EventDescription)`
    font-size: 12px;
    margin-left: auto;
`;
