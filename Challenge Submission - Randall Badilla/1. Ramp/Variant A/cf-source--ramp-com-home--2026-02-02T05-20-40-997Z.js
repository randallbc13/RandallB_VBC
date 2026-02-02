/**
 * Variant: Update Bottom Headline
 * Changes the text of the bottom headline from "Time is money. Save both."
 * to "Time is money. Save both at Once".
 */

function addStyling() {
  // No custom CSS needed for this simple text change
}

function applyChanges() {
  const headline = document.querySelector('h2.headline-xs.text-center.text-primary');
  
  if (headline && headline.textContent?.includes('Time is money. Save both.')) {
    headline.textContent = 'Time is money. Save both at Once';
    
    // Emit variantRendered event only after success
    window.CFQ = window.CFQ || [];
    window.CFQ.push({ emit: 'variantRendered' });
    return true;
  }
  return false;
}

function monitorChangesByConditionAndRun(
  predicate: () => boolean,
  callback: () => void,
  timeout = 10000
) {
  if (predicate()) {
    callback();
    return;
  }

  const observer = new MutationObserver(() => {
    if (predicate()) {
      callback();
      observer.disconnect();
    }
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
  });

  setTimeout(() => {
    observer.disconnect();
  }, timeout);
}

// Initial execution
addStyling();
monitorChangesByConditionAndRun(
  () => !!document.querySelector('h2.headline-xs.text-center.text-primary'),
  applyChanges
);