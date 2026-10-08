type LayerImageProps = {
  src: string;
  visible: boolean;
  fit?: string;
  priority?: boolean;
  onLoad?: () => void;
};

export function LayerImage({
  src,
  visible,
  fit = "object-cover object-[center_40%]",
  priority = false,
  onLoad,
}: LayerImageProps) {
  return (
    <img
      src={src}
      alt=""
      aria-hidden="true"
      draggable={false}
      fetchPriority={priority ? "high" : "low"}
      loading={priority ? "eager" : "lazy"}
      onLoad={onLoad}
      className={`pointer-events-none absolute inset-0 h-full w-full ${fit} transition-opacity duration-[400ms] ease-in-out motion-reduce:transition-none`}
      style={{ opacity: visible ? 1 : 0 }}
    />
  );
}
