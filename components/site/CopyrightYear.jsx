import { useEffect, useState } from "react";

export default function CopyrightYear() {
  const [year, setYear] = useState(null);
  useEffect(() => setYear(new Date().getFullYear()), []);
  return year;
}
