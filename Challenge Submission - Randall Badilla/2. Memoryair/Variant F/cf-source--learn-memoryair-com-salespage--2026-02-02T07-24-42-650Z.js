// @coframe-ignore-query: [data-lucide]

function addBaseStyles() {
  const style = document.createElement('style');
  style.textContent = `
    #lp-pom-root, .lp-pom-block { background-color: #f1f8f1 !important; }
    .lp-pom-box { border-radius: 12px !important; overflow: hidden; }
    .lp-pom-text, .lp-pom-text * { color: #14532d !important; }
    .cf-leaf-decoration {
      position: absolute; opacity: 0.15; pointer-events: none;
      z-index: 0; color: #166534;
    }
    .cf-natural-bg {
      background-image: radial-gradient(circle at 2px 2px, #dcfce7 1px, transparent 0);
      background-size: 24px 24px;
    }
  `;
  document.head.appendChild(style);
}

function addBlockStyles() {
  const style = document.createElement('style');
  style.textContent = `
    #lp-pom-block-414, #lp-pom-block-11, #lp-pom-block-18, #lp-pom-block-32, 
    #lp-pom-block-63, #lp-pom-block-81, #lp-pom-block-67, #lp-pom-block-68, 
    #lp-pom-block-69, #lp-pom-block-73, #lp-pom-block-393 {
      background-color: #1a3a1a !important;
    }
    .lp-pom-button {
      background-color: #4ade80 !important; border-color: #166534 !important;
      color: #052e16 !important; transition: all 0.3s ease; font-weight: 700 !important;
    }
    .lp-pom-button:hover { background-color: #22c55e !important; transform: scale(1.05); }
  `;
  document.head.appendChild(style);
}

function addTextStyles() {
  const style = document.createElement('style');
  style.textContent = `
    #lp-pom-block-414 .lp-pom-text, #lp-pom-block-414 .lp-pom-text *,
    #lp-pom-block-11 .lp-pom-text, #lp-pom-block-11 .lp-pom-text *,
    #lp-pom-block-18 .lp-pom-text, #lp-pom-block-18 .lp-pom-text *,
    #lp-pom-block-32 .lp-pom-text, #lp-pom-block-32 .lp-pom-text *,
    #lp-pom-block-63 .lp-pom-text, #lp-pom-block-63 .lp-pom-text *,
    #lp-pom-block-81 .lp-pom-text, #lp-pom-block-81 .lp-pom-text *,
    #lp-pom-block-67 .lp-pom-text, #lp-pom-block-67 .lp-pom-text *,
    #lp-pom-block-68 .lp-pom-text, #lp-pom-block-68 .lp-pom-text *,
    #lp-pom-block-69 .lp-pom-text, #lp-pom-block-69 .lp-pom-text *,
    #lp-pom-block-73 .lp-pom-text, #lp-pom-block-73 .lp-pom-text *,
    #lp-pom-block-393 .lp-pom-text, #lp-pom-block-393 .lp-pom-text *,
    #lp-pom-text-397, #lp-pom-text-397 *, #lp-pom-text-398, #lp-pom-text-398 *,
    #lp-pom-text-411, #lp-pom-text-411 *, #lp-pom-text-412, #lp-pom-text-412 *,
    #lp-pom-text-82, #lp-pom-text-82 *, #lp-pom-text-83, #lp-pom-text-83 *,
    #lp-pom-text-91, #lp-pom-text-91 *, #lp-pom-text-92, #lp-pom-text-92 *,
    #lp-pom-text-95, #lp-pom-text-95 * {
      color: #ffffff !important;
    }
  `;
  document.head.appendChild(style);
}

function PlantDecoration({ top, left, right, bottom, size = 48, rotate = 0 }: any) {
  const style: any = {
    top: top !== undefined ? top : 'auto',
    left: left !== undefined ? left : 'auto',
    right: right !== undefined ? right : 'auto',
    bottom: bottom !== undefined ? bottom : 'auto',
    width: `${size}px`,
    height: `${size}px`,
    transform: `rotate(${rotate}deg)`,
  };
  return (
    <div className="cf-leaf-decoration" style={style}>
      <i data-lucide="leaf" className="cf:w-full cf:h-full" />
    </div>
  );
}

function decorateHero(hero: HTMLElement) {
  hero.style.position = 'relative';
  hero.appendChild(<PlantDecoration top="10%" left="5%" size={120} rotate={45} />);
  hero.appendChild(<PlantDecoration bottom="10%" right="5%" size={150} rotate={-30} />);
}

function decorateBlocks() {
  const blocks = document.querySelectorAll('.lp-pom-block');
  blocks.forEach((block, index) => {
    if (index % 3 === 0) {
      (block as HTMLElement).style.position = 'relative';
      block.appendChild(<PlantDecoration top="20px" right="20px" size={40} rotate={index * 45} />);
    }
  });
}

function updateButtons() {
  const buttons = document.querySelectorAll('.lp-pom-button');
  buttons.forEach(btn => {
    const label = btn.querySelector('.label');
    if (label && !btn.querySelector('[data-lucide]')) {
      const icon = <i data-lucide="sprout" className="cf:inline-block cf:mr-2 cf:w-5 cf:h-5 cf:align-middle" />;
      label.prepend(icon);
    }
  });
}

function applyVariant() {
  addBaseStyles();
  addBlockStyles();
  addTextStyles();
  const root = document.getElementById('lp-pom-root');
  if (root) {
    root.classList.add('cf-natural-bg');
    const hero = document.getElementById('lp-pom-block-414');
    if (hero) decorateHero(hero);
    decorateBlocks();
  }
  updateButtons();
  window.CFQ = window.CFQ || [];
  window.CFQ.push({ emit: 'variantRendered' });
}

// Initialize
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', applyVariant);
} else {
  applyVariant();
}