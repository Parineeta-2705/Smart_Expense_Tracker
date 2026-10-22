const BUDGETS = { Rent:15000, Groceries:6000, Dining:3000, Transport:2500, Utilities:2500,
  Entertainment:2000, Shopping:4000, Health:1500, Education:3000, Subscriptions:1000 };
const T = (d, merchant, category, amount) => ({ date: `2026-10-${String(d).padStart(2,"0")}`, merchant, category, amount });
const TXNS = [
  T(1,"Rent – October","Rent",15000), T(2,"BigBasket","Groceries",1850), T(3,"Namma Metro","Transport",500),
  T(4,"BESCOM Electricity","Utilities",780), T(4,"Spotify","Subscriptions",119), T(5,"Truffles","Dining",1100),
  T(5,"Spotify","Subscriptions",119), T(6,"Airtel Broadband","Utilities",870), T(7,"Amazon","Shopping",1299),
  T(8,"Uber","Transport",420), T(9,"DMart","Groceries",1420), T(9,"Udemy","Education",1200),
  T(10,"PVR Cinemas","Entertainment",600), T(11,"Apollo Pharmacy","Health",600), T(12,"Swiggy","Dining",389),
  T(12,"Hotstar","Subscriptions",299), T(13,"Myntra","Shopping",1001), T(14,"Swiggy","Dining",389),
  T(15,"Ola","Transport",310), T(16,"Reliance Fresh","Groceries",980), T(17,"BookMyShow","Entertainment",300),
  T(18,"Third Wave Coffee","Dining",450), T(19,"BMTC Bus Pass","Transport",250), T(20,"Zepto","Groceries",850),
  T(21,"Zomato","Dining",1322), T(21,"YouTube Premium","Subscriptions",129)
];
