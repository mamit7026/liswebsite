const Joi = require('joi');

const demoRequestSchema = Joi.object({
  fullName: Joi.string().trim().min(2).max(100).required().messages({
    'string.empty': 'Please enter your full name.',
    'string.min': 'Full name must be at least 2 characters long.',
    'any.required': 'Full name is required.'
  }),
  email: Joi.string().trim().email({ tlds: { allow: false } }).required().messages({
    'string.empty': 'Please provide an institutional or corporate email.',
    'string.email': 'Please enter a valid email address.',
    'any.required': 'Email address is required.'
  }),
  phone: Joi.string().trim().allow('').max(25),
  organization: Joi.string().trim().min(2).max(150).required().messages({
    'string.empty': 'Please enter your institution or laboratory name.',
    'any.required': 'Laboratory or organization name is required.'
  }),
  labType: Joi.string().valid(
    'Hospital & Health System',
    'Commercial Reference Lab',
    'Molecular & Pathology Lab',
    'Genomics & NGS Core',
    'Biobanking & Environmental',
    'CRO / Clinical Research',
    'Other'
  ).default('Clinical Reference Lab'),
  dailyTestVolume: Joi.string().valid(
    '< 500 tests/day',
    '500 - 2,500 tests/day',
    '2,500 - 10,000 tests/day',
    '10,000+ tests/day'
  ).default('500 - 2,500 tests/day'),
  timeframe: Joi.string().valid(
    'Immediate (1-3 months)',
    '3-6 months',
    '6-12 months',
    'Just Researching'
  ).default('3-6 months'),
  modulesOfInterest: Joi.alternatives().try(
    Joi.array().items(Joi.string()),
    Joi.string().custom((val) => [val])
  ).default([]),
  notes: Joi.string().trim().allow('').max(1000)
});

const contactMessageSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).required().messages({
    'string.empty': 'Please provide your name.',
    'any.required': 'Name is required.'
  }),
  email: Joi.string().trim().email({ tlds: { allow: false } }).required().messages({
    'string.empty': 'Email address is required.',
    'string.email': 'Valid email address is required.'
  }),
  phone: Joi.string().trim().allow('').max(25),
  company: Joi.string().trim().min(2).max(150).required().messages({
    'string.empty': 'Organization / Lab name is required.'
  }),
  department: Joi.string().valid(
    'Enterprise Sales',
    'Technical Support',
    'HL7/FHIR Integrations',
    'Billing & RCM',
    'Partnerships'
  ).default('Enterprise Sales'),
  subject: Joi.string().trim().min(3).max(200).required().messages({
    'string.empty': 'Subject line is required.'
  }),
  message: Joi.string().trim().min(10).max(2000).required().messages({
    'string.empty': 'Please enter your message or question.',
    'string.min': 'Message must be at least 10 characters long.'
  })
});

const newsletterSchema = Joi.object({
  email: Joi.string().trim().email({ tlds: { allow: false } }).required().messages({
    'string.empty': 'Please enter an email address to subscribe.',
    'string.email': 'Please enter a valid email address.'
  })
});

module.exports = {
  demoRequestSchema,
  contactMessageSchema,
  newsletterSchema
};
