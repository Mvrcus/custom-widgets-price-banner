import { computed, ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import type { State } from '@/utils/types'
import { v4 as uuid } from 'uuid'
import { createCss, createHtml, createJS } from '@/utils/helper'

// Service descriptions and details
const serviceDetails = {
  Emails: {
    description: "Professional email marketing campaigns to engage your audience and drive conversions.",
    frequencies: {
      Daily: "Daily email campaigns with full content creation, A/B testing, analytics, and list management.",
      Weekly: "Weekly email campaigns with content creation, basic segmentation, and performance reporting.",
      Monthly: "Monthly newsletter with content creation and basic analytics.",
    },
  },
  Blogs: {
    description: "High-quality blog content to establish thought leadership and improve SEO.",
    frequencies: {
      Daily: "Daily blog posts with comprehensive research, SEO optimization, and content distribution.",
      Weekly: "Weekly blog articles with keyword research and basic SEO optimization.",
      Monthly: "Monthly in-depth blog article with basic SEO optimization.",
    },
  },
  Ads: {
    description: "Strategic paid advertising campaigns across multiple platforms to reach your target audience.",
    frequencies: {
      Daily: "Daily ad management with continuous optimization, A/B testing, and detailed analytics.",
      Weekly: "Weekly ad updates with regular performance monitoring and basic optimization.",
      Monthly: "Monthly ad campaign setup with basic performance reporting.",
    },
  },
  "Funnels/Sales Pages": {
    description: "Conversion-optimized sales funnels and landing pages to turn visitors into customers.",
    frequencies: {
      Daily: "Comprehensive funnel management with continuous optimization, A/B testing, and conversion tracking.",
      Weekly: "Regular funnel updates with performance monitoring and basic optimization.",
      Monthly: "Monthly funnel maintenance with basic performance reporting.",
    },
  },
  Instagram: {
    description: "Engaging Instagram content and management to build your brand and connect with followers.",
    frequencies: {
      Daily: "Daily posts, stories, and engagement with comprehensive analytics and growth strategies.",
      Weekly: "Weekly content creation, posting, and basic community management.",
      Monthly: "Monthly content calendar with basic posting and minimal engagement.",
    },
  },
  "X (Twitter)": {
    description: "Strategic Twitter presence to join conversations and increase brand visibility.",
    frequencies: {
      Daily: "Daily tweets, thread creation, engagement, and trend monitoring.",
      Weekly: "Weekly content creation with scheduled posts and basic engagement.",
      Monthly: "Monthly content calendar with minimal engagement.",
    },
  },
  Facebook: {
    description: "Facebook marketing to reach your audience and drive engagement through content and community.",
    frequencies: {
      Daily: "Daily posts, community management, and comprehensive analytics.",
      Weekly: "Weekly content creation with scheduled posts and basic community management.",
      Monthly: "Monthly content calendar with minimal community management.",
    },
  },
  LinkedIn: {
    description: "Professional LinkedIn content to establish industry authority and generate B2B leads.",
    frequencies: {
      Monthly: "Monthly content creation, company page management, and basic analytics.",
    },
  },
}

// Define service metrics data structure
const serviceMetrics = {
  Emails: {
    Daily: {
      "Content Pieces": { value: 30, unit: "emails", description: "Monthly email content created" },
      "Audience Reach": { value: 15000, unit: "people", description: "Estimated monthly audience" },
      "Leads Generated": { value: 450, unit: "leads", description: "Estimated monthly leads" },
      "Time Saved": { value: 40, unit: "hours", description: "Monthly time savings" },
      ROI: { value: 250, unit: "%", description: "Estimated return on investment" },
    },
    Weekly: {
      "Content Pieces": { value: 12, unit: "emails", description: "Monthly email content created" },
      "Audience Reach": { value: 8000, unit: "people", description: "Estimated monthly audience" },
      "Leads Generated": { value: 240, unit: "leads", description: "Estimated monthly leads" },
      "Time Saved": { value: 20, unit: "hours", description: "Monthly time savings" },
      ROI: { value: 180, unit: "%", description: "Estimated return on investment" },
    },
    Monthly: {
      "Content Pieces": { value: 4, unit: "emails", description: "Monthly email content created" },
      "Audience Reach": { value: 3000, unit: "people", description: "Estimated monthly audience" },
      "Leads Generated": { value: 90, unit: "leads", description: "Estimated monthly leads" },
      "Time Saved": { value: 8, unit: "hours", description: "Monthly time savings" },
      ROI: { value: 120, unit: "%", description: "Estimated return on investment" },
    },
  },
  Blogs: {
    Daily: {
      "Content Pieces": { value: 30, unit: "articles", description: "Monthly blog content created" },
      "Audience Reach": { value: 25000, unit: "people", description: "Estimated monthly readers" },
      "SEO Impact": { value: "High", unit: "", description: "Search engine optimization impact" },
      "Time Saved": { value: 60, unit: "hours", description: "Monthly time savings" },
    },
    Weekly: {
      "Content Pieces": { value: 4, unit: "articles", description: "Monthly blog content created" },
      "Audience Reach": { value: 10000, unit: "people", description: "Estimated monthly readers" },
      "SEO Impact": { value: "Medium", unit: "", description: "Search engine optimization impact" },
      "Time Saved": { value: 24, unit: "hours", description: "Monthly time savings" },
    },
    Monthly: {
      "Content Pieces": { value: 1, unit: "article", description: "Monthly blog content created" },
      "Audience Reach": { value: 3000, unit: "people", description: "Estimated monthly readers" },
      "SEO Impact": { value: "Low", unit: "", description: "Search engine optimization impact" },
      "Time Saved": { value: 6, unit: "hours", description: "Monthly time savings" },
    },
  },
  Ads: {
    Daily: {
      "Audience Reach": { value: 50000, unit: "people", description: "Estimated monthly reach" },
      "Leads Generated": { value: 750, unit: "leads", description: "Estimated monthly leads" },
      ROI: { value: 300, unit: "%", description: "Estimated return on investment" },
      Conversions: { value: 250, unit: "sales", description: "Estimated monthly conversions" },
    },
    Weekly: {
      "Audience Reach": { value: 20000, unit: "people", description: "Estimated monthly reach" },
      "Leads Generated": { value: 300, unit: "leads", description: "Estimated monthly leads" },
      ROI: { value: 200, unit: "%", description: "Estimated return on investment" },
      Conversions: { value: 100, unit: "sales", description: "Estimated monthly conversions" },
    },
    Monthly: {
      "Audience Reach": { value: 8000, unit: "people", description: "Estimated monthly reach" },
      "Leads Generated": { value: 120, unit: "leads", description: "Estimated monthly leads" },
      ROI: { value: 150, unit: "%", description: "Estimated return on investment" },
      Conversions: { value: 40, unit: "sales", description: "Estimated monthly conversions" },
    },
  },
  "Funnels/Sales Pages": {
    Daily: {
      Conversions: { value: 300, unit: "sales", description: "Estimated monthly conversions" },
      "Leads Generated": { value: 900, unit: "leads", description: "Estimated monthly leads" },
      ROI: { value: 350, unit: "%", description: "Estimated return on investment" },
    },
    Weekly: {
      Conversions: { value: 120, unit: "sales", description: "Estimated monthly conversions" },
      "Leads Generated": { value: 360, unit: "leads", description: "Estimated monthly leads" },
      ROI: { value: 220, unit: "%", description: "Estimated return on investment" },
    },
    Monthly: {
      Conversions: { value: 40, unit: "sales", description: "Estimated monthly conversions" },
      "Leads Generated": { value: 120, unit: "leads", description: "Estimated monthly leads" },
      ROI: { value: 150, unit: "%", description: "Estimated return on investment" },
    },
  },
  Instagram: {
    Daily: {
      "Content Pieces": { value: 30, unit: "posts", description: "Monthly content created" },
      "Audience Reach": { value: 45000, unit: "people", description: "Estimated monthly reach" },
      Engagement: { value: 9000, unit: "interactions", description: "Estimated monthly engagement" },
      "Followers Growth": { value: 1500, unit: "followers", description: "Estimated monthly growth" },
    },
    Weekly: {
      "Content Pieces": { value: 12, unit: "posts", description: "Monthly content created" },
      "Audience Reach": { value: 18000, unit: "people", description: "Estimated monthly reach" },
      Engagement: { value: 3600, unit: "interactions", description: "Estimated monthly engagement" },
      "Followers Growth": { value: 600, unit: "followers", description: "Estimated monthly growth" },
    },
    Monthly: {
      "Content Pieces": { value: 4, unit: "posts", description: "Monthly content created" },
      "Audience Reach": { value: 6000, unit: "people", description: "Estimated monthly reach" },
      Engagement: { value: 1200, unit: "interactions", description: "Estimated monthly engagement" },
      "Followers Growth": { value: 200, unit: "followers", description: "Estimated monthly growth" },
    },
  },
  "X (Twitter)": {
    Daily: {
      "Content Pieces": { value: 90, unit: "tweets", description: "Monthly content created" },
      "Audience Reach": { value: 35000, unit: "people", description: "Estimated monthly reach" },
      Engagement: { value: 7000, unit: "interactions", description: "Estimated monthly engagement" },
      "Followers Growth": { value: 1200, unit: "followers", description: "Estimated monthly growth" },
    },
    Weekly: {
      "Content Pieces": { value: 20, unit: "tweets", description: "Monthly content created" },
      "Audience Reach": { value: 14000, unit: "people", description: "Estimated monthly reach" },
      Engagement: { value: 2800, unit: "interactions", description: "Estimated monthly engagement" },
      "Followers Growth": { value: 480, unit: "followers", description: "Estimated monthly growth" },
    },
    Monthly: {
      "Content Pieces": { value: 5, unit: "tweets", description: "Monthly content created" },
      "Audience Reach": { value: 3500, unit: "people", description: "Estimated monthly reach" },
      Engagement: { value: 700, unit: "interactions", description: "Estimated monthly engagement" },
      "Followers Growth": { value: 120, unit: "followers", description: "Estimated monthly growth" },
    },
  },
  Facebook: {
    Daily: {
      "Content Pieces": { value: 30, unit: "posts", description: "Monthly content created" },
      "Audience Reach": { value: 40000, unit: "people", description: "Estimated monthly reach" },
      Engagement: { value: 8000, unit: "interactions", description: "Estimated monthly engagement" },
      "Leads Generated": { value: 600, unit: "leads", description: "Estimated monthly leads" },
    },
    Weekly: {
      "Content Pieces": { value: 12, unit: "posts", description: "Monthly content created" },
      "Audience Reach": { value: 16000, unit: "people", description: "Estimated monthly reach" },
      Engagement: { value: 3200, unit: "interactions", description: "Estimated monthly engagement" },
      "Leads Generated": { value: 240, unit: "leads", description: "Estimated monthly leads" },
    },
    Monthly: {
      "Content Pieces": { value: 4, unit: "posts", description: "Monthly content created" },
      "Audience Reach": { value: 5000, unit: "people", description: "Estimated monthly reach" },
      Engagement: { value: 1000, unit: "interactions", description: "Estimated monthly engagement" },
      "Leads Generated": { value: 80, unit: "leads", description: "Estimated monthly leads" },
    },
  },
  LinkedIn: {
    Monthly: {
      "Content Pieces": { value: 4, unit: "posts", description: "Monthly content created" },
      "Audience Reach": { value: 7500, unit: "people", description: "Estimated monthly reach" },
      Engagement: { value: 1500, unit: "interactions", description: "Estimated monthly engagement" },
      "Leads Generated": { value: 100, unit: "leads", description: "Estimated monthly leads" },
      "B2B Connections": { value: 50, unit: "connections", description: "Estimated new business connections" },
    },
  },
}

const services = [
  { 
    name: "Emails", 
    icon: "Mail",
    description: serviceDetails.Emails.description,
    frequencies: serviceDetails.Emails.frequencies
  },
  { 
    name: "Blogs", 
    icon: "FileText",
    description: serviceDetails.Blogs.description,
    frequencies: serviceDetails.Blogs.frequencies
  },
  { 
    name: "Ads", 
    icon: "Bell",
    description: serviceDetails.Ads.description,
    frequencies: serviceDetails.Ads.frequencies
  },
  { 
    name: "Funnels/Sales Pages", 
    icon: "LayoutDashboard",
    description: serviceDetails["Funnels/Sales Pages"].description,
    frequencies: serviceDetails["Funnels/Sales Pages"].frequencies
  },
  { 
    name: "Instagram", 
    icon: "Instagram",
    description: serviceDetails.Instagram.description,
    frequencies: serviceDetails.Instagram.frequencies
  },
  { 
    name: "X (Twitter)", 
    icon: "Twitter",
    description: serviceDetails["X (Twitter)"].description,
    frequencies: serviceDetails["X (Twitter)"].frequencies
  },
  { 
    name: "Facebook", 
    icon: "Facebook",
    description: serviceDetails.Facebook.description,
    frequencies: serviceDetails.Facebook.frequencies
  },
  { 
    name: "LinkedIn", 
    icon: "Linkedin",
    description: serviceDetails.LinkedIn.description,
    frequencies: serviceDetails.LinkedIn.frequencies
  },
]

const frequencies = ["Daily", "Weekly", "Monthly"]

const pricingData = {
  Daily: 2000,
  Weekly: 1500,
  Monthly: 1000,
}

// Map metric names to icons
const metricIcons = {
  "Content Pieces": "Layers",
  "Audience Reach": "Users",
  "Leads Generated": "Target",
  "Time Saved": "Clock",
  ROI: "FileBarChart",
  Engagement: "Users",
  "Followers Growth": "Users",
  Conversions: "Target",
  "SEO Impact": "FileBarChart",
  "B2B Connections": "Users",
}

export const useStore = defineStore('main', () => {
  const state = ref<State & { handshake: any }>({
    handshake: undefined,
    widgetId: uuid(),
    selectedServices: {},
    activeMetricTab: 'overview',
    expandedService: null,
    serviceDetails,
    serviceMetrics,
    services,
    frequencies,
    pricingData,
    metricIcons,
  })

  const getItem = (key: keyof State) => {
    return state.value[key]
  }

  const setItem = (key: keyof State, value: any) => {
    state.value[key] = value
    console.log('State updated:', key, value)
  }

  const html = computed(() => {
    return `
    <style>${css.value}</style>
    <div class="hl-banner">
      ${body.value}
    </div>
    `
  })

  const js = computed(() => {
    return createJS(state.value)
  })

  const css = computed(() => {
    return createCss(state.value)
  })

  const body = computed(() => {
    return createHtml(state.value)
  })

  return {
    state,
    getItem,
    setItem,
    html,
    js,
    body,
    css,
    handshake: state.value.handshake
  }
})
