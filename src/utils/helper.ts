import { currencies } from './const'
import { type Action, type Banner, type State } from './types'

// Helper functions
export const calculateTotalCost = (selectedServices: { [key: string]: string | null }, pricingData: { [key: string]: number }) => {
  return Object.entries(selectedServices).reduce((sum, [_, frequency]) => {
    return sum + (frequency ? pricingData[frequency] : 0);
  }, 0);
}

export const calculateAggregatedMetrics = (selectedServices: { [key: string]: string | null }, serviceMetrics: any) => {
  const metrics: { [key: string]: number } = {};
  const count: { [key: string]: number } = {};
  
  Object.entries(selectedServices).forEach(([service, frequency]) => {
    if (frequency && serviceMetrics[service] && serviceMetrics[service][frequency]) {
      Object.entries(serviceMetrics[service][frequency]).forEach(([metricName, metricData]: [string, any]) => {
        if (typeof metricData.value === 'number') {
          if (!metrics[metricName]) {
            metrics[metricName] = 0;
            count[metricName] = 0;
          }
          metrics[metricName] += metricData.value;
          count[metricName]++;
        }
      });
    }
  });
  
  if (count['ROI'] > 0) {
    metrics['ROI'] = Math.round(metrics['ROI'] / count['ROI']);
  }
  
  return metrics;
}

export const getUniqueMetrics = (selectedServices: { [key: string]: string | null }, serviceMetrics: any) => {
  const uniqueMetrics = new Set<string>();
  
  Object.entries(selectedServices).forEach(([service, frequency]) => {
    if (frequency && serviceMetrics[service] && serviceMetrics[service][frequency]) {
      Object.keys(serviceMetrics[service][frequency]).forEach(metricName => {
        uniqueMetrics.add(metricName);
      });
    }
  });
  
  return Array.from(uniqueMetrics);
}

export const getDetailedMetrics = (selectedServices: { [key: string]: string | null }, serviceMetrics: any) => {
  const detailedMetrics: { [key: string]: any } = {};
  
  Object.entries(selectedServices).forEach(([service, frequency]) => {
    if (frequency && serviceMetrics[service] && serviceMetrics[service][frequency]) {
      detailedMetrics[service] = {
        frequency,
        metrics: serviceMetrics[service][frequency]
      };
    }
  });
  
  return detailedMetrics;
}

export const createOverviewTab = (state: State) => {
  const { selectedServices, serviceMetrics, metricIcons } = state;
  const aggregatedMetrics = calculateAggregatedMetrics(selectedServices, serviceMetrics);
  const uniqueMetrics = getUniqueMetrics(selectedServices, serviceMetrics);
  
  return uniqueMetrics.map(metricName => {
    if (!aggregatedMetrics[metricName] && typeof aggregatedMetrics[metricName] !== 'number') return '';
    
    const MetricIcon = metricIcons[metricName] || 'Users';
    
    return `
      <div class="card">
        <div class="card-content">
          <div class="flex items-center gap-2 mb-2">
            <i class="${MetricIcon} text-blue-500"></i>
            <h3 class="text-lg font-medium">${metricName}</h3>
          </div>
          
          ${metricName === 'ROI' ? `
            <div class="flex items-baseline">
              <span class="text-3xl font-bold">${aggregatedMetrics[metricName]}</span>
              <span class="text-lg ml-1">%</span>
            </div>
          ` : `
            <div class="text-3xl font-bold">
              ${aggregatedMetrics[metricName].toLocaleString()}
            </div>
          `}
          
          ${metricName === 'Audience Reach' ? `
            <div class="mt-2 space-y-2">
              <div class="h-3 bg-blue-500 rounded-full w-full"></div>
              <div class="h-3 bg-blue-200 rounded-full w-[60%]"></div>
            </div>
          ` : ''}
          
          ${metricName === 'Engagement' ? `
            <div class="mt-2">
              <div class="h-12 bg-blue-200 rounded-full"></div>
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }).join('');
}

export const createDetailedTab = (state: State) => {
  const { selectedServices, serviceMetrics, metricIcons } = state;
  const detailedMetrics = getDetailedMetrics(selectedServices, serviceMetrics);
  
  return Object.entries(detailedMetrics).map(([service, data]) => `
    <div class="card">
      <div class="card-content">
        <h3 class="text-lg font-medium mb-2">
          ${service} (${data.frequency})
        </h3>
        <div class="grid grid-cols-2 gap-4">
          ${Object.entries(data.metrics).map(([metricName, metricData]: [string, any]) => {
            const MetricIcon = metricIcons[metricName] || 'Users';
            
            return `
              <div class="flex flex-col">
                <div class="flex items-center gap-1 text-sm text-gray-600">
                  <i class="${MetricIcon}"></i>
                  <span>${metricName}</span>
                </div>
                <div class="font-bold text-lg">
                  ${typeof metricData.value === 'number' ? metricData.value.toLocaleString() : metricData.value}
                  ${metricData.unit ? ` ${metricData.unit}` : ''}
                </div>
                <div class="text-xs text-gray-500">${metricData.description}</div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    </div>
  `).join('');
}

export const createHtml = (state: State) => {
  const { selectedServices, serviceDetails, services, frequencies, pricingData } = state
  
  return `
    <div class="container">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2">
          <div class="card">
            <div class="card-header">
              <h2 class="card-title">Select Your Services</h2>
              <p class="card-description">Choose the services and frequency you need for your marketing strategy</p>
            </div>
            <div class="card-content">
              <div class="accordion">
                ${services.map(service => `
                  <div class="accordion-item">
                    <div class="accordion-trigger">
                      <div class="flex items-center gap-3">
                        <div class="p-2 rounded-full ${selectedServices[service.name] ? 'bg-blue-100' : 'bg-gray-100'}">
                          <i class="${service.icon}"></i>
                        </div>
                        <span class="font-medium text-lg">${service.name}</span>
                      </div>
                      <div class="flex items-center gap-2">
                        <div class="flex gap-2 mr-4">
                          ${service.name === 'LinkedIn' ? `
                            <button
                              onclick="handleServiceToggle('${service.name}', 'Monthly')"
                              class="button ${selectedServices[service.name] === 'Monthly' ? 'button-primary' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}">
                              Monthly
                            </button>
                          ` : frequencies.map(freq => `
                            <button
                              onclick="handleServiceToggle('${service.name}', '${freq}')"
                              class="button ${selectedServices[service.name] === freq ? 'button-primary' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}">
                              ${freq}
                            </button>
                          `).join('')}
                        </div>
                        <button class="accordion-trigger-button">
                          <i class="info-icon"></i>
                        </button>
                      </div>
                    </div>
                    <div class="accordion-content">
                      <div class="mb-4">
                        <h3 class="font-medium mb-2">Service Description</h3>
                        <p class="text-gray-600">${service.description}</p>
                      </div>
                      <div>
                        <h3 class="font-medium mb-2">What's Included</h3>
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                          ${Object.entries(service.frequencies).map(([freq, description]) => `
                            <div class="card ${selectedServices[service.name] === freq ? 'border-blue-500 bg-blue-50' : ''}">
                              <div class="card-header py-3 px-4">
                                <h4 class="card-title text-base">${freq}</h4>
                              </div>
                              <div class="card-content py-2 px-4">
                                <p class="text-sm text-gray-600">${description}</p>
                                <p class="text-sm font-medium mt-2">$${pricingData[freq]}/month</p>
                              </div>
                            </div>
                          `).join('')}
                        </div>
                      </div>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <div class="card sticky top-6 max-h-[calc(100vh-3rem)] flex flex-col">
            <div class="card-header">
              <h2 class="card-title">Summary</h2>
              <p class="card-description">Your custom marketing package</p>
            </div>
            <div class="card-content">
              <div class="mb-6">
                ${Object.entries(selectedServices).length > 0 ? `
                  <div class="space-y-2">
                    <h3 class="font-medium">Selected Services:</h3>
                    <ul class="space-y-1">
                      ${Object.entries(selectedServices)
                        .filter(([_, freq]) => freq)
                        .map(([service, freq]) => `
                          <li class="flex justify-between">
                            <span>${service}</span>
                            <span class="text-gray-600">${freq}</span>
                          </li>
                        `).join('')}
                    </ul>
                  </div>
                ` : '<p class="text-gray-500">No services selected</p>'}
              </div>
              
              <div class="card mb-6 bg-gray-50 border-2 border-gray-200">
                <div class="card-content">
                  <h3 class="text-lg font-medium mb-1">Total estimated monthly cost</h3>
                  <div class="flex items-baseline">
                    <span class="text-5xl font-bold">$${calculateTotalCost(selectedServices, pricingData).toLocaleString()}</span>
                    <span class="text-xl text-gray-500 ml-1">/mo</span>
                  </div>
                </div>
              </div>
              
              ${Object.keys(selectedServices).length > 0 ? `
                <div class="tabs">
                  <div class="tabs-list">
                    <button class="tabs-trigger" data-state="${state.activeMetricTab === 'overview' ? 'active' : 'inactive'}" onclick="setActiveMetricTab('overview')">
                      Overview
                    </button>
                    <button class="tabs-trigger" data-state="${state.activeMetricTab === 'detailed' ? 'active' : 'inactive'}" onclick="setActiveMetricTab('detailed')">
                      Detailed
                    </button>
                  </div>
                  
                  <div class="tabs-content">
                    ${state.activeMetricTab === 'overview' ? createOverviewTab(state) : createDetailedTab(state)}
                  </div>
                </div>
                
                <button class="button button-primary w-full mt-6">Get Custom Quote</button>
              ` : ''}
            </div>
          </div>
        </div>
      </div>
    </div>
  `
}

export const getEvent = (action: Action) => {
  switch(action.type) {
    case 'openUrl': return `window.open('${action.url}');`;
    case 'openPopup': return `fireCustomWidgetEvent('customWidgetOpenPopup');`;
    case 'goToNextStep': return `fireCustomWidgetEvent('customWidgetGoToNextStep');`;
    default: return ''
  }
}

export const createJS = (state: State) => {
  return `
    function handleServiceToggle(service, frequency) {
      const currentState = window.elementStore;
      const selectedServices = { ...currentState.selectedServices };
      
      selectedServices[service] = selectedServices[service] === frequency ? null : frequency;
      
      window.elementStore = {
        ...currentState,
        selectedServices
      };
      
      updatePreview();
    }
    
    function setActiveMetricTab(tab) {
      const currentState = window.elementStore;
      window.elementStore = {
        ...currentState,
        activeMetricTab: tab
      };
      updatePreview();
    }
    
    function updatePreview() {
      const event = new Event('updatePreview');
      window.dispatchEvent(event);
    }
  `
}

export const createCss = (state: State) => {
  return `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap');
    
    .container {
      padding: 1.5rem;
      background-color: transparent;
      max-width: 1280px;
      margin: 0 auto;
    }
    
    .grid {
      display: grid;
      gap: 2rem;
    }
    
    .grid-cols-1 {
      grid-template-columns: repeat(1, minmax(0, 1fr));
    }
    
    .lg\\:grid-cols-3 {
      @media (min-width: 1024px) {
        grid-template-columns: repeat(3, minmax(0, 1fr));
      }
    }
    
    .lg\\:col-span-2 {
      @media (min-width: 1024px) {
        grid-column: span 2 / span 2;
      }
    }
    
    .card {
      background-color: white;
      border-radius: 0.5rem;
      box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
      overflow: hidden;
    }
    
    .card-header {
      padding: 1.5rem;
    }
    
    .card-title {
      font-size: 1.5rem;
      font-weight: 600;
      line-height: 1.25;
    }
    
    .card-description {
      color: #6B7280;
      font-size: 0.875rem;
      margin-top: 0.5rem;
    }
    
    .card-content {
      padding: 1.5rem;
    }
    
    .accordion {
      width: 100%;
    }
    
    .accordion-item {
      border-bottom: 1px solid #E5E7EB;
    }
    
    .accordion-trigger {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem;
      width: 100%;
      text-align: left;
      background: none;
      border: none;
      cursor: pointer;
      gap: 1rem;
    }
    
    .accordion-content {
      padding: 1rem;
      background-color: #F9FAFB;
    }
    
    .button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 0.5rem 1rem;
      border-radius: 9999px;
      font-weight: 500;
      transition: all 0.2s;
      cursor: pointer;
      font-size: 0.875rem;
      border: none;
      outline: none;
      min-width: 80px;
    }
    
    .button-primary {
      background-color: #3B82F6;
      color: white;
    }
    
    .button-primary:hover {
      background-color: #2563EB;
    }
    
    .accordion-trigger-button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: #F3F4F6;
      border: none;
      cursor: pointer;
      transition: all 0.2s;
    }
    
    .accordion-trigger-button:hover {
      background: #E5E7EB;
    }
    
    .tabs {
      width: 100%;
    }
    
    .tabs-list {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1rem;
      margin-bottom: 1rem;
    }
    
    .tabs-trigger {
      padding: 0.5rem 1rem;
      border-radius: 0.375rem;
      font-weight: 500;
      text-align: center;
      cursor: pointer;
      transition: all 0.2s;
      background-color: #F3F4F6;
      color: #4B5563;
    }
    
    .tabs-trigger[data-state="active"] {
      background-color: #3B82F6;
      color: white;
    }
    
    .tabs-content {
      padding: 1rem;
    }
    
    .flex {
      display: flex;
    }
    
    .items-center {
      align-items: center;
    }
    
    .justify-between {
      justify-content: space-between;
    }
    
    .gap-2 {
      gap: 0.5rem;
    }
    
    .gap-3 {
      gap: 0.75rem;
    }
    
    .gap-4 {
      gap: 1rem;
    }
    
    .mr-4 {
      margin-right: 1rem;
    }
    
    .mb-2 {
      margin-bottom: 0.5rem;
    }
    
    .mb-4 {
      margin-bottom: 1rem;
    }
    
    .mb-6 {
      margin-bottom: 1.5rem;
    }
    
    .mt-2 {
      margin-top: 0.5rem;
    }
    
    .mt-4 {
      margin-top: 1rem;
    }
    
    .mt-6 {
      margin-top: 1.5rem;
    }
    
    .p-2 {
      padding: 0.5rem;
    }
    
    .p-4 {
      padding: 1rem;
    }
    
    .p-6 {
      padding: 1.5rem;
    }
    
    .rounded-full {
      border-radius: 9999px;
    }
    
    .rounded-lg {
      border-radius: 0.5rem;
    }
    
    .text-sm {
      font-size: 0.875rem;
    }
    
    .text-lg {
      font-size: 1.125rem;
    }
    
    .text-xl {
      font-size: 1.25rem;
    }
    
    .text-2xl {
      font-size: 1.5rem;
    }
    
    .text-3xl {
      font-size: 1.875rem;
    }
    
    .text-4xl {
      font-size: 2.25rem;
    }
    
    .text-5xl {
      font-size: 3rem;
    }
    
    .font-medium {
      font-weight: 500;
    }
    
    .font-bold {
      font-weight: 700;
    }
    
    .text-gray-500 {
      color: #6B7280;
    }
    
    .text-gray-600 {
      color: #4B5563;
    }
    
    .text-gray-700 {
      color: #374151;
    }
    
    .bg-gray-50 {
      background-color: #F9FAFB;
    }
    
    .bg-gray-100 {
      background-color: #F3F4F6;
    }
    
    .bg-gray-200 {
      background-color: #E5E7EB;
    }
    
    .bg-blue-50 {
      background-color: #EFF6FF;
    }
    
    .bg-blue-100 {
      background-color: #DBEAFE;
    }
    
    .bg-blue-500 {
      background-color: #3B82F6;
    }
    
    .text-blue-500 {
      color: #3B82F6;
    }
    
    .border-blue-500 {
      border-color: #3B82F6;
    }
    
    .border-2 {
      border-width: 2px;
    }
    
    .border-gray-200 {
      border-color: #E5E7EB;
    }
    
    .sticky {
      position: sticky;
    }
    
    .top-6 {
      top: 1.5rem;
    }
    
    .max-h-\\[calc\\(100vh-3rem\\)\\] {
      max-height: calc(100vh - 3rem);
    }
    
    .flex-col {
      flex-direction: column;
    }
    
    .flex-grow {
      flex-grow: 1;
    }
    
    .flex-shrink-0 {
      flex-shrink: 0;
    }
    
    .overflow-y-auto {
      overflow-y: auto;
    }
    
    .space-y-1 > * + * {
      margin-top: 0.25rem;
    }
    
    .space-y-2 > * + * {
      margin-top: 0.5rem;
    }
    
    .space-y-4 > * + * {
      margin-top: 1rem;
    }
    
    .space-y-6 > * + * {
      margin-top: 1.5rem;
    }
  `
}

export const generateId = (name: string) => {
  return name.split(' ').join('-').toLowerCase()
}

export const getCurrencySymbol = (currency: string) => {
  return currencies.find((item) => item.value === currency)?.symbol || currency
}

export const padZero = (str: string, len: number = 2) => {
  const zeros = new Array(len).join('0')
  return (zeros + str).slice(-len)
}

export const invertColor = (hex: string) => {
  if (hex.indexOf('#') === 0) {
    hex = hex.slice(1)
  }
  // convert 3-digit hex to 6-digits.
  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2]
  }
  if (hex.length !== 6) {
    throw new Error('Invalid HEX color.')
  }
  // invert color components
  const r = (255 - parseInt(hex.slice(0, 2), 16)).toString(16),
    g = (255 - parseInt(hex.slice(2, 4), 16)).toString(16),
    b = (255 - parseInt(hex.slice(4, 6), 16)).toString(16)
  // pad each with zeros and return
  return '#' + padZero(r) + padZero(g) + padZero(b)
}
