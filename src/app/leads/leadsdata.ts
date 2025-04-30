// app/leads/data.ts

export interface Lead {
  _id: string;
  full_name: string;
  email: string;
  phone_number: string;
  employment_type: string;
  state: string;
  city: string;
  loan_product: string;
  loan_amount: string;
  monthly_income: string;
  cibil_score: string;
  preferred_lending_partner: string;
  createdAt: string;
  status: string;
}

// async function getLeads(): Promise<Lead[]> {
//   try {
//     const res = await fetch(
//       "http://147.93.96.111:3000/api/lead?limit=5&page=1&sort=-createdAt",
//       {
//         cache: "no-store",
//         headers: {
//           version: "1",
//         },
//       }
//     );

//     if (!res.ok) {
//       console.error("Failed to fetch leads. Status:", res.status);
//       return [];
//     }

//     const result = await res.json();
//     console.log("API result:", result);

//     // Adjust depending on your actual API response
//     return result.data?.items || result.data || result || [];
//   } catch (error) {
//     console.error("Error fetching leads:", error);
//     return [];
//   }
// }


