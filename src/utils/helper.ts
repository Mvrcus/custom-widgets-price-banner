import { currencies } from './const'
import { type Action, type Banner, type State } from './types'

export const createHtml = (state: State) => {
  const { widgetId, currency } = state
  const currencySymbol = getCurrencySymbol(currency as string)
  const banners = state.banners as Banner[]
  console.log('banners', banners)
  let html = `
    <div id="widget-${widgetId}">
        <div class="table-container">
        {{banners}}
        </div>
    </div>
    `

  const bannerCode = banners.map((banner, index) => {
    let outline = `
        <div class="table-banner">
            <div class="table-header-container table-row">
                <p class="table-banner-title">${banner.title}</p>
                ${
                  banner.subtitle
                    ? `<span class="table-banner-subtitle">${banner.subtitle}</span>`
                    : ''
                }
            </div>
            ${
              banner.image
                ? `
            <div class="table-image-container table-row">
                <img src="${banner.image}" alt="Banner Image"/>
            </div>
            `
                : ''
            }
            {{list}}
            <div class="table-footer-container table-row">
                ${banner.price.preText? `<p class="table-banner-pre-text">${banner.price.preText}</p>` :''}
                <p class="table-banner-amount">
                    <span class="table-banner-currency">${currencySymbol}</span>
                    ${banner.price.amount}
                </p>
                <p class="table-banner-per">${banner.price.per}</p>
                <a id="table-banner-${index}-action" class="table-banner-action">Get This Offer</a>
            </div>
        </div>
        `
    const list =
      banner.list?.split(',')?.map((listItem) => {
        return `
            <div class="table-row">
                <span class="table-list-item">${listItem}</span>
            </div>
            `
      }) || []

    outline = outline.replace('{{list}}', list.join(''))
    return outline
  })
  html = html.replace('{{banners}}', bannerCode.join(''))
  return html
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
  const banners = state.banners as Banner[]
  const actions = banners.map((banner, index)=>{
    return `
    var button_${index} = document.getElementById('table-banner-${index}-action');
    if (button_${index}) {
      button_${index}.addEventListener('click', function(){
        ${getEvent(banner.action)}
      });
    }
    `
    
  })
  return `
  function fireCustomWidgetEvent(name) {
    var event = new Event(name);
    window.dispatchEvent(event)
  }
  {{actions}}
  `.replace('{{actions}}',actions.join(''))
}

export const createCss = (state: State) => {
  const { headlineFont, contentFont, buttonColor, widgetId } = state
  return `
    @import url('https://fonts.googleapis.com/css2?family=${headlineFont}:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=${contentFont}:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700&display=swap');
    
    .table-container {
        display:flex;
        flex:1;
    }
    #widget-${widgetId} .table-container {
        background-color: #ffffff;
        border: 1px solid #f5f5f5;
    }
    #widget-${widgetId} .table-banner .table-row {
        border-right: 1px solid #f5f5f5;
    }
    #widget-${widgetId} .table-banner:first-child .table-row {
        border-left: none;
    }
    #widget-${widgetId} .table-banner:last-child .table-row {
        border-right: none;
    }
    #widget-${widgetId} .table-row {
        border-bottom: 1px solid #f5f5f5;
        font-family: '${contentFont}';
        padding: 15px;
        display: block;
    }
    #widget-${widgetId} .table-row:first-child {
        border-top: none;
    }
    #widget-${widgetId} .table-row:last-child {
        border-bottom: none;
    }
    #widget-${widgetId} .table-header-container {
        background-color: ${buttonColor};
        border: 1px solid ${buttonColor} !important;
        font-family: '${headlineFont}' !important;
        color: rgb(255, 255, 255);
        font-weight: normal;
        font-style: normal;
        text-align: center;
        padding: 32px 15px;
    }
    #widget-${widgetId} .table-banner-title {
        font-size: 24px;
        margin: 0;
        padding: 0;
    }
    #widget-${widgetId} .table-banner-subtitle {
        font-size: 15px;
        margin: 0;
        padding: 0;    
    }
    #widget-${widgetId} .table-image-container {
        padding: 0 !important;  
    }
    #widget-${widgetId} .table-image-container img {
        width: 100%   
    }
    #widget-${widgetId} .table-list-item {
        color: rgb(17, 17, 17, 0.7);
        font-size: 14px;
        text-align: left;
    }
    #widget-${widgetId} .table-footer-container {
        padding: 20px;
        display:grid;
        text-align:center;
    }
    #widget-${widgetId} .table-footer-container p {
        text-align:center;
        margin:0;
        padding:0;
    }
    #widget-${widgetId} .table-banner-pre-text,
    #widget-${widgetId} .table-banner-per {
        color: rgba(17,17,17,0.7);
        font-size: 13px;
        font-weight: 400;
        line-height: 20px;
    }
    #widget-${widgetId} .table-banner-action {
        height: 36px;
        line-height: 34px;
        padding: 12px 32px;
        font-size: 15px;
        text-decoration: none;
        background-color: ${buttonColor};
        color: ${invertColor(buttonColor as string)};
        border-radius: 5px;
        margin-top: 20px;
        cursor: pointer;
    }
    .table-banner-amount{
        font-size: 24px;
        font-weight: normal;
        font-style: normal;
    }
    .table-banner-currency {
        font-size: 13px;
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
