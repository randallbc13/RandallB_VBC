// Example: Should use MutationObserver to wait for the element to be available
function monitorChangesByConditionAndRun(condition: () => boolean, callback: () => void) {
  if (condition()) {
    callback();
    return;
  }

  const observer = new MutationObserver(() => {
    if (condition()) {
      callback();
      observer.disconnect();
    }
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
  });
}

function Step({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="cf:flex cf:flex-col cf:items-center cf:text-center cf:p-6 cf:bg-[#f4f2f0] cf:rounded-2xl cf:transition-transform cf:hover:scale-[1.02]">
      <div className="cf:w-12 cf:h-12 cf:flex cf:items-center cf:justify-center cf:rounded-full cf:bg-[#f6fab2] cf:mb-6">
        <i data-lucide={icon} className="cf:w-6 cf:h-6 cf:text-black" />
      </div>
      <h3 className="cf:text-xl cf:font-semibold cf:mb-3 cf:text-black">{title}</h3>
      <p className="cf:text-gray-600 cf:leading-relaxed">{description}</p>
    </div>
  );
}

function SectionHeader() {
  return (
    <div className="cf:text-center cf:mb-16 cf:md:mb-24">
      <h2 className="cf:text-4xl cf:md:text-5xl cf:font-medium cf:mb-6 cf:text-black">
        How Ramp works
      </h2>
      <p className="cf:text-lg cf:text-gray-600 cf:max-w-2xl cf:mx-auto">
        Get more done with less effort. Ramp automates your entire finance stack so you can focus on growth.
      </p>
    </div>
  );
}

function StepsGrid() {
  return (
    <div className="cf:grid cf:grid-cols-1 cf:md:grid-cols-3 cf:gap-8 cf:lg:gap-12">
      <Step 
        icon="credit-card"
        title="1. Issue cards"
        description="Give your team virtual or physical cards with built-in spending limits and approval flows."
      />
      <Step 
        icon="zap"
        title="2. Automate expenses"
        description="Our AI-powered platform captures receipts and categorizes transactions automatically in real-time."
      />
      <Step 
        icon="bar-chart"
        title="3. Scale & save"
        description="Get deep insights into your spending and find automated savings to put money back in your pocket."
      />
    </div>
  );
}

function HowItWorks() {
  return (
    <section id="cf-how-it-works" className="cf:bg-white cf:py-20 cf:px-4 cf:md:py-32">
      <div className="cf:max-w-screen-2xl cf:mx-auto cf:px-4 cf:md:px-8 cf:lg:px-12 cf:xl:px-16">
        <SectionHeader />
        <StepsGrid />
      </div>
    </section>
  );
}

function applyVariant() {
  const heroBackground = document.querySelector('.HomeHero-module__t3RhXa__hero-background-dusk');
  const sectionId = 'cf-how-it-works';
  const existingSection = document.getElementById(sectionId);
  
  if (heroBackground && !existingSection) {
    heroBackground.insertAdjacentElement('afterend', <HowItWorks />);
    
    window.CFQ = window.CFQ || [];
    window.CFQ.push({ emit: 'variantRendered' });
  }
}

monitorChangesByConditionAndRun(
  () => !!document.querySelector('.HomeHero-module__t3RhXa__hero-background-dusk'),
  applyVariant
);
