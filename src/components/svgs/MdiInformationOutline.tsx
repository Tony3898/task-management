const SvgMdiInformationOutline = (props:any) => (
  <svg
    width={24}
    height={24}
    color={props.color || null}
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M11 9h2V7h-2v2Zm1 11c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8Zm0-18a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm-1 15h2v-6h-2v6Z"
      fill={props.color || "#748ADF"}

    />
  </svg>
);

export default SvgMdiInformationOutline;
