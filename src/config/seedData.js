const solutionsData = [
  {
    slug: 'clinical-diagnostics',
    title: 'Clinical Diagnostics & Core Lab LIS',
    tagline: 'High-throughput, end-to-end automation for modern clinical laboratories',
    category: 'Clinical Systems',
    heroHighlight: 'Processes 40M+ patient samples annually with 99.99% uptime',
    shortDesc: 'Unify hematology, chemistry, microbiology, urinalysis, and immunology under an intelligent, bidirectional automated workflow engine.',
    fullDesc: 'LISDESK Clinical Diagnostics Suite is built to eliminate manual transcription, accelerate turnaround times (TAT), and ensure zero sample misidentification. With direct bi-directional interfaces to leading analyzer manufacturers (Roche, Abbott, Siemens, Beckman Coulter) and seamless EHR integration (Epic, Cerner, MEDITECH), your laboratory can scale without growing headcount.',
    icon: 'bi-activity',
    badgeText: 'High-Throughput Core Lab',
    keyFeatures: [
      'Multi-department automated accessioning with 2D DataMatrix barcoding',
      'Rules-based auto-verification engine (approves up to 85% of normal results automatically)',
      'Delta checks, reflex testing, and critical value paging within seconds',
      'Integrated quality control (Levey-Jennings, Westgard multi-rules evaluation)',
      'Real-time analyzer status monitoring & bidirectional ASTM / HL7 interfaces'
    ],
    benefits: [
      { title: 'Turnaround Time', description: 'Reduction in routine specimen processing time', stat: '-42%' },
      { title: 'Auto-Verification', description: 'Normal result sets auto-verified without manual intervention', stat: '85%+' },
      { title: 'Transcription Errors', description: 'Direct analyzer bidirectional query eliminating human error', stat: '0.0%' }
    ],
    workflowSteps: [
      { stepNumber: 1, title: 'Pre-Analytical Accessioning', detail: 'Automated barcode generation, specimen triaging, and EHR order validation via FHIR/HL7.' },
      { stepNumber: 2, title: 'Intelligent Routing & Testing', detail: 'Specimen dispatched to track line or analyzer rack with auto-dilution and reflex logic.' },
      { stepNumber: 3, title: 'Automated QC & Verification', detail: 'Westgard rule check, delta checks against patient history, auto-release of benign findings.' },
      { stepNumber: 4, title: 'Instant Multi-Channel Reporting', detail: 'Encrypted physician portal release, EHR chart drop, and SMS/email notifications to patients.' }
    ],
    complianceStandards: ['CLIA 88', 'CAP Accredited', 'ISO 15189', 'HIPAA Omnibus', 'FDA 21 CFR Part 11'],
    displayOrder: 1
  },
  {
    slug: 'molecular-pathology',
    title: 'Anatomic Pathology & Molecular LIS',
    tagline: 'Precision tissue tracking, digital pathology, and molecular diagnostic workflows',
    category: 'Pathology & Genetics',
    heroHighlight: 'Seamless grossing-to-signout histology and immunohistochemistry tracking',
    shortDesc: 'Purpose-built for surgical pathology, cytology, dermatopathology, and molecular oncology with integrated voice recognition and synoptic reporting.',
    fullDesc: 'Engineered specifically for anatomic pathology practices and reference laboratories, this suite unifies cassette printing, slide tracking, microscopic examination, and CAP synoptic reporting. Seamlessly bridge traditional tissue diagnostics with molecular assays, FISH, PCR, and NGS tumor profiling within a single consolidated patient timeline.',
    icon: 'bi-virus',
    badgeText: 'Precision Pathology',
    keyFeatures: [
      'Positive patient identification with laser-etched cassette and slide tracking',
      'CAP Cancer Protocols synoptic reporting templates built-in',
      'Integration with leading Whole Slide Imaging (WSI) digital pathology platforms (Philips, Leica, Hamamatsu)',
      'Built-in speech-to-text medical dictation with specialized pathology vocabularies',
      'Integrated molecular reflex panels for oncology biomarkers (HER2, EGFR, KRAS, BRAF)'
    ],
    benefits: [
      { title: 'Specimen Traceability', description: 'End-to-end chain of custody from grossing station to archived block', stat: '100%' },
      { title: 'Sign-out Efficiency', description: 'Faster diagnostic signout using structured synoptic macro templates', stat: '3.5x' },
      { title: 'Digital Pathology Readiness', description: 'Native DICOM/WSI integration for remote telepathology consultations', stat: 'Ready' }
    ],
    workflowSteps: [
      { stepNumber: 1, title: 'Grossing & Cassette Barcoding', detail: 'Tissue dictation, specimen photography, and real-time 2D cassette printing.' },
      { stepNumber: 2, title: 'Histology & Microtomy', detail: 'Technologist barcode verification, slide labelling, and automated stainer interface.' },
      { stepNumber: 3, title: 'Pathologist Review & Dictation', detail: 'Digital slide viewer or optical microscope review with CAP synoptic templates.' },
      { stepNumber: 4, title: 'Integrated Sign-Out & Tumour Board', detail: 'Consolidated pathology + molecular report with e-signature and remote access.' }
    ],
    complianceStandards: ['CAP Anatomic Pathology', 'CLIA', 'HIPAA', 'HL7 FHIR DiagnosticReport'],
    displayOrder: 2
  },
  {
    slug: 'genomics-ngs',
    title: 'Genomics & Next-Gen Sequencing (NGS) Informatics',
    tagline: 'Bridging high-throughput sequencers with clinical interpretation and variant classification',
    category: 'Precision Genomics',
    heroHighlight: 'Automated FASTQ-to-VCF bioinformatic pipeline orchestration',
    shortDesc: 'Scale targeted gene panels, whole exome (WES), and whole genome sequencing (WGS) with clinical-grade variant annotation and ACMG reporting.',
    fullDesc: 'Modeled after state-of-the-art sequencing workflows (such as Illumina Connected Analytics and DRAGEN pipelines), our Genomics module orchestrates sample library prep, flow cell loading, run metrics, secondary bioinformatic pipelines, and tertiary clinical variant curation (ACMG/AMP guidelines) into compliant clinical molecular reports.',
    icon: 'bi-dna',
    badgeText: 'Genomic Informatics',
    keyFeatures: [
      'Library preparation pooling, index balancing, and flow cell mapping',
      'Direct API orchestration with Illumina NovaSeq, NextSeq, and MiSeq sequencers',
      'Secondary analysis pipeline trigger (BWA-MEM, GATK, DRAGEN) with QC metrics tracking (Q30, coverage depth)',
      'ACMG / AMP guidelines variant interpretation workbench with ClinVar and gnomAD links',
      'Automated clinical genomic reporting with therapy associations and clinical trial matches'
    ],
    benefits: [
      { title: 'Variant Curation Speed', description: 'Streamlined evidence curation for pathogenic classifications', stat: '65% Faster' },
      { title: 'Sequencer Integration', description: 'Direct automated run folder parsing and sample sheet dispatch', stat: 'Direct' },
      { title: 'Audit Trail', description: 'Complete bioinformatic versioning, pipeline checksums, and sign-offs', stat: '100% Traceable' }
    ],
    workflowSteps: [
      { stepNumber: 1, title: 'Extraction & Library Prep', detail: 'DNA/RNA quantification, normalization calculations, and index assignment.' },
      { stepNumber: 2, title: 'Sequencing Run Orchestration', detail: 'Automated sample sheet generation and push to Illumina sequencers.' },
      { stepNumber: 3, title: 'Bioinformatics & QC', detail: 'Automated FASTQ demultiplexing, alignment, variant calling, and coverage analytics.' },
      { stepNumber: 4, title: 'Clinical Interpretation & Sign-out', detail: 'ACMG classification workbench, oncologist curation, and PDF clinical report delivery.' }
    ],
    complianceStandards: ['ACMG / AMP Guidelines', 'CAP Molecular Pathology', 'CLIA NGS Validation', 'FDA Part 11'],
    displayOrder: 3
  },
  {
    slug: 'enterprise-rcm',
    title: 'Laboratory Revenue Cycle Management (RCM) & Billing',
    tagline: 'Eliminate denials, capture every charge, and accelerate lab cash flow',
    category: 'Revenue & Operations',
    heroHighlight: 'First-pass clean claims rate exceeding 96.8%',
    shortDesc: 'Unified front-end demographic verification, real-time eligibility checks, automated LCD/NCD medical necessity validation, and automated claim submission.',
    fullDesc: 'Most laboratory revenue leaks happen before the specimen even reaches the testing bench. Inspired by LigoLabâ€™s comprehensive LIS & RCM Operating System, our platform integrates billing directly with the analytical accessioning layer. Every order is checked in real-time for insurance eligibility, prior authorization requirements, and CPT / ICD-10 coding compliance.',
    icon: 'bi-cash-coin',
    badgeText: 'Built-in Lab Billing',
    keyFeatures: [
      'Real-time automated insurance eligibility (EDI 270/271) during accessioning',
      'National and Local Coverage Determinations (NCD/LCD) automated scrubbing',
      'Automated Advanced Beneficiary Notice (ABN) generation for Medicare patients',
      'Direct electronic clearinghouse integration (EDI 837P/837I claims, 835 ERA auto-posting)',
      'Patient payment estimation portal with credit card tokenization and digital invoicing'
    ],
    benefits: [
      { title: 'Clean Claims Rate', description: 'First-pass submission rate without denial rejections', stat: '96.8%' },
      { title: 'Days in A/R', description: 'Reduction in accounts receivable payment turnaround cycle', stat: '28 Days' },
      { title: 'Bad Debt Reduction', description: 'Immediate front-end insurance discovery and copay collection', stat: '-35%' }
    ],
    workflowSteps: [
      { stepNumber: 1, title: 'Order Intake & Discovery', detail: 'Real-time patient demographic verification and active coverage lookup.' },
      { stepNumber: 2, title: 'Medical Necessity Scrubbing', detail: 'Automatic CPT cross-referencing against diagnostic ICD-10 codes.' },
      { stepNumber: 3, title: 'Electronic Claim Submission', detail: 'Batch 837 EDI claim generation sent directly to clearinghouses.' },
      { stepNumber: 4, title: 'Auto-Remittance & Appeals', detail: '835 ERA automated electronic payment reconciliation and appeal templates.' }
    ],
    complianceStandards: ['HIPAA 5010 EDI', 'CMS Guidelines', 'PCI-DSS Compliant', 'OIG Billing Compliance'],
    displayOrder: 4
  },
  {
    slug: 'biobanking-lims',
    title: 'Biobanking & Environmental LIMS',
    tagline: 'Full life-cycle sample custody, cryo-storage management, and research compliance',
    category: 'Research & Life Sciences',
    heroHighlight: 'Hierarchical freezer mapping across -80Â°C freezers and liquid nitrogen tanks',
    shortDesc: 'Track biospecimens, aliquots, environmental samples, and stability studies with full chain-of-custody, consent management, and audit tracking.',
    fullDesc: 'Designed for academic medical centers, pharmaceutical biorepositories, and environmental testing labs. Modeled after Autoscribe Informatics Matrix Gemini flexible architecture, this module provides granular visual 2D/3D storage mapping, freeze-thaw count tracking, participant consent protocols, and automated temperature logger integration.',
    icon: 'bi-snow2',
    badgeText: 'Biobanking & Life Sciences',
    keyFeatures: [
      'Visual hierarchical storage mapping (Room -> Freezer -> Shelf -> Rack -> Box -> Well)',
      'Freeze-thaw cycle monitoring with thermal alert logging',
      'Dynamic aliquot parent-child lineage tree with automated barcode inheritance',
      'IRB compliance and patient dynamic informed consent tracking',
      'Environmental testing parameters (BOD, COD, heavy metals, microbial assays)'
    ],
    benefits: [
      { title: 'Custody Accuracy', description: 'Total visibility of every specimen transaction and movement', stat: '100%' },
      { title: 'Search Efficiency', description: 'Locate any biospecimen among millions in under 3 seconds', stat: '< 3s' },
      { title: 'Compliance Ready', description: 'Pre-configured for GxP, ISO 20387 (Biobanking), and FDA 21 CFR Part 11', stat: 'ISO 20387' }
    ],
    workflowSteps: [
      { stepNumber: 1, title: 'Specimen Intake & Consent', detail: 'Donor consent validation, clinical metadata capture, and tube barcoding.' },
      { stepNumber: 2, title: 'Fractionation & Aliquoting', detail: 'Automated liquid handler interface and parent-child tube linking.' },
      { stepNumber: 3, title: 'Visual Cryo-Placement', detail: 'Direct box/slot allocation with temperature sensors and RFID tagging.' },
      { stepNumber: 4, title: 'Study Distribution & Tracking', detail: 'Chain of custody sign-out, shipping manifests, and specimen usage metrics.' }
    ],
    complianceStandards: ['ISO 20387', 'ISBER Best Practices', 'FDA 21 CFR Part 11', 'GxP Validation'],
    displayOrder: 5
  }
];

const productsData = [
  {
    slug: 'sample-tracking',
    name: 'Specimen 360â„¢ Tracking & Barcoding',
    category: 'Specimen Lifecycle',
    badge: 'Zero-Error Tracking',
    tagline: 'Complete chain-of-custody from phlebotomy draw to final archival',
    summary: 'Eliminate lost samples and collection misidentifications with 2D DataMatrix barcodes, mobile courier tracking, and instant specimen status visibility.',
    capabilities: [
      'Multi-format barcode generator (Code 128, QR Code, 2D DataMatrix, RFID)',
      'Mobile phlebotomy bedside draw verification with positive patient ID',
      'Courier tracking app with GPS route logging and coolbox temperature sensors',
      'Specimen archival indexing and automated disposal scheduling based on retention policy'
    ],
    supportedProtocols: ['ZPL / Zebra Printer Language', 'Bluetooth Barcode Scanners', 'RFID Gen2', 'Mobile Android/iOS'],
    specifications: [
      { label: 'Scanning Speed', value: '< 80 milliseconds' },
      { label: 'Label Compatibility', value: 'Cryogenic, chemically-resistant, slide labels' },
      { label: 'Audit Trail', value: 'Timestamped user, workstation, and action log' }
    ],
    icon: 'bi-upc-scan',
    isFeatured: true
  },
  {
    slug: 'instrument-interfacing',
    name: 'OmniConnectâ„¢ Analyzer & HL7 Hub',
    category: 'Interoperability',
    badge: 'Universal Driver Library',
    tagline: 'Plug-and-play bi-directional interfacing with 700+ laboratory instruments',
    summary: 'Direct bidirectional drivers for chemistry, hematology, urinalysis, mass spectrometry, and NGS platforms. Never enter an analyzer result by hand again.',
    capabilities: [
      'Pre-built library of 700+ analyzer drivers (ASTM E1381/E1394, HL7 v2.x, RS232, TCP/IP)',
      'Bi-directional host query support (analyzer requests test orders automatically upon reading barcode)',
      'Live interface console with packet capture, error alerts, and line status monitoring',
      'HL7 / FHIR integration engine for EHR systems (Epic, Oracle Health/Cerner, Allscripts, Athenahealth)'
    ],
    supportedProtocols: ['HL7 v2.3/v2.5.1', 'HL7 FHIR R4', 'ASTM 1381/1394', 'Raw Serial / TCP Sockets'],
    specifications: [
      { label: 'Supported Analyzers', value: '700+ instruments across 45 manufacturers' },
      { label: 'Throughput Capacity', value: 'Up to 50,000 results/hour per hub instance' },
      { label: 'Failover Protection', value: 'Local caching buffer during network outages' }
    ],
    icon: 'bi-hdd-network',
    isFeatured: true
  },
  {
    slug: 'rules-engine',
    name: 'AutoVerifyâ„¢ Clinical Rules Engine',
    category: 'Automation & AI',
    badge: '85%+ Auto-Release',
    tagline: 'Customizable algorithmic decision support for instantaneous result sign-off',
    summary: 'Empower medical technologists to focus on complex abnormalities while normal, routine specimens are validated and released in milliseconds.',
    capabilities: [
      'Visual drag-and-drop rule builder: no custom coding or script compiling required',
      'Dynamic multi-tier delta checking against historical patient baselines',
      'Westgard multi-rule evaluation with automatic analyzer lockout upon QC violation',
      'Automated reflex test generation based on preliminary results or physician criteria'
    ],
    supportedProtocols: ['Clinical Decision Logic', 'SNOMED CT', 'LOINC Coding', 'Boolean Matrix Engine'],
    specifications: [
      { label: 'Rule Execution Speed', value: '< 5 milliseconds per test panel' },
      { label: 'Auto-Verification Rate', value: 'Up to 90% in high-volume core labs' },
      { label: 'Audit Compliance', value: 'CAP/CLIA rule validation documentation generator' }
    ],
    icon: 'bi-cpu',
    isFeatured: true
  },
  {
    slug: 'physician-portal',
    name: 'OmniPortalâ„¢ Clinical & Patient Access',
    category: 'Client Services',
    badge: 'Mobile & Web Ready',
    tagline: 'Frictionless test ordering, e-requisitions, and real-time result delivery',
    summary: 'Provide physicians, clinic staff, and patients with branded, secure, 24/7 web access to order tests, view cumulative graphs, and download diagnostic reports.',
    capabilities: [
      'Interactive e-requisition with required field enforcement and insurance upload',
      'Cumulative patient trending graphs with abnormal flags and pathologist comments',
      'Automated SMS & email notification dispatch when results are finalized',
      'White-label portal with custom laboratory branding, logos, and color palettes'
    ],
    supportedProtocols: ['OAuth 2.0 / OpenID Connect', 'HIPAA Secure Encrypted Storage', 'FHIR Patient API', 'Responsive Web'],
    specifications: [
      { label: 'Device Support', value: 'iOS, Android, Tablet, Desktop Web' },
      { label: 'Security Standard', value: 'SOC 2 Type II, HIPAA Omnibus, 256-bit AES' },
      { label: 'Report Delivery Formats', value: 'PDF, HL7 ORU, Direct Secure Email, SMS Link' }
    ],
    icon: 'bi-laptop',
    isFeatured: true
  },
  {
    slug: 'quality-compliance',
    name: 'ComplianceGuardâ„¢ Quality & Audit Hub',
    category: 'Regulatory',
    badge: 'Inspection-Ready Always',
    tagline: 'Automated CAP, CLIA, ISO 15189, and FDA 21 CFR Part 11 compliance management',
    summary: 'Turn stressful laboratory inspections into a breeze with continuous electronic audit logs, document versioning, personnel competency tracking, and CAP checklists.',
    capabilities: [
      'Immutable cryptographic audit trail for every result modification or deletion',
      'Digital document control for SOPs with mandatory read-and-sign technologist tracking',
      'Staff competency assessments, license renewal reminders, and training logs',
      'Integrated CAP checklist cross-referencing and one-click inspection binder generator'
    ],
    supportedProtocols: ['21 CFR Part 11 Digital Signatures', 'ISO 15189 Audit Logs', 'CAP Checklist Mapping'],
    specifications: [
      { label: 'Audit Retention', value: 'Configurable up to 25+ years' },
      { label: 'Signature Integrity', value: 'Biometric / Dual-factor credentialed sign-offs' },
      { label: 'Export Formats', value: 'PDF Binder, CSV, XML, Encrypted Archive' }
    ],
    icon: 'bi-shield-check',
    isFeatured: true
  }
];

const caseStudiesData = [
  {
    title: 'MetroHealth Regional Medical Center',
    subtitle: 'Consolidating 4 Hospital Labs into a Unified Core Laboratory',
    stat: '45% TAT Reduction',
    summary: 'How MetroHealth replaced three legacy LIS systems with LISDESK, achieving 88% auto-verification and saving $1.8M annually in operational costs.',
    labType: 'Multi-hospital Health System',
    testsPerDay: '18,500 tests/day',
    quote: 'LISDESK transformed our turnaround times from day one. Our critical value paging is now down to seconds, directly saving patient lives in our ICUs.',
    author: 'Dr. Marcus Vance, MD, Medical Director of Pathology'
  },
  {
    title: 'Aegis Molecular Diagnostics',
    subtitle: 'Scaling High-Throughput NGS Oncology Panels',
    stat: '3.8x Specimen Throughput',
    summary: 'A fast-growing molecular laboratory scaled from 200 to 2,500 weekly NGS comprehensive genomic profiling assays without expanding lab space.',
    labType: 'Commercial Reference Laboratory',
    testsPerDay: '4,000 tests/day',
    quote: 'The direct integration with our Illumina sequencers and the automated ACMG variant classification reduced our curation time by over 60%.',
    author: 'Elena Rostova, PhD, Lead Bioinformatician'
  },
  {
    title: 'Precision Pathology Associates',
    subtitle: 'Accelerating Digital Pathology & Revenue Cycle Efficiency',
    stat: '97.4% Clean Claims',
    summary: 'Unified anatomic pathology dictation, synoptic reporting, and front-end RCM, cutting days in A/R from 46 down to 24 days.',
    labType: 'Pathology Group Practice',
    testsPerDay: '3,200 specimens/day',
    quote: 'Having the billing engine embedded directly inside the accessioning screen caught insurance issues before processing. It revolutionized our cash flow.',
    author: 'Arthur Pendelton, Chief Financial Officer'
  }
];

module.exports = {
  solutionsData,
  productsData,
  caseStudiesData
};

