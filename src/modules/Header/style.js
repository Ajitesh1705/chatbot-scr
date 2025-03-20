export const logoImage = ({ functions }) => {
  const { pxToRem } = functions;
  return {
    width: pxToRem(80),
  };
};
export const toolbarStyle = () => ({
  display: "flex",
  flexDirection: "row-reverse",
});
export default logoImage;
