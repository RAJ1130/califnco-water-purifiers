import initialProducts from './products.json';

export const initialOrders = [
  {
    id: "ORD-98214",
    userId: "cust-101",
    customerName: "Rajesh Sharma",
    customerEmail: "rajesh.sharma@example.com",
    customerPhone: "+91 98450 12345",
    userRole: "customer",
    items: [
      {
        id: "pur-001",
        name: "Califnco HydroPure Elite RO+UV+UF+Copper",
        price: 14999,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800&auto=format&fit=crop&q=80"
      },
      {
        id: "flt-003",
        name: "Califnco 5-Micron Spun Sediment Filter (Pack of 4)",
        price: 499,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?w=800&auto=format&fit=crop&q=80"
      }
    ],
    subtotal: 15498,
    discount: 500,
    total: 14998,
    paymentStatus: "Paid",
    paymentMethod: "Razorpay (Test Mode)",
    paymentId: "pay_rzp_test_K29jA9vB9812",
    orderStatus: "Delivered",
    address: {
      street: "Flat 402, Green Glen Layout, Bellandur",
      city: "Bengaluru",
      state: "Karnataka",
      pincode: "560103"
    },
    createdAt: "2026-10-22T10:30:00Z"
  },
  {
    id: "ORD-98215",
    userId: "dealer-202",
    customerName: "Venkatesh Rao (Aqua Solutions)",
    customerEmail: "aquasolutions.dealer@example.com",
    customerPhone: "+91 97411 88299",
    userRole: "dealer",
    companyName: "Aqua Solutions & Plumbing Spares",
    gstin: "29AAAAA0000A1Z5",
    items: [
      {
        id: "pmp-001",
        name: "Califnco 75 GPD High-Flow RO Booster Pump 24V",
        price: 1199,
        quantity: 10,
        image: "https://images.unsplash.com/photo-1581092162384-8987c1d64718?w=800&auto=format&fit=crop&q=80"
      },
      {
        id: "flt-001",
        name: "Califnco Dow Filmtec 75 GPD RO Membrane",
        price: 1249,
        quantity: 15,
        image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&auto=format&fit=crop&q=80"
      },
      {
        id: "spr-001",
        name: "Califnco 24V DC Fast-Action Solenoid Valve",
        price: 185,
        quantity: 20,
        image: "https://images.unsplash.com/photo-1581092162384-8987c1d64718?w=800&auto=format&fit=crop&q=80"
      }
    ],
    subtotal: 34425,
    discount: 1500,
    total: 32925,
    paymentStatus: "Paid",
    paymentMethod: "Razorpay (Wholesale NetBanking)",
    paymentId: "pay_rzp_test_M78nC4vD1129",
    orderStatus: "Shipped",
    address: {
      street: "Shop 14, APMC Market Yard, Rajajinagar",
      city: "Bengaluru",
      state: "Karnataka",
      pincode: "560010"
    },
    createdAt: "2026-10-23T08:15:00Z"
  },
  {
    id: "ORD-98216",
    userId: "cust-103",
    customerName: "Priya Nair",
    customerEmail: "priya.nair@example.com",
    customerPhone: "+91 99001 54321",
    userRole: "customer",
    items: [
      {
        id: "pur-006",
        name: "Califnco Smart IoT RO with Mobile App Sync",
        price: 21999,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&auto=format&fit=crop&q=80"
      }
    ],
    subtotal: 21999,
    discount: 0,
    total: 21999,
    paymentStatus: "Paid",
    paymentMethod: "Razorpay (UPI)",
    paymentId: "pay_rzp_test_Z31qP9tL8830",
    orderStatus: "Confirmed",
    address: {
      street: "House 28, 4th Cross, Indiranagar",
      city: "Bengaluru",
      state: "Karnataka",
      pincode: "560038"
    },
    createdAt: "2026-10-23T11:45:00Z"
  },
  {
    id: "ORD-98217",
    userId: "cust-104",
    customerName: "Amitabh Banerjee",
    customerEmail: "amitabh.b@example.com",
    customerPhone: "+91 98300 77112",
    userRole: "customer",
    items: [
      {
        id: "dis-001",
        name: "Califnco Commercial 3-Tap Floor RO Dispenser",
        price: 29999,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1543465077-db45d34b88a5?w=800&auto=format&fit=crop&q=80"
      }
    ],
    subtotal: 29999,
    discount: 1000,
    total: 28999,
    paymentStatus: "Pending",
    paymentMethod: "Pay on Delivery / COD",
    paymentId: "COD_UNPAID",
    orderStatus: "Pending",
    address: {
      street: "Tower 2, Flat 1104, HSR Layout Sector 2",
      city: "Bengaluru",
      state: "Karnataka",
      pincode: "560102"
    },
    createdAt: "2026-10-23T13:20:00Z"
  }
];

export const initialDealers = [
  {
    id: "dealer-201",
    name: "Sunil Verma",
    companyName: "Verma Aqua Tech Enterprises",
    email: "sunil@vermaaquatech.com",
    phone: "+91 98220 54321",
    gstin: "27AABCV1234D1Z8",
    city: "Pune",
    state: "Maharashtra",
    annualTurnover: "₹45 Lakhs",
    status: "approved",
    appliedDate: "2026-10-18T09:00:00Z",
    reviewedDate: "2026-10-19T14:30:00Z",
    totalOrders: 14,
    totalSpent: 425000
  },
  {
    id: "dealer-202",
    name: "Venkatesh Rao",
    companyName: "Aqua Solutions & Plumbing Spares",
    email: "aquasolutions.dealer@example.com",
    phone: "+91 97411 88299",
    gstin: "29AAAAA0000A1Z5",
    city: "Bengaluru",
    state: "Karnataka",
    annualTurnover: "₹80 Lakhs",
    status: "approved",
    appliedDate: "2026-10-20T11:15:00Z",
    reviewedDate: "2026-10-21T10:00:00Z",
    totalOrders: 6,
    totalSpent: 182000
  },
  {
    id: "dealer-203",
    name: "Mohammad Farhan",
    companyName: "HydroFlow Systems & Services",
    email: "farhan@hydroflowindia.com",
    phone: "+91 94440 66789",
    gstin: "33AAECF9988G1Z2",
    city: "Chennai",
    state: "Tamil Nadu",
    annualTurnover: "₹25 Lakhs",
    status: "pending",
    appliedDate: "2026-10-23T06:40:00Z",
    reviewedDate: null,
    totalOrders: 0,
    totalSpent: 0
  },
  {
    id: "dealer-204",
    name: "Kavita Singhania",
    companyName: "Singhania Water Solutions",
    email: "kavita@singhaniawater.com",
    phone: "+91 98110 33456",
    gstin: "07AAKCS4455P1ZK",
    city: "New Delhi",
    state: "Delhi",
    annualTurnover: "₹1.2 Crore",
    status: "pending",
    appliedDate: "2026-10-23T11:20:00Z",
    reviewedDate: null,
    totalOrders: 0,
    totalSpent: 0
  },
  {
    id: "dealer-205",
    name: "Ramesh Patel",
    companyName: "Patel RO Traders",
    email: "ramesh@patelro.in",
    phone: "+91 98980 12389",
    gstin: "24AAECP1122Q1ZT",
    city: "Ahmedabad",
    state: "Gujarat",
    annualTurnover: "₹15 Lakhs",
    status: "rejected",
    appliedDate: "2026-10-15T14:10:00Z",
    reviewedDate: "2026-10-16T16:00:00Z",
    rejectionReason: "Invalid GSTIN details provided during verification",
    totalOrders: 0,
    totalSpent: 0
  }
];

export const initialServiceRequests = [
  {
    id: "SRV-401",
    customerName: "Anita Desai",
    customerPhone: "+91 98200 44321",
    customerAddress: "Flat 501, Orchid Towers, Whitefield, Bengaluru",
    serviceType: "Annual Maintenance Service (AMC)",
    purifierModel: "Califnco HydroPure Elite RO",
    preferredDate: "2026-10-24",
    timeSlot: "10:00 AM - 01:00 PM",
    problemDescription: "Water flow is very slow, membrane indicator blinking amber.",
    technicianAssigned: "Ravi Kumar (Senior Technician)",
    status: "Scheduled",
    createdAt: "2026-10-23T09:15:00Z"
  },
  {
    id: "SRV-402",
    customerName: "Karthik Sundaram",
    customerPhone: "+91 99401 22345",
    customerAddress: "12, 1st Cross, Koramangala 4th Block, Bengaluru",
    serviceType: "Filter Replacement & Sanitize",
    purifierModel: "Califnco AquaClean Pro 7-Stage",
    preferredDate: "2026-10-24",
    timeSlot: "02:00 PM - 05:00 PM",
    problemDescription: "Need to replace 1-year sediment and carbon filters. Water taste is slightly alkaline.",
    technicianAssigned: "Unassigned",
    status: "Requested",
    createdAt: "2026-10-23T11:00:00Z"
  },
  {
    id: "SRV-403",
    customerName: "Meenakshi Sundar",
    customerPhone: "+91 98840 99887",
    customerAddress: "Plot 89, JP Nagar 7th Phase, Bengaluru",
    serviceType: "New Product Installation",
    purifierModel: "Califnco Under-Sink HydroPure Compact",
    preferredDate: "2026-10-25",
    timeSlot: "10:00 AM - 01:00 PM",
    problemDescription: "New under-sink purifier delivered today. Plumber connection required with goose-neck tap.",
    technicianAssigned: "Arun Prakash",
    status: "In-Progress",
    createdAt: "2026-10-22T16:40:00Z"
  },
  {
    id: "SRV-404",
    customerName: "Sanjay Joshi",
    customerPhone: "+91 98455 77665",
    customerAddress: "Villa 14, Palm Meadows, Whitefield, Bengaluru",
    serviceType: "Water Quality & TDS Testing",
    purifierModel: "Califnco Apex Heavy Duty 3000 TDS",
    preferredDate: "2026-10-21",
    timeSlot: "11:00 AM - 01:00 PM",
    problemDescription: "Borewell TDS surged to 2400 ppm. Check output TDS and membrane health.",
    technicianAssigned: "Ravi Kumar",
    status: "Completed",
    createdAt: "2026-10-21T08:30:00Z"
  }
];

export { initialProducts };
