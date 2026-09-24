import { useState } from 'react';

/** A resilient catalog image that always shows a product-specific fallback. */
export default function ProductImage({ src, product, alt, className = '', imageClassName = '', ...props }) {
  const [failedSrc, setFailedSrc] = useState('');
  const failed = !src || failedSrc === src;

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ backgroundColor: product?.color || '#f1f5f0' }}
    >
      {failed ? (
        <span
          className="absolute inset-0 grid place-items-center text-6xl"
          role="img"
          aria-label={`${product?.name || 'Product'} image unavailable`}
        >
          {product?.emoji || '🛒'}
        </span>
      ) : (
        <img
          {...props}
          src={src}
          alt={alt ?? product?.name ?? ''}
          className={`w-full h-full object-cover ${imageClassName}`}
          onError={() => setFailedSrc(src)}
        />
      )}
    </div>
  );
}
