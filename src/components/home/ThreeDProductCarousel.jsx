import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, MoveUpRight, Star } from 'lucide-react';
import { products } from '../../data/products';

const picks = products.filter((product) => product.isFeatured).slice(0, 5);

export default function ThreeDProductCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = picks.length;
  const activeProduct = picks[activeIndex];

  const move = (step) => setActiveIndex((index) => (index + step + total) % total);

  useEffect(() => {
    if (paused || total < 2) return undefined;
    const timer = window.setInterval(() => setActiveIndex((index) => (index + 1) % total), 5200);
    return () => window.clearInterval(timer);
  }, [paused, total]);

  return (
    <section
      className="fresh-picks-section"
      aria-label="Featured grocery picks"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false);
      }}
      onKeyDown={(event) => {
        if (event.key === 'ArrowLeft') move(-1);
        if (event.key === 'ArrowRight') move(1);
      }}
      tabIndex={0}
    >
      <div className="fresh-picks-heading">
        <p>GOOD THINGS, IN SEASON</p>
        <h2>Fresh picks <span>in focus.</span></h2>
        <span>Rotate through this week’s favorites from our market.</span>
      </div>

      <div className="fresh-picks-stage" style={{ '--active-image': `url("${activeProduct.images[0]}")` }}>
        {picks.map((product, index) => {
          let offset = index - activeIndex;
          if (offset > total / 2) offset -= total;
          if (offset < -total / 2) offset += total;
          const isActive = offset === 0;
          const isVisible = Math.abs(offset) <= 2;

          return (
            <article
              key={product.id}
              className={`fresh-pick-card${isActive ? ' is-active' : ''}${!isVisible ? ' is-hidden' : ''}`}
              data-offset={offset}
              style={{
                left: `${50 + offset * 21}%`,
                zIndex: 3 - Math.abs(offset),
                opacity: isVisible ? 1 - Math.abs(offset) * 0.23 : 0,
                filter: `brightness(${1 - Math.abs(offset) * 0.17})`,
                transform: `translate(-50%, -50%) translateZ(${-Math.abs(offset) * 85}px) rotateY(${-offset * 28}deg) scale(${1 - Math.abs(offset) * 0.12})`,
              }}
              aria-hidden={!isActive}
              onClick={() => !isActive && setActiveIndex(index)}
            >
              <span className="fresh-pick-emoji" style={{ backgroundColor: product.color }} aria-hidden="true">{product.emoji}</span>
              <img src={product.images[0]} alt={product.name} loading="lazy" onError={(event) => { event.currentTarget.style.display = 'none'; }} />
              <div className="fresh-pick-shade" />
              {isActive && (
                <div className="fresh-pick-copy">
                  <span className="fresh-pick-tag">{product.badge || product.category}</span>
                  <div className="fresh-pick-rating"><Star size={14} fill="currentColor" /> {product.rating} <span>({product.reviewsCount} reviews)</span></div>
                  <p>{product.category}</p>
                  <h3>{product.name}</h3>
                  <span className="fresh-pick-price">${product.price.toFixed(2)} <small>/ {product.unit}</small></span>
                  <Link className="fresh-pick-cta" to={`/product/${product.id}`} tabIndex={0}>
                    Explore this pick <MoveUpRight size={16} />
                  </Link>
                </div>
              )}
            </article>
          );
        })}
        <button className="fresh-picks-arrow prev" type="button" onClick={() => move(-1)} aria-label="Previous featured product"><ArrowLeft /></button>
        <button className="fresh-picks-arrow next" type="button" onClick={() => move(1)} aria-label="Next featured product"><ArrowRight /></button>
      </div>

      <div className="fresh-picks-pagination" aria-label="Choose a featured product">
        {picks.map((product, index) => (
          <button
            key={product.id}
            type="button"
            className={index === activeIndex ? 'is-active' : ''}
            onClick={() => setActiveIndex(index)}
            aria-label={`Show ${product.name}`}
            aria-current={index === activeIndex ? 'true' : undefined}
          />
        ))}
      </div>
    </section>
  );
}
