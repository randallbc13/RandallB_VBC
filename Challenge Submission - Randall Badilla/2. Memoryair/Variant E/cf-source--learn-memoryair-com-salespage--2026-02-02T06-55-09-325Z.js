const VARIANT_NAME = 'Benefit Icons Under Headline';

/**
 * Benefits component with icons
 */
function BenefitsList() {
  const benefits = [
    { text: '300% Memory Improvement', icon: 'brain' },
    { text: 'Works While You Sleep', icon: 'moon' },
    { text: '100% Natural & Drug-Free', icon: 'leaf' },
    { text: 'Clinical Neuroscience Research', icon: 'microscope' }
  ];

  return (
    <div id="cf-benefits-section" className="cf:flex cf:flex-col cf:gap-4 cf:z-[100] cf:absolute cf:max-w-[400px]">
      {benefits.map((benefit) => (
        <div key={benefit.text} className="cf:flex cf:items-center cf:gap-4">
          <div className="cf:flex cf:items-center cf:justify-center cf:w-10 cf:h-10 cf:rounded-full cf:bg-black cf:text-white cf:shrink-0">
            <i data-lucide={benefit.icon} className="cf:w-6 cf:h-6" />
          </div>
          <span className="cf:text-[18px] cf:font-bold cf:text-black cf:leading-tight cf:font-sans">
            {benefit.text}
          </span>
        </div>
      ))}
    </div>
  );
}

/**
 * Position the benefits list and move other elements down
 */
function positionElements(benefits: HTMLElement, headline: HTMLElement, button: HTMLElement, container: HTMLElement) {
  const computed = window.getComputedStyle(headline);
  const isCentered = computed.textAlign === 'center';
  
  const top = headline.offsetTop + headline.offsetHeight + 24;
  
  Object.assign(benefits.style, {
    top: `${top}px`,
    left: isCentered ? '50%' : `${headline.offsetLeft}px`,
    transform: isCentered ? 'translateX(-50%)' : 'none',
    width: isCentered ? 'auto' : `${headline.offsetWidth}px`,
    textAlign: isCentered ? 'center' : 'left'
  });

  if (isCentered) benefits.classList.add('cf:items-center');

  const bHeight = benefits.offsetHeight || 180;
  button.style.top = `${top + bHeight + 32}px`;
  
  const currentHeight = parseInt(container.style.height || '0');
  container.style.height = `${Math.max(currentHeight, top + bHeight + 120)}px`;
}

/**
 * Main function to apply the variant changes
 */
function applyVariant() {
  const headline = document.querySelector('#lp-pom-text-422') as HTMLElement;
  const button = document.querySelector('#lp-pom-button-423') as HTMLElement;
  const container = document.querySelector('#lp-pom-box-415') as HTMLElement;

  if (!headline || !button || !container || document.getElementById('cf-benefits-section')) return;

  const benefits = <BenefitsList /> as HTMLElement;
  headline.insertAdjacentElement('afterend', benefits);

  requestAnimationFrame(() => {
    positionElements(benefits, headline, button, container);
    window.CFQ = window.CFQ || [];
    window.CFQ.push({ emit: 'variantRendered' });
    console.log(`${VARIANT_NAME} applied.`);
  });
}

/**
 * Wait for elements to be available
 */
function monitorChanges() {
  const observer = new MutationObserver((mutations) => {
    const target = document.querySelector('#lp-pom-text-422');
    if (target && !document.getElementById('cf-benefits-section')) {
      applyVariant();
    }
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true
  });

  applyVariant();
}

monitorChanges();
