import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export default function Home() {

  useDocumentTitle("Home | Planzee");
  
  return (
    <>
      <div className="w-full h-screen flex items-center justify-center gap-4">
        <Link to="/auth/sign-in">
          <Button className="bg-[#578FCA] text-white hover:bg-[#4a7eb8] cursor-pointer">
            Login
          </Button>
        </Link>
        <Link to="/auth/sign-up">
          <Button className="bg-[#578FCA] text-white hover:bg-[#4a7eb8] cursor-pointer">
            Register
          </Button>
        </Link>
      </div>
    </>
  );
}
