
export const demoAccounts = [
  {
    email: "admin@demo.com",
    password: "Demo123!",
    role: "admin",
    profile: {
      full_name: "المدير العام",
      phone: "+90 555 123 4567",
      country: "Turkey",
      city: "Istanbul"
    }
  },
  {
    email: "student1@demo.com", 
    password: "Demo123!",
    role: "student",
    profile: {
      full_name: "أحمد محمد",
      phone: "+90 555 234 5678",
      country: "Syria",
      city: "Damascus"
    }
  },
  {
    email: "student2@demo.com",
    password: "Demo123!", 
    role: "student",
    profile: {
      full_name: "فاطمة علي",
      phone: "+90 555 345 6789",
      country: "Jordan",
      city: "Amman"
    }
  },
  {
    email: "agent@demo.com",
    password: "Demo123!",
    role: "agent", 
    profile: {
      full_name: "وكيل التسويق",
      phone: "+90 555 456 7890",
      country: "Turkey",
      city: "Ankara"
    }
  }
];

export const demoDataService = {
  getDemoAccounts: () => demoAccounts,
  
  getAccountByEmail: (email: string) => {
    return demoAccounts.find(account => account.email === email);
  },
  
  getAccountsByRole: (role: string) => {
    return demoAccounts.filter(account => account.role === role);
  }
};
