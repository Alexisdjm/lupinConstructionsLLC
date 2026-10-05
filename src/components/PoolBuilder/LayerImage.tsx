type LayerImageProps = {
  src: string;
  visible: boolean;
};

export function LayerImage({ src, visible }: LayerImageProps) {
  return (
    <img
      src={src}
      alt=""
      aria-hidden="true"
      draggable={false}
      className="pointer-events-none absolute inset-0 h-full w-full object-cover object-[center_40%] transition-opacity duration-[400ms] ease-in-out motion-reduce:transition-none"
      style={{ opacity: visible ? 1 : 0 }}
    />
  );
}
