import { programs } from "../programsData";
import ProgramContent from "./ProgramContent";

export function generateStaticParams() {
  return programs.map((program) => ({
    slug: program.slug,
  }));
}

export default function ProgramPage({ params }: { params: { slug: string } }) {
  return <ProgramContent slug={params.slug} />;
} 