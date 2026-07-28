export type JobRow = {
  id: string;
  title: string;
  dept: string | null;
  location: string | null;
  type: string | null;
  salary: string | null;
  description: string | null;
  requirements: string[];
  active: boolean;
  sort_order: number;
  created_at: string;
};

export const JOB_TYPES = ["Full-time", "Part-time", "Contract", "Internship"];
