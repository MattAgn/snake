export const absolute = ({ y = 'top', x = 'left' }) => `
  position: absolute;
  ${y}: 0;
  ${x}: 0;
`;

export const fillParent = `
  width: 100%;
  height: 100%
`;

export const flexCenter = `
  display: flex;
  justify-content: center;
  align-items: center
`;
