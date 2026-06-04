const MockDatabase = {
    // 1. Services Data
    services: [
        {
            id: 'air-freight',
            title: 'Air Freight Services',
            shortDesc: 'Time-critical delivery solutions via global air corridors with maximum reliability.',
            description: 'Our premium air transport services cover all global lanes, providing expedited customs clearance, door-to-door deliveries, and cargo insurance. Ideal for high-value, perishable, or urgent materials.',
            icon: 'plane',
            basePrice: 5.5, // Per kg
            features: ['Priority Booking & Express Clearance', 'Temperature Controlled Cargo Handling', 'Dangerous Goods Specialization', 'Complete End-to-End Tracking']
        },
        {
            id: 'sea-freight',
            title: 'Sea Freight Services',
            shortDesc: 'Cost-effective ocean transport for FCL (Full Container Load) and LCL shipments.',
            description: 'Providing comprehensive sea cargo solutions with weekly departures across international shipping lanes. Partnering with major container carriers to ensure competitive rates and space availability.',
            icon: 'ship',
            basePrice: 1.2, // Per kg
            features: ['Full Container Load (FCL)', 'Less than Container Load (LCL) consolidation', 'Oversized & Project Cargo handling', 'Customs documentation support']
        },
        {
            id: 'road-transport',
            title: 'Road & Land Transport',
            shortDesc: 'Reliable domestic and cross-border trucking and distribution logistics.',
            description: 'Over-the-road freight services specializing in cargo distribution, express transport, and multi-modal transfers. Equipped with GPS tracking and modern fleet management.',
            icon: 'truck',
            basePrice: 0.8, // Per kg
            features: ['FTL (Full Truckload) & LTL (Less than Truckload)', 'Refrigerated and Heated transport', 'Heavy hauling & oversized logistics', 'Cross-border clearance handling']
        },
        {
            id: 'customs-clearance',
            title: 'Customs Clearance',
            shortDesc: 'Expert brokerage and documentation management for compliance check gates.',
            description: 'Navigating complex global trade laws seamlessly. Our dedicated customs brokers ensure absolute compliance, fast clearance times, and optimized tariff applications.',
            icon: 'file-text',
            basePrice: 150.0, // Flat rate per filing
            features: ['Import/Export declaration filing', 'Tariff classification & duty analysis', 'Customs bond solutions', 'Post-entry corrections & auditing']
        },
        {
            id: 'warehousing',
            title: 'Secure Warehousing',
            shortDesc: 'Modern, secure storage facilities equipped with advanced WMS technology.',
            description: 'Offering flexible storage configurations including climate control, pick-pack fulfillment, inventory management, and round-the-clock security operations.',
            icon: 'database',
            basePrice: 2.5, // Per pallet per day
            features: ['RFID-enabled inventory control', 'Order fulfillment & packing services', 'Cross-docking operations', 'Dedicated vs shared warehousing solutions']
        },
        {
            id: 'supply-chain',
            title: 'Supply Chain Management',
            shortDesc: 'Strategic design and optimization of distribution channels.',
            description: 'Re-engineering end-to-end supply chains to minimize waste, reduce transit costs, and increase visibility. Scale your logistics architecture to drive margins.',
            icon: 'git-branch',
            basePrice: 850.0, // Consulting base fee
            features: ['Vendor Managed Inventory (VMI)', 'Distribution network optimization', 'Sourcing & supplier coordination', 'Logistics risk mitigation audits']
        },
        {
            id: 'import-export',
            title: 'Import & Export Handling',
            shortDesc: 'Comprehensive cross-border logistics management and regulatory compliance.',
            description: 'Providing end-to-end handling of international import and export operations, including trade compliance consulting, licensing, and document legalizations.',
            icon: 'globe',
            basePrice: 250.0, // Flat processing fee
            features: ['Letter of Credit verification', 'Consular documentation legalizations', 'Sanctions screening & trade compliance', 'Incoterms guidance & execution']
        },
        {
            id: 'cargo-consolidation',
            title: 'Cargo Consolidation',
            shortDesc: 'Combining smaller shipments into larger units to optimize container shipping rates.',
            description: 'Groupage services that consolidate cargo from multiple clients into shared containers. Reduces freight bills substantially for shippers with smaller cargo loads.',
            icon: 'layers',
            basePrice: 0.95, // Per kg (discounted sea rate)
            features: ['Frequent departures on major routes', 'Secure consolidation hubs', 'De-consolidation & final-mile dispatch', 'Prorated shipping costs']
        }
    ],

    // 2. Tracking Database
    tracking: {
        'SBG-102948-US': {
            number: 'SBG-102948-US',
            status: 'In Transit',
            statusClass: 'warning',
            origin: 'Hamburg, Germany (HAM)',
            destination: 'New York, USA (JFK)',
            weight: '450 kg',
            dimensions: '120x80x110 cm',
            carrier: 'Sky Bridge Air Cargo (Flight SBG-402)',
            currentLocation: 'New York (JFK) Clearance Area',
            estDelivery: 'June 02, 2026',
            history: [
                { title: 'Arrived at JFK Import Hub', date: 'May 29, 2026', time: '14:22', location: 'New York, USA', desc: 'Shipment has landed and is undergoing customs sorting.', status: 'active' },
                { title: 'Departed Export Facility', date: 'May 28, 2026', time: '09:10', location: 'Hamburg, Germany', desc: 'Cargo loaded onto flight SBG-402 heading to JFK.', status: 'completed' },
                { title: 'Customs Cleared (Export)', date: 'May 27, 2026', time: '16:45', location: 'Hamburg, Germany', desc: 'Export documents verified and cleared by customs.', status: 'completed' },
                { title: 'Package Picked Up', date: 'May 26, 2026', time: '11:30', location: 'Munich, Germany', desc: 'Consolidated goods picked up by regional trucking fleet.', status: 'completed' }
            ]
        },
        'SBG-584732-EU': {
            number: 'SBG-584732-EU',
            status: 'Delivered',
            statusClass: 'success',
            origin: 'Singapore (SIN)',
            destination: 'Rotterdam, Netherlands (RTM)',
            weight: '12,400 kg',
            dimensions: '1 x 20ft Standard Container',
            carrier: 'Bridge Liner Ocean Express (Vessel BL-934)',
            currentLocation: 'Rotterdam Terminal A4',
            estDelivery: 'May 28, 2026',
            history: [
                { title: 'Delivered', date: 'May 28, 2026', time: '16:00', location: 'Rotterdam, Netherlands', desc: 'Delivered and signed off by warehousing director.', status: 'completed' },
                { title: 'Out for Final Mile Delivery', date: 'May 28, 2026', time: '08:30', location: 'Rotterdam, Netherlands', desc: 'Loaded onto local container transport vehicle.', status: 'completed' },
                { title: 'Discharged from Vessel', date: 'May 26, 2026', time: '22:15', location: 'Rotterdam, Netherlands', desc: 'Container unloaded from vessel BL-934.', status: 'completed' },
                { title: 'Vessel Departed Singapore Port', date: 'May 10, 2026', time: '05:00', location: 'Singapore Port', desc: 'Ocean transit commenced.', status: 'completed' }
            ]
        },
        'SBG-778899-EU': {
            number: 'SBG-778899-EU',
            status: 'Customs Clearance',
            statusClass: 'warning',
            origin: 'London, UK (LHR)',
            destination: 'Tokyo, Japan (NRT)',
            weight: '82 kg',
            dimensions: '60x60x40 cm',
            carrier: 'Nippon Cargo Airlines',
            currentLocation: 'Tokyo Narita Customs Gateway',
            estDelivery: 'June 04, 2026',
            history: [
                { title: 'Awaiting Customs Documents', date: 'May 29, 2026', time: '10:00', location: 'Tokyo Narita, Japan', desc: 'Importer requested to provide HS Code clarification.', status: 'active' },
                { title: 'Arrived at destination import hub', date: 'May 29, 2026', time: '05:12', location: 'Tokyo Narita, Japan', desc: 'Unloading completed.', status: 'completed' },
                { title: 'Departed London Hub', date: 'May 27, 2026', time: '21:00', location: 'London Heathrow, UK', desc: 'Air cargo route initiated.', status: 'completed' }
            ]
        }
    },

    // 3. Postal Codes Database — Indian PIN codes
    postalCodes: {
        '563113': { available: true, city: 'Robertsonpet, Kolar — Karnataka', hubName: 'Sky Bridge Global HQ', address: 'No. 261, BM Road, Near Industrial Estate, Andersonpet, Robertsonpet — 563113', transitDays: 1, tier: 'Express', state: 'Karnataka' },
        '560001': { available: true, city: 'Bangalore — Karnataka', hubName: 'Bangalore Freight Hub', address: 'Hebbal Industrial Area, Bangalore — 560024', transitDays: 1, tier: 'Express', state: 'Karnataka' },
        '600001': { available: true, city: 'Chennai — Tamil Nadu', hubName: 'Chennai Port Logistics Center', address: 'Foreshore Estate, Chennai — 600028', transitDays: 2, tier: 'Priority', state: 'Tamil Nadu' },
        '400001': { available: true, city: 'Mumbai — Maharashtra', hubName: 'JNPT Cargo Gateway', address: 'Jawaharlal Nehru Port, Nhava Sheva, Navi Mumbai — 400707', transitDays: 2, tier: 'Priority', state: 'Maharashtra' },
        '110001': { available: true, city: 'New Delhi — Delhi', hubName: 'Delhi Air Freight Station', address: 'Air Cargo Complex, IGI Airport, New Delhi — 110037', transitDays: 2, tier: 'Standard', state: 'Delhi' },
        '500001': { available: true, city: 'Hyderabad — Telangana', hubName: 'Hyderabad Logistics Park', address: 'Patancheru Industrial Area, Hyderabad — 502319', transitDays: 2, tier: 'Standard', state: 'Telangana' },
        '700001': { available: true, city: 'Kolkata — West Bengal', hubName: 'Kolkata Port Distribution Hub', address: 'Kidderpore Dock, Kolkata — 700023', transitDays: 3, tier: 'Standard', state: 'West Bengal' },
        '380001': { available: true, city: 'Ahmedabad — Gujarat', hubName: 'Ahmedabad Cargo Terminal', address: 'GIDC Vatva, Ahmedabad — 382445', transitDays: 2, tier: 'Priority', state: 'Gujarat' }
    },

    // 4. Careers
    careers: [
        {
            title: 'Global Supply Chain Analyst',
            dept: 'Operations & Strategy',
            location: 'New York, USA',
            type: 'Full-time',
            salary: '$85,000 - $110,000',
            desc: 'We are seeking an experienced analyst to optimize supply chain pipelines for major Fortune 500 accounts. You will design logistics networks, track carrier SLA performances, and implement inventory management models.',
            reqs: ['Bachelor degree in Logistics, Analytics, or Industrial Engineering', '3+ years experience with WMS, SQL, and data visualization tools', 'Strong communication and client management skills']
        },
        {
            title: 'Customs Compliance Officer',
            dept: 'Regulatory Affairs',
            location: 'Hamburg, Germany',
            type: 'Full-time',
            salary: '€70,000 - €90,000',
            desc: 'Ensure compliance with German export laws and EU custom tariffs. Maintain regulatory licenses, file declarations, and interface with government customs agencies.',
            reqs: ['Certified Customs Broker license or equivalent training', 'Expert knowledge of EU tariff structures and HS classification systems', 'Fluent in German and English']
        },
        {
            title: 'Freight Sales Manager',
            dept: 'Sales & Marketing',
            location: 'Singapore',
            type: 'Full-time',
            salary: 'SG$90,000 + Commissions',
            desc: 'Drive growth in sea and air freight volumes across Asia-Pacific corridors. Cultivate new client relationships, negotiate service contracts, and prepare pricing quotations.',
            reqs: ['Proven track record in freight forwarding sales', 'Strong corporate networking connections in APAC region', 'Excellent negotiation and presentation capabilities']
        }
    ],

    // 5. Client Portal Data
    client: {
        profile: {
            name: 'Robert Vance',
            company: 'Vance Refrigeration',
            email: 'r.vance@vanceref.com',
            token: 'CLIENT-VR-9082'
        },
        shipments: [
            { id: 'SBG-102948-US', type: 'Air Cargo', status: 'In Transit', origin: 'Hamburg, GER', destination: 'New York, USA', date: 'May 28, 2026', amount: '$3,420.00' },
            { id: 'SBG-584732-EU', type: 'FCL Container', status: 'Delivered', origin: 'Singapore', destination: 'Rotterdam, NLD', date: 'May 10, 2026', amount: '$15,800.00' }
        ],
        invoices: [
            { id: 'INV-2026-9043', date: 'May 28, 2026', dueDate: 'June 28, 2026', amount: '$3,420.00', status: 'Unpaid' },
            { id: 'INV-2026-8831', date: 'May 10, 2026', dueDate: 'June 10, 2026', amount: '$15,800.00', status: 'Paid' }
        ],
        notifications: [
            { text: 'Customs check initiated for your air shipment SBG-102948-US.', time: 'May 29, 2026, 14:22' },
            { text: 'Invoice INV-2026-9043 has been generated for Hamburg shipment.', time: 'May 28, 2026, 10:15' },
            { text: 'Shipment SBG-584732-EU has been marked as DELIVERED.', time: 'May 28, 2026, 16:00' }
        ]
    },

    // 6. Admin Panel Enquiries & Base Pricing
    admin: {
        enquiries: [
            { id: 'ENQ-001', name: 'Angela Martin', email: 'angela@dundermifflin.com', company: 'Dunder Mifflin', msg: 'Need a quote for monthly shipping of paper pallets from Scranton to Stamford.', date: 'May 29, 2026' },
            { id: 'ENQ-002', name: 'Oscar Martinez', email: 'oscar@dundermifflin.com', company: 'Dunder Mifflin', msg: 'Checking audit requirements for import tariffs on incoming machinery.', date: 'May 27, 2026' }
        ],
        pricingRates: {
            'Air': 5.5,
            'Ocean': 1.2,
            'Road': 0.8
        }
    }
};
