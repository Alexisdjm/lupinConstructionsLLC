type LayerImageProps = {
  src: string;
  visible: boolean;
  fit?: string;
};

export function LayerImage({ src, visible, fit = "object-cover object-[center_40%]" }: LayerImageProps) {
  return (
    <img
      src={src}
      alt=""
      aria-hidden="true"
      draggable={false}
      className={`pointer-events-none absolute inset-0 h-full w-full ${fit} transition-opacity duration-[400ms] ease-in-out motion-reduce:transition-none`}
      style={{ opacity: visible ? 1 : 0 }}
    />
  );
}
