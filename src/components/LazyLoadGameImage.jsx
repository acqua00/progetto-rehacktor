import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

export default function LazyLoadGameImage({ image, alt = "game image" }) {
  return (
    <div className="w-full h-48 overflow-hidden bg-gray-700">
      <LazyLoadImage
        alt={alt}
        effect="blur"
        src={image}
        wrapperProps={{ style: { transitionDelay: "0.5s" } }}
        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
      />
    </div>
  );
}
