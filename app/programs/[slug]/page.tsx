import Link from "next/link";
import { programs } from "../programsData";
import { Program } from "../types";
import ProgramContent from "./ProgramContent";

export async function generateStaticParams() {
  return programs.map((program) => ({
    slug: program.slug,
  }));
}

export default function ProgramPage({ params }: { params: { slug: string } }) {
  const program = programs.find((p: Program) => p.slug === params.slug);

  if (!program) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Program Not Found</h1>
          <Link href="/programs" className="text-[#FF8C00] hover:text-white transition-colors">
            Back to Programs
          </Link>
        </div>
      </div>
    );
  }

  return <ProgramContent program={program} />;
} 